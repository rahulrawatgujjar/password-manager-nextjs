import { NextResponse, NextRequest } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import { Password } from '@/models/passwordModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import User from '@/models/userModel';
import { encrypt, decrypt } from '@/helpers/cryptoUtils';


await connect()

export async function POST(request) {
  try {
    const res = await request.json();
    const wa_id = res.wa_id;
    const siteUrl = res.site;

    const userResponse = await User.findOne({ phone: wa_id }).select("_id")
    if (!userResponse) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 })
    }
    const { _id } = userResponse;

    const passResponse = await Password.findOne({ userId: _id, site: { $regex: new RegExp(siteUrl, 'i') } }).select("username site encryptedPassword");
    if (!passResponse) {
      return NextResponse.json({ error: "Site not found" }, { status: 400 })
    }
    const { username, site, encryptedPassword } = passResponse

    const password = decrypt(encryptedPassword)
    return NextResponse.json({ username, site, password });
  } catch (error) {
    return NextResponse.json({ error: `Something went wrong.  ${error.message}` }, { status: 500 })
  }
}