import { axiosInstance } from "@/lib/axios/axiosInstance";

export const getPopularAnime = async ({ limit = 10 }) => {
  const response = await axiosInstance.get(`/top/anime?limit=${limit}`);

  return response.data.data;
};
