import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Search from './ui/search'
import { Skeleton } from '@/components/ui/skeleton'

import { fetchCards } from '@/lib/data'
import CharacterCard from './ui/character-card'

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

  const { cards } = await fetchCards(query, currentPage);

  return (
    <main className="p-3 space-y-4">
      <Search className="" placeholder="Search..." />
      <section className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-3">
        {cards?.map((card: any) => (
          <CharacterCard key={card.id} card={card} />
        ))}
      </section>
    </main>
  )
}

export const runtime = 'edge';