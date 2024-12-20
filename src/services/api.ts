import axios from 'axios';
import { Product } from '../types';

const API_URL = 'http://localhost:5000/api';

export const api = {
  async searchProducts(query: string): Promise<Product[]> {
    const response = await axios.get(`${API_URL}/products/search`, {
      params: { query }
    });
    return response.data;
  },

  async getProducts(params?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    limit?: number;
  }): Promise<Product[]> {
    const response = await axios.get(`${API_URL}/products`, { params });
    return response.data;
  },

  async getProduct(id: string): Promise<Product> {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  }
};