"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Filter, 
  TrendingUp, 
  Printer, 
  Check, 
  X,
  Wallet,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { useMarriageState } from '../../context/state-context';
import { formatCurrency } from '../../lib/utils';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

const categories = [
  "Venue", "Catering", "Decoration", "Outfit", 
  "Makeup", "Documentation", "Souvenir", 
  "Transportation", "Entertainment", "Other"
];

export const BudgetPage: React.FC = () => {
  const { 
    budgetItems, 
    addBudgetItem, 
    updateBudgetItem, 
    deleteBudgetItem 
  } = useMarriageState();

  // Search & Filter state
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'estimated' | 'actual' | 'dueDate'>('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Modal / Add Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Field States
  const [formName, setFormName] = useState('');
  const [formCat, setFormCat] = useState('Venue');
  const [formEst, setFormEst] = useState('');
  const [formAct, setFormAct] = useState('');
  const [formStatus, setFormStatus] = useState<'Paid' | 'Deposit Paid' | 'Unpaid'>('Unpaid');
  const [formDate, setFormDate] = useState('');
  const [formNotes, setFormNotes] = useState('');

  // Handle Form Submission (Add or Edit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const parsedEst = Number(formEst) || 0;
    const parsedAct = Number(formAct) || 0;

    const data = {
      itemName: formName,
      category: formCat,
      estimatedBudget: parsedEst,
      actualBudget: parsedAct,
      status: formStatus,
      dueDate: formDate || new Date().toISOString().split('T')[0],
      notes: formNotes
    };

    if (editingId) {
      updateBudgetItem(editingId, data);
    } else {
      addBudgetItem(data);
    }

    resetForm();
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormName(item.itemName);
    setFormCat(item.category);
    setFormEst(String(item.estimatedBudget));
    setFormAct(String(item.actualBudget));
    setFormStatus(item.status);
    setFormDate(item.dueDate);
    setFormNotes(item.notes);
    setShowAddForm(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormName('');
    setFormCat('Venue');
    setFormEst('');
    setFormAct('');
    setFormStatus('Unpaid');
    setFormDate('');
    setFormNotes('');
    setShowAddForm(false);
  };

  // Pie Chart Data: Group by category
  const pieData = categories.map(cat => {
    const value = budgetItems
      .filter(item => item.category === cat)
      .reduce((acc, curr) => acc + curr.actualBudget, 0);
    return { name: cat, value };
  }).filter(item => item.value > 0);

  const COLORS = [
    '#F7D6D0', '#C79B8B', '#DCCFED', '#F6C7B6', 
    '#E5D1C9', '#8bcdc7', '#cd8b93', '#b1cd8b', 
    '#cdb18b', '#4B3B39'
  ];

  // Filtering & Sorting table data
  const filteredItems = budgetItems.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(search.toLowerCase()) || 
                          item.notes.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCat === 'All' || item.category === filterCat;
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    return matchesSearch && matchesCat && matchesStatus;
  }).sort((a, b) => {
    let fieldA: any = a.dueDate;
    let fieldB: any = b.dueDate;

    if (sortBy === 'name') {
      fieldA = a.itemName.toLowerCase();
      fieldB = b.itemName.toLowerCase();
    } else if (sortBy === 'estimated') {
      fieldA = a.estimatedBudget;
      fieldB = b.estimatedBudget;
    } else if (sortBy === 'actual') {
      fieldA = a.actualBudget;
      fieldB = b.actualBudget;
    }

    if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const triggerSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const totalSpent = budgetItems.reduce((acc, curr) => acc + curr.actualBudget, 0);
  const totalEstimated = budgetItems.reduce((acc, curr) => acc + curr.estimatedBudget, 0);
  const totalPaid = budgetItems.filter(i => i.status === 'Paid').reduce((acc, curr) => acc + curr.actualBudget, 0);

  return (
    <div className="space-y-6 select-none animate-fade-in print:space-y-0">
      
      {/* HEADER SECTION - Hidden on print */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass rounded-3xl p-6 relative overflow-hidden bg-gradient-to-r from-blush-100/40 via-cream-50/20 to-lavender-100/40 border border-blush-200/30 no-print">
        <div>
          <span className="text-[10px] uppercase font-bold text-rosegold-400 tracking-widest flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-rosegold-400" />
            Financial Audit
          </span>
          <h2 className="text-xl font-black text-elegant mt-2">Wedding Budget Tracker</h2>
          <p className="text-xs text-elegant/75 mt-1">
            Track deposit schedules, sort quotes, and evaluate costs dynamically.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => window.print()}
            className="px-4 py-3 glass text-elegant hover:bg-blush-100/25 rounded-2xl text-xs font-bold border border-blush-200/30 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4 text-rosegold-400" />
            <span>Print Sheet</span>
          </button>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="px-5 py-3 bg-rosegold-400 hover:bg-rosegold-500 text-white rounded-2xl text-xs font-bold shadow-md shadow-rosegold-200/30 flex items-center justify-center gap-1.5 transition-all glowing-btn"
          >
            <Plus className="w-4 h-4" />
            <span>Add Budget Item</span>
          </button>
        </div>
      </div>

      {/* TOP ANALYTICS: Spent vs Estimated + Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Totals details cards */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="glass rounded-3xl p-6 border border-blush-200/30 bg-white/40 flex-1 flex flex-col justify-center">
            <span className="text-[9px] uppercase font-extrabold tracking-widest text-rosegold-400">Total Actual Outlays</span>
            <h3 className="text-3xl font-black text-elegant mt-2">{formatCurrency(totalSpent)}</h3>
            <div className="w-full bg-blush-100/50 h-2 rounded-full mt-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-rosegold-400 to-peach-500 h-full rounded-full" 
                style={{ width: `${Math.min((totalSpent/totalEstimated)*100, 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-elegant/60 mt-3 font-semibold">Estimated Allocation: {formatCurrency(totalEstimated)}</p>
          </div>

          <div className="glass rounded-3xl p-6 border border-blush-200/30 bg-white/40 flex-1 flex flex-col justify-center">
            <span className="text-[9px] uppercase font-extrabold tracking-widest text-rosegold-400">Total Capital Paid</span>
            <h3 className="text-3xl font-black text-elegant mt-2">{formatCurrency(totalPaid)}</h3>
            <p className="text-[10px] text-emerald-600 font-bold mt-2">✓ Paid in Full: {budgetItems.filter(i => i.status === 'Paid').length} items</p>
            <p className="text-[10px] text-elegant/60 mt-0.5 font-semibold">Remaining unpaid: {formatCurrency(totalSpent - totalPaid)}</p>
          </div>
        </div>

        {/* Right Column: Recharts Pie Chart (2/3 width) */}
        <div className="lg:col-span-2 glass rounded-3xl p-6 border border-blush-200/30 bg-white/40 flex flex-col h-72">
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-rosegold-400 mb-2">Expenses Partitioned by Category</span>
          
          <div className="w-full h-full flex items-center justify-center">
            {pieData.length === 0 ? (
              <p className="text-xs text-elegant/50">No expenses recorded yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), 'Outlay']}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #F7D6D0', fontSize: '11px' }}
                  />
                  <Legend 
                    layout="vertical" 
                    align="right" 
                    verticalAlign="middle"
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '10px', color: '#4B3B39' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTERS TOOLBAR - Hidden on print */}
      <div className="glass rounded-2xl p-4 border border-blush-200/20 bg-white/30 flex flex-col md:flex-row items-center gap-4 no-print">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search budget items..."
            className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/25 rounded-xl py-2.5 pl-10 pr-4 text-xs text-elegant focus:outline-none focus:border-rosegold-400/50"
          />
          <Search className="w-4 h-4 text-elegant/40 absolute left-3.5 top-3" />
        </div>

        {/* Filter Category */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-elegant/50 shrink-0" />
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="bg-white/70 dark:bg-elegant-800 border border-blush-200/25 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none w-full md:w-36"
          >
            <option value="All">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        {/* Filter Status */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/70 dark:bg-elegant-800 border border-blush-200/25 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none w-full md:w-36"
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Deposit Paid">Deposit Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>
      </div>

      {/* BUDGET TABLE */}
      <div className="glass rounded-3xl overflow-hidden border border-blush-200/30 bg-white/40">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-blush-50/50 border-b border-blush-200/20 text-elegant/70">
                <th 
                  onClick={() => triggerSort('name')} 
                  className="p-4 font-bold cursor-pointer hover:bg-blush-100/30 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Item Details</span>
                    <ArrowUpDown className="w-3 h-3 text-rosegold-400" />
                  </div>
                </th>
                <th className="p-4 font-bold">Category</th>
                <th 
                  onClick={() => triggerSort('estimated')} 
                  className="p-4 font-bold cursor-pointer hover:bg-blush-100/30 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Estimated</span>
                    <ArrowUpDown className="w-3 h-3 text-rosegold-400" />
                  </div>
                </th>
                <th 
                  onClick={() => triggerSort('actual')} 
                  className="p-4 font-bold cursor-pointer hover:bg-blush-100/30 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Actual Quote</span>
                    <ArrowUpDown className="w-3 h-3 text-rosegold-400" />
                  </div>
                </th>
                <th className="p-4 font-bold">Status</th>
                <th 
                  onClick={() => triggerSort('dueDate')} 
                  className="p-4 font-bold cursor-pointer hover:bg-blush-100/30 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Due Date</span>
                    <ArrowUpDown className="w-3 h-3 text-rosegold-400" />
                  </div>
                </th>
                <th className="p-4 font-bold no-print">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-200/10 text-elegant">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-elegant/60">
                    No budget items match your filters. Expand your search.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-blush-50/20 transition-colors">
                    <td className="p-4">
                      <p className="font-bold">{item.itemName}</p>
                      {item.notes && <p className="text-[10px] text-elegant/60 mt-0.5">{item.notes}</p>}
                    </td>
                    <td className="p-4 font-medium">{item.category}</td>
                    <td className="p-4 font-semibold text-elegant/60">{formatCurrency(item.estimatedBudget)}</td>
                    <td className="p-4 font-bold">{formatCurrency(item.actualBudget)}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${
                        item.status === 'Paid' 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300' 
                          : item.status === 'Deposit Paid' 
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-300' 
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950/30 dark:text-rose-300'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 font-semibold">
                      {new Date(item.dueDate).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                    </td>
                    <td className="p-4 no-print">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1.5 rounded-lg hover:bg-blush-100/30 text-elegant/60 hover:text-elegant"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteBudgetItem(item.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD POPUP FORM MODAL */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 bg-black/35 backdrop-blur-sm z-50 flex items-center justify-center p-4 no-print select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md glass rounded-3xl p-6 shadow-2xl border border-blush-200 relative bg-white"
            >
              <button 
                onClick={resetForm} 
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-blush-100/40 text-elegant/60 hover:text-elegant"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-base font-black text-elegant mb-5">
                {editingId ? 'Edit Budget Quote' : 'New Financial Allocated Item'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider block mb-1">Item Title</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    placeholder="Venue deposit, floral arch setup, photography..."
                    className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 rounded-xl px-3 py-2.5 text-xs text-elegant focus:outline-none focus:border-rosegold-400/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider block mb-1">Category</label>
                    <select
                      value={formCat}
                      onChange={(e) => setFormCat(e.target.value)}
                      className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 rounded-xl px-3 py-2.5 text-xs text-elegant focus:outline-none"
                    >
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider block mb-1">Due Date</label>
                    <input
                      type="date"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider block mb-1">Estimated Cost (IDR)</label>
                    <input
                      type="number"
                      value={formEst}
                      onChange={(e) => setFormEst(e.target.value)}
                      placeholder="e.g. 15000000"
                      className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 rounded-xl px-3 py-2.5 text-xs text-elegant focus:outline-none focus:border-rosegold-400/50"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider block mb-1">Actual Quote (IDR)</label>
                    <input
                      type="number"
                      value={formAct}
                      onChange={(e) => setFormAct(e.target.value)}
                      placeholder="e.g. 14500000"
                      className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 rounded-xl px-3 py-2.5 text-xs text-elegant focus:outline-none focus:border-rosegold-400/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider block mb-1">Payment Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 rounded-xl px-3 py-2.5 text-xs text-elegant focus:outline-none"
                  >
                    <option value="Unpaid">Unpaid</option>
                    <option value="Deposit Paid">Deposit Paid</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider block mb-1">Item Notes</label>
                  <textarea
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    placeholder="Details about bank account transfers, contact names..."
                    className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none min-h-[60px] resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 py-3 glass text-elegant rounded-xl text-xs font-bold border border-blush-200/20"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-rosegold-400 hover:bg-rosegold-500 text-white rounded-xl text-xs font-bold transition-colors shadow shadow-rosegold-200/20 flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Outlay</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default BudgetPage;
