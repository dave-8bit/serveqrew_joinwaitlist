import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import { supabase } from './lib/supabase';
// Note the "type" keyword added here
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
    return <div className="min-h-screen bg-slate-950" />;
  }

  return (
    <div className="min-h-screen font-sans antialiased bg-slate-950 text-white selection:bg-teal-500/30">
      {!session && <Navigation />}

      <main className="relative">
        {session ? (
          <Dashboard session={session} />
        ) : (
          <LandingPage />
        )}
      </main>
    </div>
  );
}

export default App;