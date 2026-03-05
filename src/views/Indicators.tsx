import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Target, 
  Layers, 
  TrendingUp, 
  CheckCircle2,
  Trash2,
  Edit2,
  ChevronRight
} from 'lucide-react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';

interface Indicator {
  id: string;
  name: string;
  target: number;
  unit: string;
  description: string;
  progress: number;
}

interface Unit {
  id: string;
  name: string;
  symbol: string;
}

export default function Indicators() {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [indicators, setIndicators] = useState<Indicator[]>([
    { id: '1', name: 'Agricultural Productivity', target: 100, unit: '%', description: 'Measure of crop yield per hectare.', progress: 65 },
    { id: '2', name: 'Clean Water Access', target: 85, unit: '%', description: 'Percentage of population with access to clean water.', progress: 72 },
    { id: '3', name: 'School Enrollment', target: 95, unit: '%', description: 'Primary school enrollment rate.', progress: 88 },
  ]);

  const [units, setUnits] = useState<Unit[]>([
    { id: '1', name: 'Percentage', symbol: '%' },
    { id: '2', name: 'Count', symbol: '#' },
    { id: '3', name: 'Currency', symbol: 'RWF' },
  ]);

  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);

  // State for multi-indicator creation
  const [newIndicatorGroup, setNewIndicatorGroup] = useState({
    pillar: '',
  });
  const [indicatorCount, setIndicatorCount] = useState<number | ''>('');
  const [newIndicatorRows, setNewIndicatorRows] = useState<any[]>([]);

  const generateRows = (count: number) => {
    const rows = Array.from({ length: count }).map((_, i) => ({
      id: `${Date.now()}-${i}`,
      sector: '',
      output: '',
      name: '',
      hasSubIndicator: 'false',
      target: '',
      unit: '%',
      baseline: '',
      description: ''
    }));
    setNewIndicatorRows(rows);
  };

  const addRow = () => {
    const lastRow = newIndicatorRows[newIndicatorRows.length - 1];
    setNewIndicatorRows([...newIndicatorRows, { 
      id: Date.now().toString(), 
      sector: lastRow?.sector || '',
      output: lastRow?.output || '',
      name: '', 
      hasSubIndicator: 'false',
      target: '', 
      unit: '%', 
      baseline: '', 
      description: '' 
    }]);
  };

  const removeRow = (id: string) => {
    if (newIndicatorRows.length > 1) {
      setNewIndicatorRows(newIndicatorRows.filter(row => row.id !== id));
    }
  };

  const updateRow = (id: string, field: string, value: string) => {
    setNewIndicatorRows(newIndicatorRows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleSaveAll = () => {
    // In a real app, this would be an API call
    console.log('Saving Group:', newIndicatorGroup);
    console.log('Saving Indicators:', newIndicatorRows);
    setView('list');
    // Reset form
    setNewIndicatorRows([]);
    setIndicatorCount('');
    setNewIndicatorGroup({ pillar: '' });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {view === 'list' ? 'Indicators & Units' : 'Create New Indicators'}
            </h1>
            <p className="text-slate-500 mt-2">
              {view === 'list' 
                ? 'Manage your performance metrics and measurement standards.' 
                : 'Define multiple indicators for a specific pillar and sector.'}
            </p>
          </div>
          <div className="flex gap-4">
            {view === 'list' ? (
              <>
                <button 
                  onClick={() => setIsUnitModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Create Unit
                </button>
                <button 
                  onClick={() => setView('create')}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black rounded-2xl font-bold text-sm hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  <Plus className="w-4 h-4" />
                  Create Indicator
                </button>
              </>
            ) : (
              <button 
                onClick={() => setView('list')}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {view === 'list' ? (
          <>
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search indicators or units..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Indicators List */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-xl font-bold">Active Indicators</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {indicators.map((indicator) => (
                    <GlassCard key={indicator.id} className="p-6 group hover:bg-white/[0.05] transition-all">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="font-bold text-lg">{indicator.name}</h3>
                          <p className="text-sm text-slate-500 max-w-md">{indicator.description}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-red-500/10 rounded-xl text-slate-400 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-6 space-y-3">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                          <span>Progress</span>
                          <span className="text-emerald-500">{indicator.progress}%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${indicator.progress}%` }}
                            className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                          />
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                            <TrendingUp className="w-3 h-3" />
                            Target: {indicator.target}{indicator.unit}
                          </div>
                          <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase">
                            {indicator.unit}
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>

              {/* Units List */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-xl font-bold">Measurement Units</h2>
                </div>

                <GlassCard className="p-6">
                  <div className="space-y-4">
                    {units.map((unit) => (
                      <div key={unit.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 font-bold">
                            {unit.symbol}
                          </div>
                          <div>
                            <p className="font-bold text-sm">{unit.name}</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Symbol: {unit.symbol}</p>
                          </div>
                        </div>
                        <button className="p-2 text-slate-500 hover:text-white transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => setIsUnitModalOpen(true)}
                    className="w-full mt-6 py-4 border border-dashed border-white/10 rounded-2xl text-slate-500 hover:text-emerald-500 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Unit
                  </button>
                </GlassCard>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-8">
            <GlassCard className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pillar</label>
                  <div className="relative">
                    <select 
                      value={newIndicatorGroup.pillar}
                      onChange={(e) => setNewIndicatorGroup({...newIndicatorGroup, pillar: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0a0a0a]">Select Pillar</option>
                      <option className="bg-[#0a0a0a]">Economic Transformation Pillar</option>
                      <option className="bg-[#0a0a0a]">Social Transformation Pillar</option>
                      <option className="bg-[#0a0a0a]">Transformational Governance Pillar</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <ChevronRight className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Number of Indicators</label>
                  <div className="flex gap-4">
                    <input 
                      type="number"
                      min="1"
                      max="20"
                      value={indicatorCount}
                      onChange={(e) => setIndicatorCount(e.target.value === '' ? '' : parseInt(e.target.value))}
                      placeholder="Enter count (e.g. 5)"
                      className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                    <button 
                      onClick={() => typeof indicatorCount === 'number' && generateRows(indicatorCount)}
                      disabled={!newIndicatorGroup.pillar || !indicatorCount}
                      className="px-8 py-4 bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-black rounded-2xl font-bold text-sm hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                    >
                      Generate Cards
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>

            {newIndicatorRows.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-lg font-bold">Indicators List ({newIndicatorRows.length})</h3>
                  <button 
                    onClick={addRow}
                    className="text-emerald-500 hover:text-emerald-400 text-sm font-bold flex items-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add One More
                  </button>
                </div>

                <div className="space-y-6">
                  {newIndicatorRows.map((row, index) => (
                    <GlassCard key={row.id} className="p-8 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20" />
                      <div className="absolute top-6 right-6 flex items-center gap-4">
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-tighter">#{index + 1}</span>
                        <button 
                          onClick={() => removeRow(row.id)}
                          className="p-2 text-slate-500 hover:text-red-500 transition-colors bg-white/5 rounded-xl border border-white/5"
                          title="Remove indicator"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-8">
                        {/* Row Header: Sector & Output */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-bottom border-white/5">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sector</label>
                            <div className="relative">
                              <select 
                                value={row.sector}
                                onChange={(e) => updateRow(row.id, 'sector', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none cursor-pointer"
                              >
                                <option value="" className="bg-[#0a0a0a]">Select Sector</option>
                                <option className="bg-[#0a0a0a]">Agriculture</option>
                                <option className="bg-[#0a0a0a]">Private Sector Development & Youth Employment</option>
                                <option className="bg-[#0a0a0a]">Energy</option>
                                <option className="bg-[#0a0a0a]">Transport</option>
                                <option className="bg-[#0a0a0a]">Climate, Environment and Natural Resources</option>
                                <option className="bg-[#0a0a0a]">Social Protection</option>
                                <option className="bg-[#0a0a0a]">Health</option>
                                <option className="bg-[#0a0a0a]">Education</option>
                                <option className="bg-[#0a0a0a]">ICT</option>
                                <option className="bg-[#0a0a0a]">Water and Sanitation</option>
                                <option className="bg-[#0a0a0a]">Gender and Family Promotion</option>
                                <option className="bg-[#0a0a0a]">Governance and Decentralization</option>
                                <option className="bg-[#0a0a0a]">Justice, Reconciliation, Law and Order</option>
                                <option className="bg-[#0a0a0a]">Sport and Culture</option>
                                <option className="bg-[#0a0a0a]">Public Finance Management</option>
                              </select>
                              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                <ChevronRight className="w-4 h-4 rotate-90" />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Output</label>
                            <input 
                              type="text" 
                              value={row.output}
                              onChange={(e) => updateRow(row.id, 'output', e.target.value)}
                              placeholder="Type the expected output/result..."
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                            />
                          </div>
                        </div>

                        {/* Row Body: Indicator Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                          <div className="space-y-2 lg:col-span-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Indicator Name</label>
                            <input 
                              type="text" 
                              value={row.name}
                              onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                              placeholder="e.g. Agricultural Productivity"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Has Sub-indicator</label>
                            <div className="relative">
                              <select 
                                value={row.hasSubIndicator}
                                onChange={(e) => updateRow(row.id, 'hasSubIndicator', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none cursor-pointer"
                              >
                                <option value="true" className="bg-[#0a0a0a]">True</option>
                                <option value="false" className="bg-[#0a0a0a]">False</option>
                              </select>
                              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                <ChevronRight className="w-4 h-4 rotate-90" />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Target Value</label>
                            <div className="flex gap-2">
                              <input 
                                type="number" 
                                value={row.target}
                                onChange={(e) => updateRow(row.id, 'target', e.target.value)}
                                placeholder="100"
                                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                              />
                              <div className="relative w-24">
                                <select 
                                  value={row.unit}
                                  onChange={(e) => updateRow(row.id, 'unit', e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none cursor-pointer"
                                >
                                  <option className="bg-[#0a0a0a]">%</option>
                                  <option className="bg-[#0a0a0a]">#</option>
                                  <option className="bg-[#0a0a0a]">RWF</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                  <ChevronRight className="w-3 h-3 rotate-90" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Baseline</label>
                            <input 
                              type="number" 
                              value={row.baseline}
                              onChange={(e) => updateRow(row.id, 'baseline', e.target.value)}
                              placeholder="0"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                            />
                          </div>
                          <div className="space-y-2 lg:col-span-5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Description</label>
                            <textarea 
                              rows={2}
                              value={row.description}
                              onChange={(e) => updateRow(row.id, 'description', e.target.value)}
                              placeholder="Describe what this indicator measures..."
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                            />
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>

                <div className="flex justify-end gap-4 pt-6">
                  <button 
                    onClick={() => setView('list')}
                    className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveAll}
                    className="px-12 py-4 bg-emerald-500 text-black rounded-2xl font-bold text-sm hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  >
                    Save All Indicators
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <UnitModal 
        isOpen={isUnitModalOpen} 
        onClose={() => setIsUnitModalOpen(false)} 
      />
    </Layout>
  );
}


function UnitModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Create Unit</h2>
              <p className="text-sm text-slate-500 mt-1">Add a new measurement standard.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <Plus className="w-5 h-5 text-slate-500 rotate-45" />
            </button>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Unit Name</label>
              <input 
                type="text" 
                placeholder="e.g. Kilograms"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Symbol</label>
              <input 
                type="text" 
                placeholder="e.g. kg"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-[0.98]"
            >
              Create Unit
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
