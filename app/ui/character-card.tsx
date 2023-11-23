"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGesture } from '@use-gesture/react';
import Image from 'next/image';
import { useState, useRef } from 'react';

export default function CharacterCard({ card }: { card: any }) {

  const cardRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleOnLoad = () => {
    setIsLoading(false);
  };

  const bind = useGesture({
    onHover: ({ hovering }) => {
      hovering 
        ? cardRef.current?.classList.add('shadow-none', 'bg-gray-200')
        : cardRef.current?.classList.remove('shadow-none', 'bg-gray-200');
    },
  });


  return (
    <Card {...bind()} key={card.id} className="h-80 transition-shadow" ref={cardRef} >
      <CardHeader>
        <CardTitle className="line-clamp-1">{card.name}</CardTitle>
        <CardDescription className="line-clamp-1">{card.type}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <Skeleton className="h-[208px] w-[148px]" />}
        <Image
          src={card.imageUrl}
          alt={card.name}
          loading="eager"
          width={148}
          height={208}
          priority={true}
          onLoad={handleOnLoad}
          onError={handleOnLoad}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      </CardContent>
    </Card>
  );
}
