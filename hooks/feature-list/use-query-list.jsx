import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";

export const useFetchList = (filters) => {
  const { userId, getToken } = useAuth();

  return useQuery({
    queryKey: ["list", filters?.status, filters?.orderBy],
    queryFn: async () => {
      const queryString = Object.entries(filters)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const response = await axios.get(`/api/list?${queryString}`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      return response.data;
    },
    refetchOnWindowFocus: "always",
    refetchOnReconnect: true,
    gcTime: 1000 * 60 * 10,
    enabled: !!userId,
  });
};

export const useFetchCountList = () => {
  const { userId, getToken } = useAuth();
  return useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const response = await axios.get(`/api/list/${userId}/count`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      return response.data;
    },
    enabled: !!userId,
  });
};
