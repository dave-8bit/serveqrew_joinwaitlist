import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, AlertCircle, Mail } from 'lucide-react';
import { supabase, supabaseUrl, supabaseAnonKey } from '../lib/supabase';

type FormStatus =
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }
  | { type: 'warning'; message: string }
  | { type: 'info'; message: string };

export default function WaitlistForm() {
  const [isJoining, setIsJoining] = useState(false);
  const [status, setStatus] = useState<FormStatus | null>(null);
  const [refCode, setRefCode] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('ref');
    if (code) setRefCode(code);
  }, []);

  const joinWaitlist = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsJoining(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const payload = {
      full_name: formData.get('full_name'),
      email: email,
      brand_name: formData.get('brand_name') || undefined,
      ref: refCode || undefined,
    };

    try {
      const response = await fetch(
        `${supabaseUrl}/functions/v1/smooth-worker`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey.trim()}`
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.status === 201 || response.ok) {
        setStatus({ type: 'success', message: data.message || "Welcome to the Qrew!" });
      } 
      else if (response.status === 409 || data.message?.toLowerCase().includes('already')) {
        setStatus({ type: 'info', message: "Account found. Sending access link..." });
        const { error: authError } = await supabase.auth.signInWithOtp({
          email: email,
          options: { emailRedirectTo: `${window.location.origin}/dashboard` },
        });
        if (authError) throw authError;
        setStatus({ type: 'success', message: "Access link sent! Check your inbox." });
      } else {
        setStatus({
          type: response.status === 429 ? 'warning' : 'error',
          message: data.message || 'Request failed. Please try again.',
        });
      }
    } catch (err: unknown) {
      console.error("Submission Error:", err); // <-- dev-friendly logging
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'We encountered an error. Please try again later.'; // <-- user-friendly message
      setStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsJoining(false);
    }
  };

  if (status?.type === 'success') {
    return (
      <section className="relative z-10 py-16 sm:py-32 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto p-8 md:p-12 border border-secondary-teal/20 rounded-[40px] bg-white/[0.03] backdrop-blur-2xl shadow-2xl"
        >
          <div className="w-20 h-20 bg-secondary-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-secondary-teal" />
          </div>
          <h3 className="text-2xl md:text-3xl font-black uppercase italic text-white mb-6">
            Check Your <span className="text-secondary-teal">Email</span>
          </h3>
          <p className="text-sm font-bold italic text-slate-400 mb-8">{status.message}</p>
          <button onClick={() => setStatus(null)} className="text-xs font-black uppercase italic text-secondary-teal hover:underline">
            Go back
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="relative z-10 py-16 sm:py-32 px-4 scroll-mt-24">
      <div className="w-full max-w-md md:max-w-2xl mx-auto">
        <motion.div className="relative p-4 md:p-8 border rounded-[40px] bg-white/[0.03] backdrop-blur-3xl border-white/10 shadow-2xl">
          <form className="flex flex-col gap-4" onSubmit={joinWaitlist}>
            <input name="full_name" required placeholder="Full Name" className="px-6 py-4 rounded-2xl font-bold bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-secondary-teal/50" />
            <input name="email" type="email" required placeholder="Email Address" className="px-6 py-4 rounded-2xl font-bold bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-secondary-teal/50" />
            <input name="brand_name" placeholder="Brand Name (Optional)" className="px-6 py-4 rounded-2xl font-bold bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-secondary-teal/50" />

            {status && (
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-[10px] font-black uppercase italic ${
                status.type === 'error' ? 'bg-red-500/10 text-red-500' : 
                status.type === 'info' ? 'bg-blue-500/10 text-blue-400' :
                'bg-secondary-teal/10 text-secondary-teal'
              }`}>
                <AlertCircle className="w-4 h-4" />
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isJoining}
              className="py-5 rounded-2xl font-black uppercase italic flex items-center justify-center gap-2 bg-secondary-teal text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isJoining ? <Loader2 className="animate-spin" /> : <><Sparkles /> Join or Log In</>}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
