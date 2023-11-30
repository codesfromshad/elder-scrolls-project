"use client";

import { Fragment } from "react";
import { faker } from "@faker-js/faker";
import RowVirtualizerDynamicWindow from "./virtual-grid";
import { useResponsiveVirtualGrid } from "@/hooks/useResponsiveVirtualGrid";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCards } from "@/lib/data";

export default function InfiniteCharacterCards({
  initialData,
  searchParams,
}: {
  initialData: any;
  searchParams?: { query?: string; page?: string };
}) {
  const randomNumber = (min: number, max: number) =>
    faker.number.int({ min, max });

  const sentences = new Array(100)
    .fill(true)
    .map(() => faker.lorem.sentence(randomNumber(20, 70)));

  // useInfiniteQuery to fetch data
  const { status, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["fetchCards"],
      queryFn: async ({ pageParam }) =>
        await fetchCards(searchParams?.query, 20, pageParam),
      initialPageParam: 1,
      initialData: () => {
        return {
          pages: [initialData],
          pageParams: [1],
        };
      },
      getNextPageParam: (lastPage) => lastPage.nextOffset
    });

  const { ref, count, gap } = useResponsiveVirtualGrid({
    defaultOption: {
      cellMaxWidth: 160,
      gridGap: 12,
    },
    options: [
      {
        containerMinWidth: 640,
        cellMaxWidth: 160,
        gridGap: 12,
      },
      {
        containerMinWidth: 768,
        cellMaxWidth: 180,
        gridGap: 12,
      },
      {
        containerMinWidth: 1024,
        cellMaxWidth: 200,
        gridGap: 12,
      },
    ],
  });

  const allCards = data ? data.pages.flatMap((d) => d.data.cards) : []

  return (
    <RowVirtualizerDynamicWindow
      ref={ref}
      datas={allCards}
      count={count}
      gap={gap}
    />
  );
}
