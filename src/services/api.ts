// src/services/api.ts
import axios from "axios";

export const getTokenData = async (token: string) => {
  const response = await axios.get(`https://phpstack-1269627-5582051.cloudwaysapps.com/api/verify/${token}`);
  return response.data;
};
