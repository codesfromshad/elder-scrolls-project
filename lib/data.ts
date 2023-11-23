const ITEMS_PER_PAGE = 20;
export async function fetchCards(
  query?: string,
  currentPage = 1,
) {
  const res = await fetch(`https://api.magicthegathering.io/v1/cards?&name=${query}&page=${currentPage}&pageSize=${ITEMS_PER_PAGE}&contains=imageUrl`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const totalCount = res.headers.get('Total-Count');
  const data = await res.json();

  return { 
    totalCount, 
    data 
  };
}
