import prismaConnect from "@/Utils/prismaconnect";
import users from "@/data/users";
import { NextResponse } from "next/server";

const prisma = prismaConnect();

export const GET = async () => {
  // await prisma.user.deleteMany({})
  await prisma.user.createMany({
    data: users,
  });

  await prisma.$disconnect()

  return NextResponse.json("Success!");
};