import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

await connect()


export async function POST(request) {
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody;
    // validations
    // console.log(reqBody);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        error: "User does not exist."
      }, { status: 400 });
    }
    // console.log("User exists:", user);

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({
        error: "Check your credientials.",
      }, { status: 400 });
    }

    if (!user.isVerified) {
      return NextResponse.json({
        error: "Please verify the user.",
      }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    }

    const token = jwt.sign(tokenData, process.env.SECRET_TOKEN, { expiresIn: "1d" });

    const response = NextResponse.json({
      message: "Logged In Success",
      success: true
    })

    response.cookies.set("token", token, {
      httpOnly: true
    })

    return response;



  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}