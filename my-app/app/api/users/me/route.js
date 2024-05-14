import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

await connect()


export async function GET(request) {
  const userId= getDataFromToken(request);
  const user = User.findOne({_id:userId}).select("-password");
  // check if no user
  return NextResponse.json({
    message: "User found",
    data: user
  })
}