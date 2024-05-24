import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

await connect()


export async function POST(request) {
  try {
    const reqBody = await request.json()
    const { phone } = reqBody;
    // validations
    // console.log(reqBody);

    const userId = getDataFromToken(request);

    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json(
        {
          error: "User does not exist."
        },
        {
          status: 400
        }
      )
    }

    // console.log("User exists:", user);

    if (user.phone !== "") {
      return NextResponse.json(
        {
          error: "Phone number field not empty"
        },
        {
          status: 400
        }
      )
    }

    await User.findByIdAndUpdate(userId, {
      $set: {
        phone
      }
    })

    return NextResponse.json({ success: true, message: "Phone number added." })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}