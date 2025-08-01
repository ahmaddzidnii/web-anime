import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { animeStatusList } from "@/constant/data-anime";
import { daftarStatus } from "@/utils/enum-status";

export const getLabelStatusByValue = (value) => {
  const selectedOption = animeStatusList.find(
    (option) => option.value === value,
  );
  return selectedOption ? selectedOption.label : "ALL";
};

export async function POST(request) {
  const body = await request.json();

  const { user, data } = body;

  const { user_id } = user;

  const { userId } = await auth();

  if (!userId || !user_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (userId !== user_id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const {
    anime_id,
    anime_title,
    anime_image,
    status,
    type,
    score,
    total_episode,
    watched_episode,
    start_watch,
    end_watch,
  } = data;

  if (Number(score) < 0 || Number(score) > 10) {
    return NextResponse.json(
      { error: "Score harus antara 0 - 10!" },
      { status: 400 },
    );
  }

  if (Number(watched_episode) < 0) {
    return NextResponse.json(
      { error: "Watched Episode tidak valid!" },
      { status: 400 },
    );
  }

  if (Number(total_episode) < Number(watched_episode)) {
    return NextResponse.json(
      { error: "Total Episode harus lebih besar dari Watched Episode!" },
      { status: 400 },
    );
  }

  let statusAnime = daftarStatus.includes(status) ? status : "Watching";
  let watchedEpisode = parseInt(watched_episode);

  if (Number(total_episode) === Number(watched_episode)) {
    statusAnime = "Completed";
  }

  if (status === "Completed") {
    watchedEpisode = Number(total_episode);
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
      },
    });

    if (!user_id) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingList = await prisma.animeList.count({
      where: {
        anime_id: anime_id,
        user: {
          id: user.id,
        },
      },
    });

    if (existingList > 0) {
      return NextResponse.json(
        { error: "Anime sudah ada di list!" },
        { status: 400 },
      );
    }

    const data = {
      anime_id,
      anime_id,
      anime_title,
      anime_image,
      status: statusAnime,
      type,
      score: score ? Number(score) : 0,
      total_episode: parseInt(total_episode),
      watched_episode: watchedEpisode,
      start_watch: start_watch,
      end_watch: end_watch,
    };

    await prisma.animeList.create({
      data: {
        ...data,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request) {
  const body = await request.json();

  const { user_id, id } = body;
  const { userId } = await auth();

  if (!userId || !user_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (userId !== user_id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await prisma.animeList.delete({
      where: {
        id,
        user: {
          user_id: userId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Gagal menghapus anime dari list!" },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  const { userId } = await auth();
  const { user, data } = await request.json();

  const { user_id, id } = user;

  let { status, score, watched_episode, start_watch, end_watch } = data;

  const WATCHED_EPISODE_NUMBER = parseInt(watched_episode);

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  if (!user_id || !userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (userId !== user_id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (Number(score) < 0 || Number(score) > 10) {
    return NextResponse.json(
      { error: "Score harus antara 0 - 10!" },
      { status: 400 },
    );
  }

  try {
    const animeList = await prisma.animeList.findUnique({
      where: {
        id,
        user: {
          user_id: userId,
        },
      },
    });

    /** If anime not found */
    if (!animeList) {
      return NextResponse.json({ error: "Anime not found" }, { status: 404 });
    }

    /** Update watched episode and status if user choose completed status */
    if (status === "Completed") {
      watched_episode = animeList.total_episode;
    }

    /** Update status to plan to watch to zero if user choose PlanToWatch status */
    if (status === "PlanToWatch") {
      watched_episode = 0;
    }

    //* Update status to plan to watch to zero if user choose PlanToWatch status */
    if (watched_episode == 0) {
      status = "PlanToWatch";
    }

    /** Update status if user choose other status */
    if (!daftarStatus.includes(status)) {
      status = animeList.status;
    }

    /** Update status to completed if user watched all episode */
    if (WATCHED_EPISODE_NUMBER === animeList.total_episode) {
      status = "Completed";
    }

    await prisma.animeList.update({
      where: {
        id: id,
        user: {
          user_id: userId,
        },
      },
      data: {
        status,
        score,
        watched_episode: Number(watched_episode),
        start_watch,
        end_watch,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update anime" },
      { status: 500 },
    );
  }
}
