import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Share2, Trophy, Users, CheckCircle, Loader2 } from 'lucide-react'; 
import { supabase } from '../lib/supabase';

interface SupabaseSession {
  access_token: string;
  user: {
    id: string;
    user_metadata: {
      full_name?: string;
    };
  };
}

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

export default function Dashboard({ session }: { session: SupabaseSession }) {
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
        <p className="font-black uppercase italic tracking-widest text-xs text-center px-4">Fetching The Intel...</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-3 sm:p-4 pt-20 sm:pt-24 pb-20">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Header: Fixed for 320px collisions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-start gap-4"
        >
          <div className="min-w-0">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase italic tracking-tighter truncate">
              Wassup, <span className="text-secondary-teal">{data.profile.name}</span>
            </h1>
            <p className="text-slate-500 font-bold italic uppercase text-[8px] sm:text-[10px] tracking-[0.2em] mt-1 sm:mt-2">
              Genesis Member • {data.profile.brand || 'Personal'}
            </p>
          </div>
          <button 
            onClick={() => supabase.auth.signOut()}
            className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-red-400 transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Stats Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] relative overflow-hidden"
          >
            <Trophy className="absolute -right-4 -top-4 w-20 h-20 sm:w-24 sm:h-24 text-secondary-teal/5 rotate-12" />
            <h4 className="text-slate-500 font-black uppercase italic text-[10px] sm:text-xs tracking-widest">Global Influence</h4>
            <p className="text-5xl sm:text-6xl font-black italic mt-3 sm:mt-4">{data.profile.referrals}</p>
            <p className="text-secondary-teal font-bold text-[10px] sm:text-xs mt-2 italic">Total Referrals</p>
          </motion.div>

          {/* Referral Link Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-secondary-teal/5 border border-secondary-teal/20 p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] flex flex-col justify-between"
          >
            <div className="min-w-0">
              <h4 className="text-white font-black uppercase italic text-[10px] sm:text-xs tracking-widest mb-3 sm:mb-4">Your Referral Link</h4>
              <div className="bg-black/40 p-3 rounded-xl border border-white/5 font-mono text-[11px] sm:text-sm text-secondary-teal truncate mb-4">
                {data.profile.shareLink}
              </div>
            </div>
            <button 
              onClick={copyToClipboard}
              className={`w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-black uppercase italic flex items-center justify-center gap-2 text-xs sm:text-base transition-all ${
                copied ? 'bg-green-600' : 'bg-secondary-teal hover:opacity-90'
              }`}
            >
              {copied ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />}
              {copied ? 'Copied' : 'Share Link'}
            </button>
          </motion.div>
        </div>

        {/* Table/List Section: Modified for mobile responsiveness */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.02] border border-white/10 rounded-[30px] sm:rounded-[40px] overflow-hidden"
        >
          <div className="p-6 sm:p-8 border-b border-white/5 text-lg sm:text-xl font-black uppercase italic flex items-center gap-3">
             <Users className="text-secondary-teal w-5 h-5 sm:w-6 sm:h-6" /> Recent Referrals
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.01]">
                  <th className="px-5 sm:px-8 py-4 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500">Name</th>
                  <th className="hidden sm:table-cell px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Brand</th>
                  <th className="px-5 sm:px-8 py-4 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500 text-right sm:text-left">Joined</th>
                </tr>
              </thead>
              <tbody>
                {data.recentReferrals.length > 0 ? (
                  data.recentReferrals.map((ref, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                      <td className="px-5 sm:px-8 py-4">
                        <div className="font-bold text-xs sm:text-sm">{ref.name}</div>
                        <div className="sm:hidden text-slate-500 italic text-[9px] mt-0.5">{ref.brand || '---'}</div>
                      </td>
                      <td className="hidden sm:table-cell px-8 py-4 text-slate-400 italic text-sm">{ref.brand || '---'}</td>
                      <td className="px-5 sm:px-8 py-4 text-slate-500 text-[10px] sm:text-xs text-right sm:text-left">
                        {new Date(ref.joined).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-8 py-12 text-center text-slate-600 italic text-xs sm:text-base">
                      No referrals yet. Share your link to start growing!
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