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
    // 1️⃣ Get initial session (runs once on app load)
    const initSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    initSession();

    // 2️⃣ Listen for auth state changes (sign in / sign out / refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ⏳ Global loading screen (prevents route flicker)
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
      {/* Navigation already handles UI logic based on session */}
      <Navigation session={session} />

      <main className="relative pt-20">
        <Routes>
          {/* Public route */}
          <Route
            path="/"
            element={session ? <Navigate to="/dashboard" replace /> : <LandingPage />}
          />

          {/* Protected route */}
          <Route
            path="/dashboard"
            element={session ? <Dashboard session={session} /> : <Navigate to="/" replace />}
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
