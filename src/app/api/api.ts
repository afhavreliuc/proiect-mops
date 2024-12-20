import axios, { AxiosInstance } from "axios";

const shazamApi: AxiosInstance = axios.create({
  baseURL: "https://shazam-song-recognition-api.p.rapidapi.com",
});

const logErrorResponse = (error: any) => {
  return Promise.reject(error);
};

shazamApi.interceptors.request.use(undefined, logErrorResponse);
shazamApi.interceptors.response.use((response) => response, logErrorResponse);

export { shazamApi };
