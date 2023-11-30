"use client";

const DEFAULT_COLUMN_COUNT = 6;
const DEFAULT_GAP = 24;

import { useLayoutEffect, useMemo, useRef, useState } from "react";

/**
 * Options for configuring the responsive virtual grid.
 */
type Option = {
  containerMinWidth: number; // Minimum width of the container for this option
  cellMaxWidth: number; // Maximum width of a cell in the grid
  gridGap: number; // Gap between cells in the grid
};

/**
 * Parameters for the `useResponsiveVirtualGrid` hook.
 */
export type UseResponsiveVirtualGridParams = {
  defaultOption: Omit<Option, "containerMinWidth">; // Default grid options, excluding containerMinWidth
  options?: Option[]; // Additional responsive options
};

/**
 * Custom React hook for creating a responsive virtual grid.
 *
 * @param {Omit<Option, "containerMinWidth">} params.defaultOption - Default options for the grid,
 *    excluding minimum container width.
 * @param {Option[]} [params.options=[]] - Array of options for different breakpoints.
 * @returns An object containing the ref for the container element, the count of columns, and the gap between
 *    cells.
 */
export const useResponsiveVirtualGrid = ({
  defaultOption,
  options = [],
}: UseResponsiveVirtualGridParams) => {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(DEFAULT_COLUMN_COUNT); // Default to 6 columns
  const [gap, setGap] = useState(DEFAULT_GAP); // Default to `24px` gap

  // Memoize the sorting of options based on `containerMinWidth` in descending order
  const sortedOptions = useMemo(
    () =>
      [...options].sort((a, b) => b.containerMinWidth - a.containerMinWidth),
    [options]
  );

  useLayoutEffect(() => {
    const currentRef = ref.current; // Current reference to the container

    // Initialize `ResizeObserver` to handle container resizing
    let observer: ResizeObserver | null = null;

    if (currentRef) {
      observer = new ResizeObserver(() => {

        // Get the current width of the container
        const width = currentRef.getBoundingClientRect().width;

        // Check if no sorted options or width is less than the smallest option
        if (
          sortedOptions.length === 0 ||
          width < sortedOptions[sortedOptions.length - 1].containerMinWidth
        ) {

          // Set `count` and `gap` based on `defaultOption`
          setCount(
            Math.max(Math.floor(width / defaultOption.cellMaxWidth) - 1, 1)
          );
          setGap(defaultOption.gridGap);
        }

        // Iterate through sorted options to find the appropriate setting
        for (const option of sortedOptions) {
          if (width >= option.containerMinWidth) {
            setCount(Math.max(Math.floor(width / option.cellMaxWidth) - 1, 1));
            setGap(option.gridGap);
            break;
          }
        }

      });

      // Start observing the container for resize events
      observer.observe(ref.current);
    }

    // Cleanup function to stop observing when the component unmounts
    return () => {
      if (currentRef && observer) observer.unobserve(currentRef);
    };
  }, [sortedOptions, defaultOption]);

  // Return the `ref`, `count`, and `gap` for use in the component
  return { ref, count, gap };
};
