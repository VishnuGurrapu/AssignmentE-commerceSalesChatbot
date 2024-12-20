import { create } from 'zustand';
import { ChatState, Message } from '../types';

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isTyping: false,
  addMessage: (content: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender,
      timestamp: new Date(),
    };
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },
  setTyping: (typing: boolean) => set({ isTyping: typing }),
  resetChat: () => set({ messages: [] }),
}));