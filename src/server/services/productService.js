import { products } from '../data/products.js';
import { parseUserQuery } from '../utils/queryParser.js';

export async function searchProducts(userQuery) {
  const { searchTerms, priceRange, category } = await parseUserQuery(userQuery);

  let filteredProducts = products;

  // Filter by search terms
  if (searchTerms) {
    const terms = searchTerms.toLowerCase().split(' ');
    filteredProducts = filteredProducts.filter(product => {
      const searchText = `${product.name} ${product.description} ${product.category}`.toLowerCase();
      return terms.some(term => searchText.includes(term));
    });
  }

  // Filter by price range
  if (priceRange) {
    filteredProducts = filteredProducts.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
  }

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  return filteredProducts.slice(0, 5); // Return top 5 matches
}

export async function generateProductResponse(products) {
  if (products.length === 0) {
    return "I couldn't find any products matching your request. Could you please try describing what you're looking for differently?";
  }

  const response = ["Here are some products that might interest you:"];
  
  products.forEach(product => {
    response.push(
      `\n• ${product.name} - $${product.price} (${product.stock} in stock)\n  ${product.description}\n`
    );
  });

  response.push("\nWould you like more details about any of these products?\n");
  
  return response.join('\n');
}