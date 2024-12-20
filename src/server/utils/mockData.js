import { Product } from '../models/Product.js';

const categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports'];
const adjectives = ['Premium', 'Deluxe', 'Essential', 'Professional', 'Classic'];
const products = ['Laptop', 'Smartphone', 'Headphones', 'Camera', 'Watch'];

export async function generateMockProducts(count = 100) {
  const mockProducts = [];

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    
    mockProducts.push({
      name: `${adjective} ${product}`,
      description: `High-quality ${product.toLowerCase()} for everyday use`,
      category,
      price: Math.floor(Math.random() * 1000) + 50,
      stock: Math.floor(Math.random() * 100),
      image: `https://source.unsplash.com/400x400/?${product.toLowerCase()}`
    });
  }

  try {
    await Product.deleteMany({});
    await Product.insertMany(mockProducts);
    console.log('Mock products generated successfully');
  } catch (error) {
    console.error('Failed to generate mock products:', error);
  }
}