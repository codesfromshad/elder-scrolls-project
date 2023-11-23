"use client";

import React, { useState, useEffect, useLayoutEffect, use } from 'react';
import { InfiniteLoader, List } from 'react-virtualized';
import { fetchCards } from '@/lib/data';
import CharacterCard from './character-card';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function InfiniteCharacterCards({
  cards,
  searchParams,
  currentPage
}:
  {
    cards: any;
    searchParams?: {
      query?: string;
      page?: string;
    };
    currentPage: number;
  }
) {
  const [gridRowCount, setGridRowCount] = useState(0);
  const [gridColumnCount, setGridColumnCount] = useState(0);
  const [skeletonCardCount, setSkeletonCardCount] = useState(0);
  const [resizeTrigger, setResizeTrigger] = useState('');
  
  useLayoutEffect(() => {
    const updateGridSize = () => {
      const grid = document.querySelector('#grid');
      if (grid) {
        const gridComputedStyle = window.getComputedStyle(grid);
  
        const rowCount = gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length;
        const columnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
  
        setGridRowCount(rowCount);
        setGridColumnCount(columnCount);

        const totalCells = rowCount * columnCount;
        const skeletonNeeded = totalCells - (cards?.length || 0);
      
        setSkeletonCardCount(Math.max(skeletonNeeded, 0));
      }
    };
    updateGridSize();

    window.addEventListener('resize', updateGridSize);
    return () => {
      window.removeEventListener('resize', updateGridSize);
    };
  }, [cards?.length, gridColumnCount, gridRowCount, resizeTrigger]);


  return (
    <section className="p-3">
      <div id="grid" className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-3">
        {cards?.map((card: any, index: number) => (
          <CharacterCard key={card.id} card={card} />
        ))}
        
        {/* Render the calculated number of skeleton cards */}
        {Array.from({ length: skeletonCardCount }).map((_, idx) => (
          <Card key={`skeleton-${idx}`} className="h-80 shadow-none" >
            <CardHeader>
              <Skeleton className="w-full h-4"></Skeleton>
              <Skeleton className="w-3/4 h-4"></Skeleton>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[208px] w-[148px]" />
            </CardContent>
          </Card>
        ))}
        
      </div>
    </section>
  );
}