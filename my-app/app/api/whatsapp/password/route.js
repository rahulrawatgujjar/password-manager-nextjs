import { NextResponse, NextRequest } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import { Password } from '@/models/passwordModel';
import User from '@/models/userModel';
import { encrypt, decrypt } from '@/helpers/cryptoUtils';
import decryptToken from '@/helpers/whatsppCryptoUtils';


await connect()

export async function POST(request) {
  try {
    const { headers } = request;
    const authorization = headers.get('Authorization');

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'No or invalid authorization token' }, { status: 401 });
    }

    const token = authorization.split(' ')[1];
    const decryptedPayload = decryptToken(token);
    const [wa_id, siteUrl] = decryptedPayload.split(':');

    const data = await request.json();

    if (data.wa_id !== wa_id || data.site !== siteUrl) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 400 });
    }

    const userResponse = await User.findOne({ phone: wa_id }).select("_id")
    if (!userResponse) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 })
    }
    const { _id } = userResponse;

    const passResponse = await Password.findOne({ userId: _id, site: { $regex: new RegExp(siteUrl, 'i') } }).select("username site encryptedPassword");
    if (!passResponse) {
      return NextResponse.json({ error: "Site not found" }, { status: 400 })
    }
    const { username, site, encryptedPassword } = passResponse;

    const password = decrypt(encryptedPassword)
    return NextResponse.json({ username, site, password });
  } catch (error) {
    return NextResponse.json({ error: `Something went wrong.  ${error.message}` }, { status: 500 })
  }
}