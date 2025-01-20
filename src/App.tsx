import React, { useState } from "react";
import {
  Search,
  Sparkles,
  Video,
  Image,
  Music,
  Code,
  Mic,
  Settings,
  TrendingUp,
  Palette,
} from "lucide-react";
import { ToolCard } from "./components/ToolCard";
const categories = [
  {
    name: "All",
    icon: <Sparkles size={20} className="text-white" />,
  },
  {
    name: "Video",
    icon: <Video size={20} className="text-white" />,
  },
  {
    name: "Photo",
    icon: <Image size={20} className="text-white" />,
  },
  {
    name: "Audio",
    icon: <Music size={20} className="text-white" />,
  },
  {
    name: "Design",
    icon: <Palette size={20} className="text-white" />,
  },
  {
    name: "Code",
    icon: <Code size={20} className="text-white" />,
  },
  {
    name: "Voice",
    icon: <Mic size={20} className="text-white" />,
  },
  {
    name: "Utils",
    icon: <Settings size={20} className="text-white" />,
  },
];
const tools = [
  {
    name: "Quick Edit Pro",
    description: "Edit videos in seconds with AI-powered tools",
    category: "video",
    icon: <Video size={20} className="text-white" />,
    votes: 1250,
    isHot: true,
    previewUrl:
      "https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&w=1200&h=630",
    usageCount: 2451,
  },
  {
    name: "Beat Maker AI",
    description: "Create custom beats with artificial intelligence",
    category: "audio",
    icon: <Music size={20} className="text-white" />,
    votes: 840,
    previewUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&h=630",
    usageCount: 1832,
  },
  {
    name: "Thumbnail Master",
    description: "Create eye-catching thumbnails with one click",
    category: "photo",
    icon: <Image size={20} className="text-white" />,
    votes: 967,
    isHot: true,
    previewUrl:
      "https://images.unsplash.com/photo-1626908013943-df94de54984c?auto=format&fit=crop&w=1200&h=630",
    usageCount: 3211,
  },
  {
    name: "Color Palette Pro",
    description: "Generate trending color schemes instantly",
    category: "design",
    icon: <Palette size={20} className="text-white" />,
    votes: 632,
    previewUrl:
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1200&h=630",
    usageCount: 1567,
  },
];
export function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"trending" | "newest">("trending");
  const sortedTools = [...tools].sort(
    (a, b) => (b.votes || 0) - (a.votes || 0),
  );
  const topTools = sortedTools.slice(0, 3);
  return (
    <main className="min-h-screen w-full bg-gray-900 text-white">
      <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-10 border-b border-gray-800">
        <div className="p-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Creator Tools
          </h1>
          <p className="text-gray-400 text-sm">
            50 free tools for content creators
          </p>
        </div>
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full whitespace-nowrap ${activeCategory === category.name ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gray-800"}`}
              >
                {category.icon}
                <span className="text-sm">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="px-4 pb-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search tools..."
              className="w-full bg-gray-800 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <div className="px-4 pb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy("trending")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${sortBy === "trending" ? "bg-purple-500/20 text-purple-400" : "bg-gray-800 text-gray-400"}`}
            >
              <TrendingUp size={16} />
              Trending
            </button>
            <button
              onClick={() => setSortBy("newest")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${sortBy === "newest" ? "bg-purple-500/20 text-purple-400" : "bg-gray-800 text-gray-400"}`}
            >
              Latest
            </button>
          </div>
        </div>
      </header>
      <div className="pt-44 px-4 pb-20">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="text-yellow-500" size={20} />
            <h2 className="font-bold">Top Rated</h2>
          </div>
          <div className="space-y-3">
            {topTools.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="font-bold">All Tools</h2>
          </div>
          {sortedTools.map((tool) => (
            <ToolCard key={tool.name} {...tool} />
          ))}
        </div>
      </div>
    </main>
  );
}
