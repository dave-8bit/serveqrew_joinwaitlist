import { useState, useEffect } from 'react';
import { motion, } from 'framer-motion';
import { Sparkles, Loader2, AlertCircle, Mail } from 'lucide-react';

type FormStatus =
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }
  | { type: 'warning'; message: string }
  | { type: 'info'; message: string };

export default function WaitlistForm() {
  const [isJoining, setIsJoining] = useState(false);
  const [status, setStatus] = useState<FormStatus | null>(null);
  const [refCode, setRefCode] = useState<string | null>(null);

  // YOUR SUPABASE ANON KEY
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ucXlwa2dyYnFoa3p3cHRtYXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxMzg0MzIsImV4cCI6MjA4MTcxNDQzMn0.F4ddMOGvsUHoh935pmgacBDhl2Z-I4qBRQLhxSLZCNA";

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
    const payload = {
      full_name: formData.get('full_name'),
      email: formData.get('email'),
      brand_name: formData.get('brand_name') || undefined,
      ref: refCode || undefined,
    };

    try {
      const response = await fetch(
        'https://mnqypkgrbqhkzwptmaug.supabase.co/functions/v1/smooth-worker',
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.status === 201 || response.ok) {
        setStatus({ type: 'success', message: data.message || "Welcome to the Qrew!" });
      } else {
        const statusType: 'warning' | 'error' = response.status === 429 ? 'warning' : 'error';
        setStatus({
          type: statusType,
          message: data.message || 'Request failed.',
        });
      }
    } catch (err) {
  // Use the variable here
  console.error("Submission Error:", err); 
  
  setStatus({
    type: 'error',
    message: 'Network error. Please check connection.',
  });

    } finally {
      setIsJoining(false);
    }
  };

  // SUCCESS STATE (DARK MODE GLASS)
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
          <p className="text-sm font-bold italic text-slate-400 mb-8">
            Your referral and magic link have been sent.
          </p>
          <button onClick={() => setStatus(null)} className="text-xs font-black uppercase italic text-secondary-teal hover:underline">
            Try again
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
            <input
              name="full_name"
              required
              placeholder="Full Name"
              className="px-6 py-4 rounded-2xl font-bold bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-secondary-teal/50"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email Address"
              className="px-6 py-4 rounded-2xl font-bold bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-secondary-teal/50"
            />
            <input
              name="brand_name"
              placeholder="Brand Name (Optional)"
              className="px-6 py-4 rounded-2xl font-bold bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-secondary-teal/50"
            />

            {status && (
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-[10px] font-black uppercase italic ${status.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-secondary-teal/10 text-secondary-teal'}`}>
                <AlertCircle className="w-4 h-4" />
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isJoining}
              className="py-5 rounded-2xl font-black uppercase italic flex items-center justify-center gap-2 bg-secondary-teal text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isJoining ? <Loader2 className="animate-spin" /> : <><Sparkles /> Join Waitlist</>}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}