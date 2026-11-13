import axios from "axios";

export const productsApi = axios.create({
  baseURL: "https://ranekapi.origamid.dev/json/api",
});

export const favoriteApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FAVORITES_API_URL,
});