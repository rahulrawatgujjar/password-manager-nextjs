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
    const wa_id = res.wa_id
    const userResponse = await User.findOne({ phone: wa_id }).select("_id")
    if (!userResponse) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 })
    }
    const { _id } = userResponse;

    const sites = await Password.find({ userId: _id }, { "_id": 0, "site": 1 })
    if (!sites) {
      return NextResponse.json({ error: "Sites not found." }, { status: 400 })
    }
    return NextResponse.json({ sites })
  } catch (error) {
    return NextResponse.json({ error: `Something went wrong.  ${error.message}` }, { status: 500 })
  }

}