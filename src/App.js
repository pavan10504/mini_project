import React, { useState } from 'react';
import ChatbotLanding from './components/chatbot.js'
import TreeVisualization from './components/tree.js';
import './App.css'

const App = () => {
  const [showTree, setShowTree] = useState(false);

  const toggleTree = () => {
    setShowTree(!showTree);
  };

  return (
    <div className="App">
      <ChatbotLanding onToggleTree={toggleTree} />
    </div>
  );
}

export default App;