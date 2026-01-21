import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, AlertCircle, Loader2, Star, RotateCw, Users, ArrowUpRight } from 'lucide-react';

interface LeaderboardEntry {
  full_name: string;
  brand_name: string | null;
  referral_code: string;
  referral_count: number;
  rank: number;
}

export default function Leaderboard() {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ucXlwa2dyYnFoa3p3cHRtYXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxMzg0MzIsImV4cCI6MjA4MTcxNDQzMn0.F4ddMOGvsUHoh935pmgacBDhl2Z-I4qBRQLhxSLZCNA";

  const fetchLeaderboard = useCallback(async (isManual = false) => {
    if (isManual) setIsRefetching(true);
    else setLoading(true);
    
    setError(null);
    try {
      const response = await fetch(
        'https://mnqypkgrbqhkzwptmaug.supabase.co/functions/v1/waitlist-leaderboard',
        {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) throw new Error("Failed to sync rankings");

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
      setIsRefetching(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return (
    <section id="leaderboard" className="relative z-10 max-w-4xl mx-auto px-4 py-12 sm:py-20 scroll-mt-20">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter text-white leading-none">
          Elite <span className="text-secondary-teal">Rankings</span>
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-secondary-teal bg-secondary-teal/10 px-4 py-1.5 rounded-full border border-secondary-teal/20">
            <Star className="w-3 h-3 fill-secondary-teal" /> Genesis Rewards Active
          </div>
          <button 
            onClick={() => fetchLeaderboard(true)}
            disabled={isRefetching}
            className="p-1.5 rounded-full hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            <RotateCw className={`w-3.5 h-3.5 text-slate-500 ${isRefetching ? 'animate-spin text-secondary-teal' : ''}`} />
          </button>
        </div>
      </div>

      <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[30px] sm:rounded-[40px] border border-white/10 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.4)]">
        {loading ? (
          <div className="h-[400px] flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-secondary-teal animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Syncing Live Network...</p>
          </div>
        ) : error ? (
          <div className="h-[400px] flex flex-col items-center justify-center gap-4 p-6 text-center">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <p className="text-sm font-black uppercase italic text-white">{error}</p>
            <button onClick={() => fetchLeaderboard()} className="text-[10px] font-bold uppercase underline text-secondary-teal">Try Reconnect</button>
          </div>
        ) : (
          <>
            {/* DESKTOP VIEW: Left exactly as you provided */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Rank</th>
                    <th className="px-2 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Authority Member</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Influence Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence>
                    {data.slice(0, 10).map((entry, i) => (
                      <motion.tr 
                        key={entry.referral_code}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group hover:bg-white/[0.04] transition-all cursor-default"
                      >
                        <td className="px-8 py-6">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black italic shadow-lg
                            ${entry.rank === 1 ? 'bg-yellow-400 text-slate-950 ring-4 ring-yellow-400/20' : 
                              entry.rank === 2 ? 'bg-slate-300 text-slate-800' : 
                              entry.rank === 3 ? 'bg-orange-400 text-slate-900' : 'bg-white/5 text-slate-500'}`}>
                            {entry.rank <= 3 ? <Trophy className="w-5 h-5" /> : `#${entry.rank}`}
                          </div>
                        </td>
                        <td className="px-2 py-6">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="font-black uppercase italic text-white text-xl tracking-tighter">{entry.full_name}</span>
                              {entry.rank <= 3 && (
                                <span className="bg-yellow-400 text-slate-950 text-[8px] font-[1000] px-2 py-0.5 rounded-md uppercase italic">Genesis</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                               <span className="text-[10px] font-bold text-secondary-teal uppercase italic tracking-wider">
                                {entry.rank <= 3 ? "👑 Tier 1 Access" : "⚡ Priority Member"}
                              </span>
                              {entry.brand_name && (
                                <><span className="text-white/20 text-[10px]">•</span><span className="text-[10px] font-bold text-slate-500 uppercase italic tracking-widest">{entry.brand_name}</span></>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <div className="text-right">
                              <div className="text-3xl font-black italic text-white leading-none tracking-tighter">{entry.referral_count}</div>
                              <div className="text-[8px] font-black text-slate-500 uppercase mt-1">Referrals</div>
                            </div>
                            <Users className="w-5 h-5 text-secondary-teal/30" />
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* MOBILE VIEW (320px Ready) */}
            <div className="md:hidden flex flex-col divide-y divide-white/5">
              <AnimatePresence>
                {data.slice(0, 10).map((entry, i) => (
                  <motion.div 
                    key={entry.referral_code}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center font-black italic text-xs
                        ${entry.rank === 1 ? 'bg-yellow-400 text-slate-950' : 
                          entry.rank === 2 ? 'bg-slate-300 text-slate-800' : 
                          entry.rank === 3 ? 'bg-orange-400 text-slate-900' : 'bg-white/5 text-slate-500'}`}>
                        {entry.rank <= 3 ? <Trophy className="w-4 h-4" /> : `#${entry.rank}`}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-black uppercase italic text-white text-sm tracking-tight truncate">
                          {entry.full_name}
                        </span>
                        <span className="text-[8px] font-bold text-secondary-teal uppercase tracking-tighter truncate">
                          {entry.brand_name || (entry.rank <= 3 ? "Genesis Tier" : "Priority Member")}
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-2 shrink-0">
                      <div className="text-xl font-black italic text-white leading-none tracking-tighter">{entry.referral_count}</div>
                      <div className="text-[7px] font-black text-slate-500 uppercase">Referrals</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* CTA Section */}
            <div className="p-6 sm:p-8 bg-white/[0.02] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <p className="text-white font-black uppercase italic text-base sm:text-lg tracking-tight">Not on the list yet?</p>
                <p className="text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mt-1">Join the network to secure your Genesis rank.</p>
              </div>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-secondary-teal text-slate-950 px-6 py-3 rounded-xl sm:rounded-2xl font-black uppercase italic text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-secondary-teal/20"
              >
                Join Now <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}