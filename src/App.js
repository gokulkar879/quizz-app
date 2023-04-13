import React from 'react'
import './App.css';
import CreateQuiz from './pages/CreateQuiz';
import Home from './pages/Home';
import Quizpage from './pages/Quizpage';
import {
   BrowserRouter as Router,
   Routes,
   Route
} from 'react-router-dom'
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { useUserContext } from './UserContext';

function App() {
  const {user} = useUserContext()
  return (
      <Router>
        <Routes>
          <Route path="/home" element={<ProtectedRoute userId={user.id}><Home /></ProtectedRoute>}/>
          <Route path="/quiz/:id" element={<ProtectedRoute userId={user.id}><Quizpage /></ProtectedRoute>}/>
          <Route path="/createquiz" element={<ProtectedRoute userId={user.id}><CreateQuiz /></ProtectedRoute>}/>
          <Route path="/" element={<Login />}/>
        </Routes>
      </Router>
  );
}

export default App;
