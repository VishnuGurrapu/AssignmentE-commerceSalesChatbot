import React from 'react';
import { Product } from '../types';
import { ExternalLink } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-16 h-16 object-cover rounded-md"
      />
      <div className="flex-1">
        <h4 className="font-medium text-blue-900">{product.name}</h4>
        <p className="text-sm text-blue-800">{product.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold text-blue-900">${product.price}</span>
          <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
            View Details
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}