import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../lib/utils";

export function ActivityCard({ activity, phaseIndex, onDelete }) {
    const style = getPhaseStyle(phaseIndex);

    return (
        <motion.div
            layoutId={activity.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={cn(
                "group relative p-3 rounded-xl backdrop-blur-md border shadow-lg",
                "transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer",
                style.bg,
                style.border
            )}
        >
            <p className={cn("text-sm font-medium leading-tight", style.text)}>
                {activity.text}
            </p>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(activity.id);
                }}
                className={cn(
                    "absolute -top-2 -right-2 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-sm",
                    style.button
                )}
            >
                <X size={12} />
            </button>
        </motion.div>
    );
}

function getPhaseStyle(index) {
    const styles = [
        { // Cyan
            bg: "bg-cyan-950/90 hover:bg-cyan-900/90",
            border: "border-cyan-500/30",
            text: "text-cyan-100",
            button: "bg-cyan-500 hover:bg-cyan-600",
        },
        { // Blue
            bg: "bg-blue-950/90 hover:bg-blue-900/90",
            border: "border-blue-500/30",
            text: "text-blue-100",
            button: "bg-blue-500 hover:bg-blue-600",
        },
        { // Indigo
            bg: "bg-indigo-950/90 hover:bg-indigo-900/90",
            border: "border-indigo-500/30",
            text: "text-indigo-100",
            button: "bg-indigo-500 hover:bg-indigo-600",
        },
        { // Purple
            bg: "bg-purple-950/90 hover:bg-purple-900/90",
            border: "border-purple-500/30",
            text: "text-purple-100",
            button: "bg-purple-500 hover:bg-purple-600",
        },
        { // Fuchsia
            bg: "bg-fuchsia-950/90 hover:bg-fuchsia-900/90",
            border: "border-fuchsia-500/30",
            text: "text-fuchsia-100",
            button: "bg-fuchsia-500 hover:bg-fuchsia-600",
        },
        { // Rose
            bg: "bg-rose-950/90 hover:bg-rose-900/90",
            border: "border-rose-500/30",
            text: "text-rose-100",
            button: "bg-rose-500 hover:bg-rose-600",
        },
    ];
    return styles[index % styles.length];
}
