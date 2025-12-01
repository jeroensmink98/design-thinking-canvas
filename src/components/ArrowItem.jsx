import { motion } from "framer-motion";
import { X } from "lucide-react";

export function ArrowItem({ arrow, phases, monthIndex, slotIndex, totalSlots, onDelete }) {
    const startPhaseIndex = phases.indexOf(arrow.startPhase);
    const endPhaseIndex = phases.indexOf(arrow.endPhase);

    // Calculate grid row span
    // Header is row 1. Phase 0 is row 2.
    // Start Row = startPhaseIndex + 2
    // End Row = endPhaseIndex + 2
    // We want to span from min to max + 1 (to cover the cell)
    const minIndex = Math.min(startPhaseIndex, endPhaseIndex);
    const maxIndex = Math.max(startPhaseIndex, endPhaseIndex);

    const gridRowStart = minIndex + 2;
    const gridRowEnd = maxIndex + 3; // +3 because grid lines are 1-indexed and we want to include the last row

    const span = maxIndex - minIndex + 1;
    const isDown = startPhaseIndex < endPhaseIndex;

    // Calculate Y positions as percentages of the total height
    // Each row is roughly 1 unit of height. Total height = span units.
    // Center of top row = 0.5 units.
    // Center of bottom row = span - 0.5 units.
    // Percentage = units / span * 100

    const topY = (0.5 / span) * 100;
    const bottomY = ((span - 0.5) / span) * 100;

    const y1 = isDown ? `${topY}%` : `${bottomY}%`;
    const y2 = isDown ? `${bottomY}%` : `${topY}%`;

    // Calculate X position based on slots
    // Distribute evenly across the cell width
    const xPosition = ((slotIndex * 2 + 1) / (totalSlots * 2)) * 100;
    const x = `${xPosition}%`;

    return (
        <div
            className="absolute inset-0 z-1 cursor-pointer"
            onClick={(e) => {
                e.stopPropagation();
                onDelete(arrow.id);
            }}
            style={{
                gridColumn: `${monthIndex + 2} / span 1`,
                gridRow: `${gridRowStart} / ${gridRowEnd}`,
            }}
            title="Click to delete arrow"
        >
            <div className="h-full w-full relative group">
                <svg className="w-full h-full overflow-visible">
                    <defs>
                        <marker
                            id={`arrowhead-${arrow.id}`}
                            markerWidth="10"
                            markerHeight="7"
                            refX="9"
                            refY="3.5"
                            orient="auto"
                        >
                            <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
                        </marker>
                    </defs>
                    <motion.line
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        x1={x}
                        y1={y1}
                        x2={x}
                        y2={y2}
                        stroke="#4ade80"
                        strokeWidth="4"
                        strokeLinecap="round"
                        markerEnd={`url(#arrowhead-${arrow.id})`}
                        className="drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]"
                    />
                </svg>

                {/* Delete Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(arrow.id);
                    }}
                    style={{ left: x, top: '50%' }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600 cursor-pointer"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    );
}
