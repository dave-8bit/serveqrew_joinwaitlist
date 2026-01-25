import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Trophy, Users, CheckCircle, Loader2, Zap } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';

interface Referral {
  name: string;
  brand: string | null;
  email: string;
  joined: string;
}

interface DashboardData {
  profile: {
    name: string;
    brand: string;
    code: string;
    referrals: number;
    joined: string;
    shareLink: string;
  };
  recentReferrals: Referral[];
}

export default function Dashboard({ session }: { session: Session }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          'https://mnqypkgrbqhkzwptmaug.supabase.co/functions/v1/referral-dashboard',
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${session.access_token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) throw new Error('Failed to fetch stats');

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Dashboard Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [session.access_token]);

  const copyToClipboard = () => {
    if (data?.profile.shareLink) {
      navigator.clipboard.writeText(data.profile.shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-secondary-teal mb-4" />
        <p className="font-black uppercase italic tracking-widest text-[10px] text-center px-4 animate-pulse">
          Decrypting Intel...
        </p>
      </div>
    );
  }
  if (!data) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-3 sm:p-4 pt-24 sm:pt-32 pb-20">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-end gap-4 border-b border-white/5 pb-6"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-3 h-3 text-secondary-teal" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-secondary-teal">
                Active Session
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase italic tracking-tighter truncate">
              Wassup,{' '}
              <span className="text-secondary-teal">
                {data.profile.name}
              </span>
            </h1>

            <p className="text-slate-500 font-bold italic uppercase text-[8px] sm:text-[10px] tracking-[0.2em] mt-1">
              Genesis Member • {data.profile.brand || 'Personal'}
            </p>
          </div>
        </motion.div>

        {/* STATS + LINK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* STATS */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] relative overflow-hidden group hover:border-secondary-teal/30 transition-all"
          >
            <Trophy className="absolute -right-4 -top-4 w-20 h-20 sm:w-24 sm:h-24 text-secondary-teal/5 rotate-12 group-hover:scale-110 transition-transform" />
            <h4 className="text-slate-500 font-black uppercase italic text-[10px] sm:text-xs tracking-widest">
              Global Influence
            </h4>
            <p className="text-5xl sm:text-6xl font-black italic mt-3 text-white group-hover:text-secondary-teal transition-colors">
              {data.profile.referrals}
            </p>
            <p className="text-secondary-teal font-bold text-[10px] sm:text-xs mt-2 italic">
              Total Referrals Secured
            </p>
          </motion.div>

          {/* SHARE LINK */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-secondary-teal/5 border border-secondary-teal/20 p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] flex flex-col justify-between"
          >
            <div>
              <h4 className="font-black uppercase italic text-[10px] sm:text-xs tracking-widest mb-4">
                Your Deployment Link
              </h4>

              <div className="bg-black/40 p-3 rounded-xl border border-white/5 font-mono text-[11px] sm:text-sm text-secondary-teal truncate select-all">
                {data.profile.shareLink}
              </div>
            </div>

            <button
              onClick={copyToClipboard}
              className={`mt-4 w-full py-3.5 rounded-xl font-black uppercase italic flex items-center justify-center gap-2 text-xs sm:text-base transition-all ${
                copied
                  ? 'bg-green-600'
                  : 'bg-secondary-teal hover:opacity-90 shadow-[0_0_20px_rgba(0,128,128,0.3)]'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle className="w-5 h-5" /> Link Secured
                </>
              ) : (
                <>
                  <Share2 className="w-5 h-5" /> Share Link
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.02] border border-white/10 rounded-[30px] sm:rounded-[40px] overflow-hidden"
        >
          <div className="p-6 sm:p-8 border-b border-white/5 font-black uppercase italic flex items-center gap-3">
            <Users className="text-secondary-teal w-5 h-5" />
            Recent Operatives
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-500">
                    Name
                  </th>
                  <th className="hidden sm:table-cell px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-500">
                    Brand
                  </th>
                  <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-slate-500 text-right">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.recentReferrals.length ? (
                  data.recentReferrals.map((ref, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="px-6 py-4 font-bold text-sm">
                        {ref.name}
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 italic text-slate-400">
                        {ref.brand || '—'}
                      </td>
                      <td className="px-6 py-4 text-right text-slate-500 text-xs">
                        {new Date(ref.joined).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-12 text-center text-slate-600 italic">
                      No operatives found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
