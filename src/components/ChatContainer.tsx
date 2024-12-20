import React from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChatStore } from '../store/chatStore';
import { processUserMessage } from '../services/chatService';

export const ChatContainer: React.FC = () => {
  const { messages, isTyping, addMessage, setTyping, resetChat } = useChatStore();
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    addMessage(content, 'user');
    setTyping(true);
    
    try {
      // Process message and get bot response
      const botResponse = await processUserMessage(content);
      addMessage(botResponse.content, 'bot', botResponse.products);
    } catch (error) {
      addMessage("I'm sorry, I encountered an error. Please try again.", 'bot');
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">Shopping Assistant</h2>
        <button
          onClick={resetChat}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="New Chat"
        >
          <MessageSquarePlus size={20} />
        </button>
      </div>
      
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="flex gap-2 items-center text-gray-500">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="animate-pulse">...</span>
            </div>
            <span>Assistant is typing...</span>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}