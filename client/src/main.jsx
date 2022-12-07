import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { FoodContextProvider } from './store/FoodContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FoodContextProvider>
      <App />
    </FoodContextProvider>
  </React.StrictMode>
);
