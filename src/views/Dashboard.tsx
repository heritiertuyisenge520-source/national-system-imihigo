import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Target, 
  MapPin,
  TrendingUp,
  CheckCircle2,
  MoreVertical,
  ArrowUpRight
} from 'lucide-react';
import { 
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';

const data = [
  { name: 'Jul', progress: 40 },
  { name: 'Aug', progress: 55 },
  { name: 'Sep', progress: 45 },
  { name: 'Oct', progress: 70 },
  { name: 'Nov', progress: 85 },
  { name: 'Dec', progress: 92 },
];

const districtStats = [
  { label: "Sectors", value: "13" },
  { label: "Cells", value: "62" },
  { label: "Villages", value: "483" },
  { label: "Area", value: "1,157.3 KM²" },
  { label: "Population", value: "369,180" },
  { label: "Female", value: "52.2%" },
  { label: "Male", value: "47.8%" },
  { label: "Youth", value: "65%" },
  { label: "Density", value: "565hab/Km²" },
  { label: "HHs", value: "88,081" },
  { label: "Rural", value: "94.4%" },
  { label: "Urban", value: "5.6%" },
  { label: "Electricity", value: "71.06%" },
  { label: "Water", value: "63.82%" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Main Content */}
      <div className="pb-20 px-10 relative z-10 max-w-7xl mx-auto">
        <div className="space-y-10">
          {/* District Profile Ticker Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10" />
            
            <GlassCard className="py-3 px-4 rounded-full overflow-hidden border-emerald-500/20">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 shrink-0 border-r border-white/10 pr-6">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[10px] font-black text-white uppercase tracking-tighter">District Profile</span>
                </div>
                
                <div className="flex overflow-hidden whitespace-nowrap">
                  <motion.div 
                    className="flex gap-10 items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 40, 
                      ease: "linear" 
                    }}
                  >
                    {[...districtStats, ...districtStats].map((stat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">{stat.label}:</span>
                        <span className="text-[11px] font-black text-emerald-500">{stat.value}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Welcome & Orbital Graphic Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-5xl font-black tracking-tighter leading-tight">
                  Powering the Future <br />
                  <span className="text-emerald-500">of Performance</span>
                </h2>
                <p className="text-slate-400 mt-6 text-lg max-w-lg leading-relaxed font-medium">
                  Ngoma District's next-generation tracking system for seamless, secure, and reliable performance monitoring.
                </p>
              </motion.div>
              
              <div className="flex items-center gap-4 pt-4">
                <button className="bg-emerald-500 text-black font-black px-8 py-3.5 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 transition-all active:scale-95">
                  Update Targets
                </button>
                <button className="bg-white/5 border border-white/10 px-8 py-3.5 rounded-2xl font-bold hover:bg-white/10 transition-all">
                  View Reports
                </button>
              </div>
            </div>

            {/* Orbital Graphic Mockup */}
            <div className="relative aspect-square max-w-[400px] mx-auto">
              <div className="absolute inset-0 border border-emerald-500/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-8 border border-emerald-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute inset-16 border border-emerald-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                  <Target className="text-black w-10 h-10" />
                </div>
              </div>
              {/* Floating Icons */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-black border border-white/20 rounded-full flex items-center justify-center shadow-xl">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="absolute bottom-10 right-0 w-12 h-12 bg-black border border-white/20 rounded-full flex items-center justify-center shadow-xl">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Fear and Greed Index</p>
                  <p className="text-2xl font-black">Score 68%</p>
                </div>
                <MoreVertical className="w-4 h-4 text-slate-600" />
              </div>
              <div className="mt-6 relative h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-emerald-500 w-[68%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              </div>
              <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-600 uppercase">
                <span>Low</span>
                <span>High</span>
              </div>
            </GlassCard>

            <GlassCard className="p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Shivani Chauhan</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Chainex Wallet</p>
                  </div>
                </div>
                <MoreVertical className="w-4 h-4 text-slate-600" />
              </div>
              <div className="mt-6">
                <p className="text-2xl font-black">$26000.16</p>
                <div className="mt-2 h-1 bg-white/5 rounded-full relative">
                  <div className="absolute top-1/2 left-[70%] -translate-y-1/2 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                </div>
              </div>
            </GlassCard>

            <GlassCard 
              className="p-6 flex flex-col justify-between cursor-pointer hover:bg-white/[0.05] transition-colors group"
              onClick={() => navigate('/indicators')}
            >
              <div className="flex justify-between items-start">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Indicators</p>
                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="mt-4 h-[60px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.slice(-4)}>
                    <Area type="monotone" dataKey="progress" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-end justify-between mt-2">
                <p className="text-3xl font-black">126</p>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">+12%</span>
              </div>
            </GlassCard>
          </div>

          {/* Large Chart Section */}
          <GlassCard className="p-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-bold">Performance Analytics</h3>
                <p className="text-sm text-slate-500 font-medium">Detailed progress tracking across all sectors</p>
              </div>
              <div className="flex gap-2">
                {['1D', '1W', '1M', '1Y', 'ALL'].map((t) => (
                  <button key={t} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${t === '1M' ? 'bg-emerald-500 text-black' : 'hover:bg-white/5 text-slate-500'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fontWeight: 700, fill: '#475569'}}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fontWeight: 700, fill: '#475569'}}
                  />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                    itemStyle={{color: '#10b981', fontWeight: 'bold'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="progress" 
                    stroke="#10b981" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorProgress)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      </div>
    </Layout>
  );
}

