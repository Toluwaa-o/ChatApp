import bcrypt from "bcrypt";
import validator from "validator";
import { NextResponse } from "next/server";
import createToken from "@/libs/createJWT";
import prismaConnect from "@/Utils/prismaconnect";

const prisma = prismaConnect()
export const POST = async (request) => {
  const { email, password } =
    await request.json();

  if ( !email || !password ) {
    return NextResponse.json(
      {
        msg: "Please provide all the neccessary information",
      },
      { status: 400 }
    );
  }

  const errorMessages = [];

  const validate = [
    {
      msg: "Please provide a valid email address",
      valid: validator.isEmail(email),
    }
  ];

  validate.forEach((v) => {
    if (!v.valid) {
      errorMessages.push(v.msg);
    }
  });

  if (errorMessages.length) {
    return NextResponse.json({ msg: errorMessages[0] }, { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { msg: "Invalid login credentials" },
      { status: 401 }
    );
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if(!isCorrectPassword){
    return NextResponse.json(
      { msg: "Invalid login credentials" },
      { status: 401 }
    );
  }

  await createToken({ userId: user.id, username: user.username });
  await prisma.user.update({
    where: { id: user.id }, data: { online: true }
  })

  return NextResponse.json({ msg: "Success! You are logged in!" });
};
