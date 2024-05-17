import { NextResponse, NextRequest } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import { Password } from '@/models/passwordModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import User from '@/models/userModel';


await connect()


export async function GET(request) {
  const userId = getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");
  // check if no user
  if (!user) {
    return NextResponse.json(
      {
        error: "User do not exist."
      },
      {
        status: 400
      }
    )
  }
  // return NextResponse.json({
  //   message: "User found",
  //   data: user
  // })

  const passwords = await Password.find({ userId });
  // res.json(passwords);
  return NextResponse.json({
    data: passwords
  });
}

export async function POST(request) {
  const userId = getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");
  // check if no user
  if (!user) {
    return NextResponse.json(
      {
        error: "User do not exist."
      },
      {
        status: 400
      }
    )
  }

  const password = await request.json();
  const result = await Password.insertMany([{ ...password, userId:userId }])
  // res.send({success: true,result});
  return NextResponse.json({ success: true, result });
}

export async function DELETE(request) {
  const userId = getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");
  // check if no user
  if (!user) {
    return NextResponse.json(
      {
        error: "User do not exist."
      },
      {
        status: 400
      }
    )
  }

  const { id } = await request.json()
  const result = await Password.deleteOne({ id, userId });
  // res.send({success: true,result});
  return NextResponse.json({ success: true, result });
}
