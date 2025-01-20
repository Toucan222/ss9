import React, { useState } from "react";
import { ExternalLink, Flame, Share2, Bookmark, Users } from "lucide-react";
import { VoteButton } from "./VoteButton";
import { PreviewModal } from "./PreviewModal";
interface ToolCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  votes?: number;
  isHot?: boolean;
  previewUrl?: string;
  usageCount?: number;
}
export const ToolCard = ({
  name,
  description,
  icon,
  category,
  votes = 0,
  isHot = false,
  previewUrl,
  usageCount = 0,
}: ToolCardProps) => {
  const [voteCount, setVoteCount] = useState(votes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const handleVote = (direction: "up" | "down") => {
    if (userVote === direction) {
      setUserVote(null);
      setVoteCount(direction === "up" ? voteCount - 1 : voteCount + 1);
    } else {
      setUserVote(direction);
      if (userVote !== null) {
        setVoteCount(direction === "up" ? voteCount + 2 : voteCount - 2);
      } else {
        setVoteCount(direction === "up" ? voteCount + 1 : voteCount - 1);
      }
    }
  };
  const formatVotes = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count;
  };
  return (
    <>
      <div
        className="relative w-full bg-gray-800/50 hover:bg-gray-800 rounded-2xl transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-purple-500/10"
        onClick={() => setShowPreview(true)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {previewUrl && (
          <div className="relative aspect-[21/9] rounded-t-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 to-gray-900/60">
              <img
                src={previewUrl}
                alt={name}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-300 scale-[1.01] group-hover:scale-[1.02]"
              />
            </div>
          </div>
        )}
        <div className="relative p-6 flex items-start gap-4">
          <div
            className="flex flex-col items-center gap-1.5 bg-gray-900/40 py-2 px-1 rounded-xl backdrop-blur-sm border border-gray-700/30"
            onClick={(e) => e.stopPropagation()}
          >
            <VoteButton
              direction="up"
              active={userVote === "up"}
              onClick={() => handleVote("up")}
            />
            <span
              className={`text-sm font-medium ${userVote === "up" ? "text-green-500" : userVote === "down" ? "text-red-500" : "text-gray-400"}`}
            >
              {formatVotes(voteCount)}
            </span>
            <VoteButton
              direction="down"
              active={userVote === "down"}
              onClick={() => handleVote("down")}
            />
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-xl font-bold text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                    {name}
                  </h3>
                  {isHot && (
                    <div className="flex items-center gap-1.5 bg-orange-500/10 text-orange-400 px-2.5 py-0.5 rounded-full text-xs font-medium border border-orange-500/20">
                      <Flame size={12} className="animate-pulse" />
                      <span>Trending</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-300 text-base leading-relaxed">
                  {description}
                </p>
              </div>
              <div
                className="flex flex-col gap-2 opacity-60 group-hover:opacity-100 transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="text-gray-400 hover:text-white p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-200 backdrop-blur-sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark
                    size={20}
                    className={`transition-colors duration-200 ${isBookmarked ? "text-purple-400 fill-purple-400" : ""}`}
                  />
                </button>
                <button className="text-gray-400 hover:text-white p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-200 backdrop-blur-sm">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-2 bg-gray-900/40 text-sm text-gray-300 px-3 py-1.5 rounded-full border border-gray-700/30 backdrop-blur-sm">
                {icon}
                <span>#{category}</span>
              </span>
              {usageCount > 0 && (
                <span className="flex items-center gap-2 text-sm text-gray-400 bg-gray-900/40 px-3 py-1.5 rounded-full border border-gray-700/30 backdrop-blur-sm">
                  <Users size={14} />
                  <span>{usageCount.toLocaleString()} active</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {showPreview && (
        <PreviewModal
          tool={{
            name,
            description,
            category,
            votes: voteCount,
            previewUrl,
            usageCount,
            bookmarked: isBookmarked,
          }}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
};
