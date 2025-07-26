import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TestPage from './components/TestPage';
import CoursesPage from './components/CoursesPage';
import NotesPage from './components/NotesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/test/:language/:level" element={<TestPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/notes" element={<NotesPage />} />
    </Routes>
  );
}

export default App;