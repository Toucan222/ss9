import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
interface VoteButtonProps {
  direction: "up" | "down";
  active?: boolean;
  onClick: () => void;
}
export const VoteButton = ({ direction, active, onClick }: VoteButtonProps) => {
  const Icon = direction === "up" ? ChevronUp : ChevronDown;
  return (
    <button
      onClick={onClick}
      className={`p-1.5 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 ${active ? (direction === "up" ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" : "bg-red-500/20 text-red-400 hover:bg-red-500/30") : "text-gray-400 hover:bg-gray-700/50 hover:text-white"}`}
    >
      <Icon size={18} className="transition-transform duration-200" />
    </button>
  );
};
