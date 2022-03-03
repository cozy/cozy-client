import React from 'react';
import './App.css';
import Example from './Example'
import DebugClientProvider from './DebugClientProvider'

function App() {
  return (
    <div className="App">
      <DebugClientProvider>
        <Example />
      </DebugClientProvider>
    </div>
  );
}

export default App;
