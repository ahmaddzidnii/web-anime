import { cache } from "react";
import { axiosInstance } from "@/lib/axios/axiosInstance";

export const getPopularAnime = cache(async ({ limit = 10 }) => {
  const response = await axiosInstance.get(`/top/anime?limit=${limit}`);
  return response.data.data;
});

export const getPopularAnimeForChildren = cache(async ({ limit = 10 }) => {
  const response = await axiosInstance.get(
    `anime?sfw=true&rating=pg&limit=${limit}&order_by=popularity`,
  );
  return response.data.data;
});
