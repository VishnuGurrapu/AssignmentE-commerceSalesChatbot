export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  products?: Product[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  addMessage: (content: string, sender: 'user' | 'bot') => void;
  setTyping: (typing: boolean) => void;
  resetChat: () => void;
}