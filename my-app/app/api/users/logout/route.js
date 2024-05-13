import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";

await connect()


export async function GET(request) {
  try {
    const response = NextResponse.json({
      message: "Logout Successfully.",
      success: true
    })

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0)
    })

    return response;

  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 })
  }
}