import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element with ID 'root' not found");
}

createRoot(rootElement).render(
  <BrowserRouter>
  
    <App />
  
  </BrowserRouter>
);