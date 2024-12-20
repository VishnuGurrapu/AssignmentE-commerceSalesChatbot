import React from 'react';
import { format } from 'date-fns';
import { Bot, User } from 'lucide-react';
import { Message } from '../types';
import { ProductCard } from './ProductCard';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex gap-2 max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className="flex-shrink-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isBot ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
          }`}>
            {isBot ? <Bot size={20} /> : <User size={20} />}
          </div>
        </div>
        <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
          <div className={`rounded-lg px-4 py-2 ${
            isBot ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'
          }`}>
            {message.content}
          </div>
          {message.products && message.products.length > 0 && (
            <div className="mt-3 space-y-2 w-full">
              {message.products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <span className="text-xs text-gray-500 mt-1">
            {format(message.timestamp, 'HH:mm')}
          </span>
        </div>
      </div>
    </div>
  );
}