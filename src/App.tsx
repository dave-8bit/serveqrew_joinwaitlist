import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import { supabase } from './lib/supabase';
import type { Session } from '@supabase/supabase-js';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);

      if (_event === 'SIGNED_IN') {
        window.history.replaceState({}, '', window.location.pathname);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-secondary-teal border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase italic tracking-[0.3em] text-secondary-teal animate-pulse">
          Securing Connection...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans antialiased bg-slate-950 text-white selection:bg-teal-500/30">
      <Navigation session={session} />

      <main className="relative">
        <Routes>
          <Route 
            path="/" 
            element={
              session ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LandingPage /> // ✅ Only one form now, inside LandingPage
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              session ? <Dashboard session={session} /> : <Navigate to="/" replace />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
