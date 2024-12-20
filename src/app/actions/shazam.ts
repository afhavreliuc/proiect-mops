"use server";

import { shazamApi } from "../api/api";

export const getSongServer = async (data: FormData) => {
  const response = await shazamApi.post("/recognize/file", data, {
    headers: {
      "x-rapidapi-key": "991d8a1f6amsh1e5136645601c0ap14e9f0jsnc9352a0f653b",
      "x-rapidapi-host": "shazam-song-recognition-api.p.rapidapi.com",
    },
  });
  return response.data;
};
