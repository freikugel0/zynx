import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

export function serverApi(): AxiosInstance {
  const instance = axios.create({
    baseURL: process.env.API_URL,
    timeout: 10_000,
  });

  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const store = await cookies();
      const access = store.get("access_token")?.value;

      if (access) {
        config.headers.Authorization = `Bearer ${access}`;
      }

      return config;
    },
  );

  instance.interceptors.response.use(
    (res) => res.data,
    (err) => Promise.reject(err),
  );

  return instance;
}
