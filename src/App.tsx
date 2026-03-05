import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './views/RegisterPage';
import Dashboard from './views/Dashboard';
import Indicators from './views/Indicators';

// Placeholder for About Page
const AboutPage = () => (
  <div className="min-h-screen bg-brand-bg flex items-center justify-center">
    <div className="text-center max-w-2xl px-4">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">About Imihigo Tracker</h1>
      <p className="text-slate-600 leading-relaxed">
        Imihigo is a traditional Rwandan practice where leaders or individuals set performance targets to be achieved within a specific period. 
        This tracker helps digitize and monitor these contracts for better accountability and development.
      </p>
      <a href="/" className="text-brand-primary font-bold hover:underline mt-6 inline-block">Back to Home</a>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/indicators" element={<Indicators />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
