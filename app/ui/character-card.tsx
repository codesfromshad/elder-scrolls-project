"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { useState } from 'react';

export default function CharacterCard({ card }: { card: any }) {
 // Use a boolean state for each card to track its loading status
 const [isLoading, setIsLoading] = useState(true);

 const handleLoadingComplete = () => {
   setIsLoading(false);
 };

  return (
    <Card key={card.id} className="h-80">
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
          onLoadingComplete={handleLoadingComplete}
          onError={handleLoadingComplete}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      </CardContent>
    </Card>
  );
}
