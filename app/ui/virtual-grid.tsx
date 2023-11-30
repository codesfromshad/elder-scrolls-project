"use client";

import { useLayoutEffect, forwardRef, useRef, useCallback, useEffect } from "react";
import {
  elementScroll,
  useWindowVirtualizer,
  VirtualizerOptions,
  type Virtualizer,
} from "@tanstack/react-virtual";

import type { MutableRefObject } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from 'next/image';
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCards } from "@/lib/data";

type Props<T> = {
  searchParams?: {
    query?: string;
    page?: string;
  };
  initialData?: T[];
  datas: T[];
  count: number;
  gap: number;
};

function easeInOutQuint(t: number): number {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}


// Use `forwardRef` to forward the ref to the component
const RowVirtualizerDynamicWindow = forwardRef<HTMLDivElement, Props<unknown>>(
  ({ searchParams, initialData, datas, count, gap }, ref) => {

    const matrix = datas.reduce<number[][]>((acc, _curr, i) => {
      if (i % count === 0) acc.push([i + 1]);
      else acc[acc.length - 1].push(i + 1);
      return acc;
    }, []) || [];

    const colsArray = new Array(count).fill(0);

    // parentRef is now derived from the forwarded ref
    const parentRef = ref as MutableRefObject<HTMLDivElement>;
    const scrollingRef = useRef<number>(0);
    const parentOffsetRef = useRef<number>(0);

    useLayoutEffect(() => {
      parentOffsetRef.current = parentRef.current?.offsetTop ?? 0;
    }, [parentRef]);

    const scrollToFn: VirtualizerOptions<any, any>['scrollToFn'] =
      useCallback((offset, canSmooth, instance) => {
        const duration = 1000
        const start = parentRef.current.scrollTop
        const startTime = (scrollingRef.current = Date.now())

        const run = () => {
          if (scrollingRef.current !== startTime) return
          const now = Date.now()
          const elapsed = now - startTime
          const progress = easeInOutQuint(Math.min(elapsed / duration, 1))
          const interpolated = start + (offset - start) * progress

          if (elapsed < duration) {
            elementScroll(interpolated, canSmooth, instance)
            requestAnimationFrame(run)
          } else {
            elementScroll(interpolated, canSmooth, instance)
          }
        }

        requestAnimationFrame(run);

    }, [parentRef])

    const virtualizer = useWindowVirtualizer({
      count: matrix.length,
      estimateSize: () =>
        parentRef.current?.clientWidth
          ? parentRef.current.clientWidth / count
          : 100,
      scrollMargin: parentOffsetRef.current,
      overscan: 10,
    });

    const items = virtualizer.getVirtualItems();

    return (
      <>
       {/* <button onClick={() => virtualizer.scrollToOffset(4632, {behavior: 'smooth'})}>asd</button> */}
        <div ref={parentRef} className="p-1.5">
          <div
            style={{
              height: virtualizer.getTotalSize(),
              width: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${
                  (items.length > 0 &&
                    items[0].start - virtualizer.options.scrollMargin) ||
                  0
                }px)`,
              }}
            >
              {items.map((virtualRow) => {
                return (
                  <div
                    key={`r${virtualRow.key}`}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                    className="flex gap-6 p-3"
                    style={{ gap, padding: gap / 2 }}
                  >
                    {colsArray.map((_, i) => (
                      <div
                        key={
                          matrix[virtualRow.index][i] ??
                          `r${virtualRow.key}-c${i}`
                        }
                        style={{ width: "100%" }}
                      >
                        {matrix[virtualRow.index][i] ? (
                          <Card>
                            {/* {matrix[virtualRow.index][i]} */}
                            <CardHeader>
                              <CardTitle className="line-clamp-1">{datas[matrix[virtualRow.index][i] - 1].name}</CardTitle>
                              <CardDescription className="line-clamp-1">Test</CardDescription>
                            </CardHeader>
                            <CardContent>
                              {true && <Skeleton className="h-[208px] w-[148px]" />}
                            </CardContent>
                          </Card>
                        ) : (
                          <div style={{ width: "100%" }}></div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
);

RowVirtualizerDynamicWindow.displayName = "RowVirtualizerDynamicWindow";
export default RowVirtualizerDynamicWindow;
