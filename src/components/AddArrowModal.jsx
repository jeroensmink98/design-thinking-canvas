import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowDown } from "lucide-react";
import { useState } from "react";

export function AddArrowModal({ isOpen, onClose, onAdd, month, phases }) {
    const [startPhase, setStartPhase] = useState(phases[0]);
    const [endPhase, setEndPhase] = useState(phases[1]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (startPhase && endPhase && startPhase !== endPhase) {
            onAdd(startPhase, endPhase);
            onClose();
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full max-w-sm bg-slate-800 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                >
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                <ArrowDown size={20} className="text-green-400" />
                                Add Flow Arrow
                            </h3>
                            <button onClick={onClose} className="text-white/50 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="mb-6 text-sm text-white/60">
                            Adding flow arrow in <span className="text-purple-400 font-medium">{month}</span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-white/40 uppercase mb-1">From Phase</label>
                                <select
                                    value={startPhase}
                                    onChange={(e) => setStartPhase(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-black/20 border border-white/10 text-white focus:outline-none focus:border-green-500/50 transition-all"
                                >
                                    {phases.map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-center">
                                <ArrowDown className="text-white/20" />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-white/40 uppercase mb-1">To Phase</label>
                                <select
                                    value={endPhase}
                                    onChange={(e) => setEndPhase(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-black/20 border border-white/10 text-white focus:outline-none focus:border-green-500/50 transition-all"
                                >
                                    {phases.map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={startPhase === endPhase}
                                    className="px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-green-500/20"
                                >
                                    Add Arrow
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
