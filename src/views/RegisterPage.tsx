import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Target, User, Mail, Lock, Briefcase, ArrowRight, Eye, EyeOff, Loader2, ChevronDown } from 'lucide-react';

const positions = [
  'Mayor',
  'Vice-Mayor (Economic)',
  'Vice-Mayor (Social)',
  'Executive Secretary',
  'Corporates Services Manager',
  'Director of Finance',
  'Director of Public Health',
  'Director of Social Development',
  'Director of Good Governance',
  'Director of Planning, M&E',
  'Director of Agriculture',
  'Director of HR',
  'Director of Education',
  'Imihigo Coach',
  'ECD officer'
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Registration successful! Please wait for admin approval.');
      navigate('/login');
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  const inputClasses = "w-full h-11 bg-slate-50/50 border border-slate-100 rounded-xl px-10 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all placeholder:text-slate-400";

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-secondary/30 via-brand-bg to-brand-surface/20 flex items-center justify-center p-6">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[440px]"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center justify-center w-10 h-10 bg-brand-primary rounded-2xl shadow-xl shadow-brand-primary/20 mb-5"
          >
            <Target className="text-white w-5 h-5" />
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Create Account
          </motion.h1>
          <motion.p variants={itemVariants} className="text-slate-500 mt-1.5 text-sm font-medium">
            Join the Ngoma District tracking system
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div 
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-white p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder="John"
                    className={inputClasses}
                    value={formData.firstName}
                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder="Doe"
                    className={inputClasses}
                    value={formData.lastName}
                    onChange={e => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                <input
                  type="email"
                  required
                  placeholder="name@ngoma.gov.rw"
                  className={inputClasses}
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Position</label>
              <div className="relative group">
                <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                <select
                  required
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  value={formData.position}
                  onChange={e => setFormData({...formData, position: e.target.value})}
                >
                  <option value="">Select position</option>
                  {positions.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className={inputClasses}
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-brand-primary hover:opacity-95 text-white font-bold rounded-xl shadow-lg shadow-brand-primary/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 group disabled:opacity-70 mt-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Footer Link */}
        <motion.p variants={itemVariants} className="text-center text-sm text-slate-500 mt-8 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-primary font-bold hover:underline underline-offset-4">
            Sign In
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
