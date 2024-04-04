import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    //validation
    console.log(reqBody);
    //validation
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "please provide all details",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    //user exist or not
    if (!user) {
      return NextResponse.json(
        {
          error: "user does not exist",
        },
        { status: 400 }
      );
    }

    //verify password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        {
          error: "check your credentials",
        },
        { status: 400 }
      );
    }

    //generate token
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(payload, process.env.TOKEN_SECRET!, {
      expiresIn: "24h",
    });

    //return response
    const response = NextResponse.json(
      {
        message: "loggedin success",
        success: true,
      },
      { status: 200 }
    );

    //seting cookies
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
