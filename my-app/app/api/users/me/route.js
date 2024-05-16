import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

await connect()


export async function GET(request) {
  try {
    const userId = getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    // check if no user
    return NextResponse.json({
      message: "User found",
      data: user
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: "There is some error in getting data.",
      },
      { status: 500 }
    )
  }
}