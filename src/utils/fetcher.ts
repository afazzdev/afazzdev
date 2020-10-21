import axios, { AxiosRequestConfig } from "axios";

const API = process.env.API_URL || "http://localhost:1337";

export const withEndpoint = (path: string) => API + path;

export const fetcher = (resource: string) =>
  axios(withEndpoint(resource)).then((res) => res.data);

export const fetcherWithId = (resource: string, id: string | string[]) =>
  axios
    .get(withEndpoint(resource), {
      params: {
        id,
      },
    })
    .then((res) => res.data);

export const fetcherWithSlug = (resource: string, slug: string) =>
  axios
    .get(withEndpoint(resource), {
      params: {
        slug,
      },
    })
    .then((res) => res.data);
