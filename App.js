import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import MoodSelection from './components/MoodSelection';
import TasksView from './components/TasksView';
import Social from './components/Social';
import Profile from './components/Profile';
import Rewards from './components/Rewards';
import Chat from './components/Chat';
import Navigation from './components/Navigation';
import { UserProvider } from './context/UserContext';
import { MoodProvider } from './context/MoodContext';
import { TaskProvider } from './context/TaskContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected route component to handle authentication
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <MoodProvider>
            <TaskProvider>
              <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
                <AppRoutes />
              </div>
            </TaskProvider>
          </MoodProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

function AppRoutes() {
  const { currentUser, initializing } = useAuth();
  
  // Show loading state while checking authentication
  if (initializing) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  return (
    <>
      {currentUser && <Navigation />}
      <div className="container mx-auto px-4 py-4 pb-20">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/mood" element={
            <ProtectedRoute>
              <MoodSelection />
            </ProtectedRoute>
          } />
          <Route path="/tasks" element={
            <ProtectedRoute>
              <TasksView />
            </ProtectedRoute>
          } />
          <Route path="/social" element={
            <ProtectedRoute>
              <Social />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/rewards" element={
            <ProtectedRoute>
              <Rewards />
            </ProtectedRoute>
          } />
          <Route path="/chat" element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
