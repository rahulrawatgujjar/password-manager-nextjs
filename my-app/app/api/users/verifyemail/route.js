import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

await connect()

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })

    if (!user) {
      return NextResponse.json({ error: "Invalid token", status: 400 })
    }
    console.log(user)

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save()

    return NextResponse.json({
      success: true,
      message: "Email verified successfully.",
      status: 200
    })



  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 })
  }
}