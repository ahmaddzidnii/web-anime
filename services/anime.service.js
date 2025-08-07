import axios from "axios";

import { axiosInstance } from "@/lib/axios/axiosInstance";

export const getAnimeQuery = async (q, page) => {
  try {
    const response = await axiosInstance.get(
      `/anime?q=${q}&sfw=true&limit=24&page=${page}`,
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching popular anime:", error.message);
    return [];
  }
};
export async function getAnimeTop({
  resource,
  limit = 10,
  sfw = true,
  query = "",
}) {
  try {
    const response = await axiosInstance.get(
      `${resource}?sfw=${sfw}&limit=${limit}${query}`,
    );
    return response.data;
  } catch (error) {}
}

export const getAnimeAnak = async (limit, page = 1) => {
  try {
    const response = await axiosInstance.get(
      `anime?sfw=true&rating=pg&limit=${limit}&page=${page}&order_by=popularity`,
    );
    const { data } = response;
    return data;
  } catch (error) {
    console.error("Error fetching popular anime:", error.message);
    return [];
  }
};

/**
 * Retrieves the character data for a given ID from the anime API.
 *
 * @param {number} id - The ID of the anime.
 * @return {Promise<Array>} A Promise that resolves to an array of character data, or an empty array if the request fails.
 */
export const getCharacterById = async (id) => {
  try {
    const response = await axiosInstance.get(`/anime/${id}/characters`);
    return response.data.data;
  } catch (error) {
    return [];
  }
};

const ANIME_URL = process.env.NEXT_PUBLIC_ANIME_BASE_URL;

/**
 * Fetches the top anime from the top anime API.
 *
 * @return {Promise<Object>} The response data containing the top anime.
 */
export const fetchAnimeTop = async () => {
  const { data } = await axios.get(`${ANIME_URL}/top/anime?limit=10`);
  return data;
};

/**
 * Fetches the top anime from Anak Anime API based on popularity.
 *
 * @return {Promise<Object>} The response data containing the top anime.
 * @throws {Error} If there is an error while fetching the data.
 */
export const fetchAnimeAnakTop = async () => {
  const { data } = await axios.get(
    `${ANIME_URL}/anime?sfw=true&rating=pg&limit=10&order_by=popularity`,
  );
  return data;
};

/**
 * Fetches anime search results from the API based on the provided query.
 *
 * @param {string} query - The search query to filter anime results.
 * @return {Promise<Object>} A promise that resolves to the search results data.
 */
export const fetchSearchAnime = async (query) => {
  const { data } = await axios.get(
    `${ANIME_URL}/anime?q=${query}&sfw=true&limit=10`,
  );

  return data;
};
