import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

await connect()

export async function POST(request) {
  try {
    const reqBody = await request.json()
    const { username, email, password, phone } = reqBody;
    // validations
    console.log(reqBody)

    const user = await User.findOne({ email })

    if (user) {
      return NextResponse.json({ error: "User already exists." }, { status: 400 })
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      username,
      phone,
      email,
      password: hashedPassword
    });
    console.log("it is right")

    const savedUser = await newUser.save();
    console.log(savedUser);

    // send Verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      success: true,
      message: "User registered successfully.",
      savedUser
    });


  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}