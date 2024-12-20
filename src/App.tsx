import React from 'react';
import { ChatContainer } from './components/ChatContainer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
        <ChatContainer />
      </div>
    </div>
  );
}

export default App;