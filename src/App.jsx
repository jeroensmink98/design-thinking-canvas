import { useState, useEffect } from "react";
import { TimelineGrid } from "./components/TimelineGrid";
import { AddActivityModal } from "./components/AddActivityModal";
import { AddArrowModal } from "./components/AddArrowModal";

const PHASES = ["Empathize", "Define", "Ideate", "Prototype", "Test", "Implement"];
const INITIAL_MONTHS = ["September", "October", "November", "December", "January"];

const INITIAL_DATA = [
  { id: "1", phase: "Empathize", month: "September", text: "Stakeholder Interviews" },
  { id: "2", phase: "Define", month: "October", text: "Problem Statement" },
  { id: "3", phase: "Ideate", month: "October", text: "Brainstorming Session" },
  { id: "4", phase: "Prototype", month: "November", text: "Low-fi Wireframes" },
];

function App() {
  const [months, setMonths] = useState(() => {
    const saved = localStorage.getItem("dt_months");
    return saved ? JSON.parse(saved) : INITIAL_MONTHS;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem("dt_activities");
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [arrows, setArrows] = useState(() => {
    const saved = localStorage.getItem("dt_arrows");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("dt_activities", JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem("dt_arrows", JSON.stringify(arrows));
  }, [arrows]);

  useEffect(() => {
    localStorage.setItem("dt_months", JSON.stringify(months));
  }, [months]);

  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isArrowModalOpen, setIsArrowModalOpen] = useState(false);

  const [selectedSlot, setSelectedSlot] = useState({ phase: null, month: null });
  const [selectedArrowMonth, setSelectedArrowMonth] = useState(null);

  const handleAddRequest = (phase, month) => {
    setSelectedSlot({ phase, month });
    setIsActivityModalOpen(true);
  };

  const handleAddArrowRequest = (month) => {
    setSelectedArrowMonth(month);
    setIsArrowModalOpen(true);
  };

  const handleAddActivity = (text) => {
    const newActivity = {
      id: Date.now().toString(),
      phase: selectedSlot.phase,
      month: selectedSlot.month,
      text,
    };
    setActivities([...activities, newActivity]);
  };

  const handleAddArrow = (startPhase, endPhase) => {
    const arrowsInMonth = arrows.filter(a => a.month === selectedArrowMonth);
    if (arrowsInMonth.length >= 3) {
      alert("Maximum 3 arrows per month allowed.");
      return;
    }

    const newArrow = {
      id: Date.now().toString(),
      month: selectedArrowMonth,
      startPhase,
      endPhase,
    };
    setArrows([...arrows, newArrow]);
  };

  const handleDeleteActivity = (id) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  const handleDeleteArrow = (id) => {
    setArrows(arrows.filter((a) => a.id !== id));
  };

  const handleMonthChange = (index, newName) => {
    const newMonths = [...months];
    newMonths[index] = newName;
    setMonths(newMonths);

    // Also update activities and arrows that reference this month
    const oldName = months[index];
    setActivities(activities.map(a => a.month === oldName ? { ...a, month: newName } : a));
    setArrows(arrows.map(a => a.month === oldName ? { ...a, month: newName } : a));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-blue-500/30">
      {/* Header */}
      <header className="p-8 pb-0">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Design Thinking Process
        </h1>
        <p className="text-white/60 max-w-2xl">
          Visualizing the project lifecycle from empathy to implementation.
        </p>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <div className="bg-white/5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm overflow-hidden">
          <TimelineGrid
            phases={PHASES}
            months={months}
            activities={activities}
            arrows={arrows}
            onAddRequest={handleAddRequest}
            onAddArrowRequest={handleAddArrowRequest}
            onDeleteActivity={handleDeleteActivity}
            onDeleteArrow={handleDeleteArrow}
            onMonthChange={handleMonthChange}
          />
        </div>
      </main>

      <AddActivityModal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        onAdd={handleAddActivity}
        phase={selectedSlot.phase}
        month={selectedSlot.month}
      />

      <AddArrowModal
        isOpen={isArrowModalOpen}
        onClose={() => setIsArrowModalOpen(false)}
        onAdd={handleAddArrow}
        month={selectedArrowMonth}
        phases={PHASES}
      />
    </div>
  );
}

export default App;
