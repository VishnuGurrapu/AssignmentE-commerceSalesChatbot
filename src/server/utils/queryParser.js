const PRICE_RANGES = {
  'cheap': { min: 0, max: 100 },
  'affordable': { min: 100, max: 300 },
  'expensive': { min: 300, max: 1000 },
  'premium': { min: 1000, max: Infinity }
};

export async function parseUserQuery(query) {
  // Convert query to lowercase for consistent matching
  query = query.toLowerCase();
  
  // Extract price range indicators
  let priceRange = null;
  Object.entries(PRICE_RANGES).forEach(([range, values]) => {
    if (query.includes(range)) {
      priceRange = values;
    }
  });

  // Extract category hints
  const categoryKeywords = {
    'electronics': ['laptop', 'computer', 'phone', 'headphone', 'camera', 'watch'],
    'accessories': ['bag', 'backpack', 'wallet', 'case'],
    'clothing': ['shirt', 'jacket', 'pants', 'dress']
  };

  let category = null;
  Object.entries(categoryKeywords).forEach(([cat, keywords]) => {
    if (keywords.some(keyword => query.includes(keyword))) {
      category = cat;
    }
  });

  return {
    searchTerms: query,
    priceRange,
    category
  };
}