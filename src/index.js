import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import QuizContextProvider from './QuizContext';
import UserProvider from './UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <QuizContextProvider>
        <App />
      </QuizContextProvider>
    </UserProvider>
  </React.StrictMode>
);

