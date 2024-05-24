import { NextResponse, NextRequest } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import { Password } from '@/models/passwordModel';
import User from '@/models/userModel';
import decryptToken from '@/helpers/whatsppCryptoUtils';


await connect()

export async function POST(request) {
  try {
    const { headers } = request;
    const authorization = headers.get('Authorization');
    console.log("\nauthorization: ",authorization)

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'No or invalid authorization token' }, { status: 401 });
    }

    const token = authorization.split(' ')[1];
    const decryptedPayload = decryptToken(token);
    console.log("decrypted",decryptedPayload)
    const [wa_id, message] = decryptedPayload.split(':');

    const data = await request.json();

    if (data.wa_id !== wa_id || data.message !== message) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 400 });
    }

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
    console.log(error)
    return NextResponse.json({ error: `Something went wrong.  ${error.message}` }, { status: 500 })
  }

}