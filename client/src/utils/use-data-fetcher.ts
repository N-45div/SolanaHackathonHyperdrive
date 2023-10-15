import { Key, SWRConfiguration } from "swr";
import useSWRImmutable from "swr/immutable";

export async function fetcher<T>(url: string, options?: RequestInit) {
  if (options)
    options =
      "headers" in options
        ? options
        : { ...options, headers: { "Content-Type": "application/json" } };
  else
    options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

  return await fetch(url, options).then(
    async (response) =>
      await response.json().then((data) => {
        if (response.ok) return data as T;
        throw new FetchError({
          message: response.statusText,
          response,
          data,
        });
      })
  );
}

export function useDataFetch<Data, Error = any>(
  key: Key,
  config?: SWRConfiguration
) {
  // Using SWRImmutable here to avoid refetch on stale/focus/reconnect
  // https://swr.vercel.app/docs/revalidation#disable-automatic-revalidations
  return useSWRImmutable<Data, Error>(key, fetcher, config);
}

export class FetchError extends Error {
  response: Response;
  data: {
    message: string;
  };
  constructor({
    message,
    response,
    data,
  }: {
    message: string;
    response: Response;
    data: {
      message: string;
    };
  }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }
    this.name = "FetchError";
    this.response = response;
    this.data = data ?? { message: message };
  }
}