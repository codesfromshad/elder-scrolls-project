import { Input } from '@/components/ui/input'
import Image from 'next/image';
import Search from './ui/search';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { fetchCards } from '@/lib/data'
import CharacterCard from './ui/character-card'
import RowVirtualizerDynamicWindow from './ui/virtual-grid';
import { useResponsiveVirtualGrid } from '@/hooks/useResponsiveVirtualGrid';
import InfiniteCharacterCards from './ui/infinite-character-cards-2';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const initialData = await fetchCards(query, 20, currentPage);

  return (
    <main>
      <div className="sticky top-0 w-full bg-white p-3 shadow-md z-10">
        <Search placeholder="Search..." />
      </div>
      <InfiniteCharacterCards initialData={initialData} />
    </main>
  )
}

export const runtime = 'edge';