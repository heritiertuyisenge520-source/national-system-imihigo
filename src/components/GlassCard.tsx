import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function GlassCard({ children, className = "", onClick }: GlassCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] ${className}`}
    >
      {children}
    </div>
  );
}
