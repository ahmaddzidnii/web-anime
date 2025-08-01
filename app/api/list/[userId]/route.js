import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { Base64 } from "js-base64";

export async function GET(request, context) {
  const { userId } = await auth();
  const user_id = context.params.userId;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const orderBy = searchParams.get("orderBy");

  if (!user_id || !userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (userId !== user_id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        user_id: user_id,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const whereCondition = {
      user: {
        id: user.id,
      },
      ...(status && status !== "ALL" ? { status: status } : {}),
    };

    const orderCondition = {
      ...(orderBy !== "score" ? { updated_at: "desc" } : { score: "desc" }),
    };

    const lists = await prisma.animeList.findMany({
      where: whereCondition,
      orderBy: orderCondition,
    });

    const listBase64 = Base64.encode(JSON.stringify(lists), true);

    return Response.json({
      lists: listBase64,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch lists" },
      { status: 500 },
    );
  }
}
