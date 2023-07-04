import bcrypt from "bcrypt";
import validator from "validator";
import { NextResponse } from "next/server";
import createToken from "@/libs/createJWT";
import prismaConnect from "@/Utils/prismaconnect";

const prisma = prismaConnect();

export const POST = async (request) => {
  const { firstName, lastName, email, password, username } =
    await request.json();

  if (!firstName || !lastName || !email || !password) {
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
      msg: "Please provide a valid first name",
      valid: validator.isLength(firstName, {
        min: 2,
      }),
    },
    {
      msg: "Please provide a valid last name",
      valid: validator.isLength(lastName, {
        min: 2,
      }),
    },
    {
      msg: "Please provide a valid email address",
      valid: validator.isEmail(email),
    },
    {
      msg: "Please provide a more secure password",
      valid: validator.isStrongPassword(password),
    },
  ];

  validate.forEach((v) => {
    if (!v.valid) {
      errorMessages.push(v.msg);
    }
  });

  if (errorMessages.length) {
    return NextResponse.json({ msg: errorMessages[0] }, { status: 400 });
  }

  const userWithEmail = await prisma.user.findFirst({
    where: { email },
  });

  if (userWithEmail) {
    return NextResponse.json(
      { msg: "Email is already associated with another account! " },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { firstName, lastName, email, password: hashedPassword, username },
  });

  await createToken({ userId: user.id, email: user.email });
  await prisma.user.update({
    where: { id: user.id },
    data: { online: true },
  });

  await prisma.$disconnect()

  return NextResponse.json({ msg: "Success! Registeration completed!" });
};
