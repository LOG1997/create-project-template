import React from 'react';
import ReactDOM from 'react-dom/client';
import 'virtual:svg-icons-register';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'virtual:windi.css';
import 'virtual:uno.css';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
