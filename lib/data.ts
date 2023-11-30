import type { MagicthegatheringAPIResponse } from "./types";

const DEFAULT_FETCH_COUNT = 20;
const DEFAULT_OFFSET = 1;

export async function fetchCards(
  query?: string,
  limit?: number,
  offset?: number
): Promise<{ 
  totalCount: string | null,
  data: MagicthegatheringAPIResponse,
  prevOffset: number
  nextOffset: number
}> {
  const res = await fetch(
    `https://api.magicthegathering.io/v1/cards?&name=${query || ''}&page=${
      offset || DEFAULT_OFFSET
    }&pageSize=${limit || DEFAULT_FETCH_COUNT}&contains=imageUrl`
  );

  if (!res.ok) throw new Error("Failed to fetch data");

  const jsonReponse = await res.json();

  return {
    totalCount: res.headers.get("Total-Count"),
    data: jsonReponse as MagicthegatheringAPIResponse,
    prevOffset: offset ? offset - DEFAULT_OFFSET : DEFAULT_OFFSET,
    nextOffset: offset ? offset + DEFAULT_OFFSET : DEFAULT_OFFSET,
  };
}

