import prismaConnect from "@/Utils/prismaconnect";
import users from "@/data/users";
import { NextResponse } from "next/server";

const prisma = prismaConnect();

export const GET = async () => {
  await prisma.user.createMany({
    data: users,
  });

  console.log("Successfully created");
  return NextResponse.json("Success!");
};