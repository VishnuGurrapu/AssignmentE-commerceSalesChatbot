import { api } from './api';
import { Message } from '../types';

export async function processUserMessage(message: string): Promise<Message> {
  try {
    const response = await api.searchProducts(message);
    
    return {
      id: crypto.randomUUID(),
      content: response.message,
      sender: 'bot',
      timestamp: new Date(),
      products: response.products
    };
  } catch (error) {
    return {
      id: crypto.randomUUID(),
      content: "I'm sorry, I encountered an error while searching for products. Please try again.",
      sender: 'bot',
      timestamp: new Date()
    };
  }
}