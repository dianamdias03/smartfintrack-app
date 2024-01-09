import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ServiceProvider } from './providers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ServiceProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ServiceProvider>
  </React.StrictMode>
);