import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Search from './ui/search'
import { InfiniteLoader, List } from 'react-virtualized';

import { fetchCards } from '@/lib/data'
import CharacterCard from './ui/character-card'
import InfiniteCharacterCards from './ui/infinite-character-cards';

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

  const { data: { cards } } = await fetchCards(query, currentPage);

  return (
    <main>
      <div className="sticky top-0 w-full bg-white p-3 shadow-md">
        <Search placeholder="Search..." />
      </div>
      <InfiniteCharacterCards cards={cards} searchParams={searchParams} currentPage={currentPage} />
    </main>
  )
}

export const runtime = 'edge';