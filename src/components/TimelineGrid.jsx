import { Plus, ArrowDown, GitMerge } from "lucide-react";
import { ActivityCard } from "./ActivityCard";
import { ArrowItem } from "./ArrowItem";
import { cn } from "../lib/utils";

export function TimelineGrid({ phases, months, activities, arrows, onAddRequest, onAddArrowRequest, onDeleteActivity, onDeleteArrow, onMonthChange }) {
    return (
        <div className="overflow-x-auto pb-4">
            <div className="min-w-[1000px] grid relative" style={{ gridTemplateColumns: `180px repeat(${months.length}, 1fr)` }}>
                {/* Header Row */}
                <div className="sticky left-0 z-20 bg-slate-900/95 backdrop-blur border-b border-white/10 p-4 font-bold text-white/50 uppercase tracking-wider text-xs flex items-center">
                    Phases
                </div>
                {months.map((month, index) => (
                    <div key={index} className="border-b border-white/10 p-4 font-bold text-center text-white/70 uppercase tracking-wider text-xs flex items-center justify-between group">
                        <input
                            type="text"
                            value={month}
                            onChange={(e) => onMonthChange(index, e.target.value)}
                            className="bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 rounded px-1 w-full mr-2 text-center hover:bg-white/5 transition-colors"
                        />
                        <button
                            onClick={() => onAddArrowRequest(month)}
                            className="p-1 rounded hover:bg-white/10 text-white/30 hover:text-green-400 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                            title="Add Flow Arrow"
                        >
                            <GitMerge size={14} className="rotate-90" />
                        </button>
                    </div>
                ))}

                {/* Render Arrows (Behind everything) */}
                {arrows && arrows.map((arrow) => {
                    const monthArrows = arrows.filter(a => a.month === arrow.month);
                    const slotIndex = monthArrows.indexOf(arrow);
                    const totalSlots = monthArrows.length;

                    return (
                        <ArrowItem
                            key={arrow.id}
                            arrow={arrow}
                            phases={phases}
                            monthIndex={months.indexOf(arrow.month)}
                            slotIndex={slotIndex}
                            totalSlots={totalSlots}
                            onDelete={onDeleteArrow}
                        />
                    );
                })}

                {/* Phase Rows */}
                {phases.map((phase, phaseIndex) => {
                    const isLast = phaseIndex === phases.length - 1;
                    const phaseColor = getPhaseColor(phaseIndex);
                    const bgStyle = getPhaseBackground(phaseIndex);

                    return (
                        <>
                            {/* Phase Label */}
                            <div className={cn(
                                "sticky left-0 z-10 backdrop-blur-md border-r border-b border-white/10 p-4 flex flex-col justify-center relative",
                                "bg-slate-900/90"
                            )}>
                                <div className="flex items-center font-semibold text-white relative z-10">
                                    <div className={cn(
                                        "w-4 h-4 rounded-full mr-3 shadow-[0_0_15px_rgba(0,0,0,0.5)] ring-2 ring-white/20",
                                        phaseColor
                                    )} />
                                    {phase}
                                </div>

                                {/* Connecting Arrow */}
                                {!isLast && (
                                    <div className="absolute -bottom-3 left-6 z-0 flex flex-col items-center">
                                        <div className="h-4 w-0.5 bg-white/20"></div>
                                        <ArrowDown size={12} className="text-white/40 -mt-1" />
                                    </div>
                                )}
                            </div>

                            {/* Month Cells */}
                            {months.map((month) => {
                                const cellActivities = activities.filter(
                                    (a) => a.phase === phase && a.month === month
                                );

                                return (
                                    <div
                                        key={`${phase}-${month}`}
                                        className={cn(
                                            "relative border-b border-r border-white/5 p-2 min-h-[140px] transition-all duration-500 group z-20",
                                            bgStyle
                                        )}
                                    >
                                        <div className="flex flex-col gap-2">
                                            {cellActivities.map((activity) => (
                                                <ActivityCard
                                                    key={activity.id}
                                                    activity={activity}
                                                    phaseIndex={phaseIndex}
                                                    onDelete={onDeleteActivity}
                                                />
                                            ))}
                                        </div>

                                        {/* Add Button (Visible on Hover) */}
                                        <button
                                            onClick={() => onAddRequest(phase, month)}
                                            className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-white/10 text-white/60 hover:text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                );
                            })}
                        </>
                    );
                })}

            </div>
        </div>
    );
}

function getPhaseColor(index) {
    const colors = [
        "bg-cyan-500 shadow-cyan-500/50",
        "bg-blue-500 shadow-blue-500/50",
        "bg-indigo-500 shadow-indigo-500/50",
        "bg-purple-500 shadow-purple-500/50",
        "bg-fuchsia-500 shadow-fuchsia-500/50",
        "bg-rose-500 shadow-rose-500/50",
    ];
    return colors[index % colors.length];
}

function getPhaseBackground(index) {
    const bgs = [
        "bg-cyan-500/[0.03] hover:bg-cyan-500/[0.06]",
        "bg-blue-500/[0.03] hover:bg-blue-500/[0.06]",
        "bg-indigo-500/[0.03] hover:bg-indigo-500/[0.06]",
        "bg-purple-500/[0.03] hover:bg-purple-500/[0.06]",
        "bg-fuchsia-500/[0.03] hover:bg-fuchsia-500/[0.06]",
        "bg-rose-500/[0.03] hover:bg-rose-500/[0.06]",
    ];
    return bgs[index % bgs.length];
}
