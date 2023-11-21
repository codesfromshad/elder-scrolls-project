const ITEMS_PER_PAGE = 20;
export async function fetchCards(
  query?: string,
  currentPage = 1,
) {
  const res = await fetch(`https://api.magicthegathering.io/v1/cards?&name=${query}&page=${currentPage}&pageSize=${ITEMS_PER_PAGE}&contains=imageUrl`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json();
}
