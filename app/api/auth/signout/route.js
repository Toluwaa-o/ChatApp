import { cookies } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  await cookies().delete("tjw");

  return NextResponse.json({ msg: "Logged Out! Come back soon." });
};
