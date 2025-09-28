import React from 'react';
import { createRoot } from 'react-dom/client'; // ✅ Only this is needed
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import App from './App';

// Make sure the element with id="root" exists in your index.html
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    
    <App />
  </Provider>
);
