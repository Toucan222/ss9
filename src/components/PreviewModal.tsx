import React from "react";
import {
  X,
  Share2,
  Bookmark,
  ExternalLink,
  Users,
  ArrowRight,
} from "lucide-react";
interface PreviewModalProps {
  tool: {
    name: string;
    description: string;
    category: string;
    votes: number;
    previewUrl?: string;
    usageCount?: number;
    bookmarked?: boolean;
  };
  onClose: () => void;
}
export const PreviewModal = ({ tool, onClose }: PreviewModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-end sm:items-center justify-center">
      <div
        className="bg-gray-900 w-full max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-800/50 backdrop-blur-xl bg-gray-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {tool.name}
              </h3>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                #{tool.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>
        </div>
        {tool.previewUrl && (
          <div className="relative aspect-video bg-gray-800 group">
            <img
              src={tool.previewUrl}
              alt={tool.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <p className="text-gray-300 text-lg leading-relaxed">
              {tool.description}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Users size={16} />
                  <span className="text-sm">Active Users</span>
                </div>
                <p className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  {tool.usageCount?.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <ArrowRight size={16} />
                  <span className="text-sm">Popularity</span>
                </div>
                <p className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Top 10%
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
              Try it now
            </button>
            <button className="p-3 hover:bg-gray-800 rounded-xl transition-colors border border-gray-700/50">
              <Share2 size={20} className="text-gray-400" />
            </button>
            <button className="p-3 hover:bg-gray-800 rounded-xl transition-colors border border-gray-700/50">
              <Bookmark
                size={20}
                className={
                  tool.bookmarked
                    ? "text-purple-500 fill-purple-500"
                    : "text-gray-400"
                }
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
