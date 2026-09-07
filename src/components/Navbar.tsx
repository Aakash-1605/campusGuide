import { GraduationCap, Search, Plus, Layers, Image as ImageIcon, Sparkles } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenAddCollege: () => void;
  comparedCount: number;
  onOpenCompare: () => void;
}

export default function Navbar({
  searchQuery,
  onSearchChange,
  onOpenAddCollege,
  comparedCount,
  onOpenCompare,
}: NavbarProps) {
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center shadow-xs">
            <GraduationCap className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-stone-950 text-base tracking-tight">
                CampusGuide
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-sky-100 text-sky-800">
                Directory
              </span>
            </div>
            <p className="text-[11px] text-stone-500 hidden sm:block">
              Colleges, Campuses &amp; Verified Galleries
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md mx-2">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search colleges, cities, courses (e.g. Sairam, IIT, AI & DS)..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-stone-100/80 border border-stone-200 rounded-full focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Compare Button */}
          {comparedCount > 0 && (
            <button
              onClick={onOpenCompare}
              className="px-3 py-1.5 text-xs font-semibold bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-xl flex items-center gap-1.5 transition-colors shadow-xs animate-fade-in"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Compare ({comparedCount})</span>
            </button>
          )}

          {/* Add College CTA */}
          <button
            id="enlist-college-nav-btn"
            onClick={onOpenAddCollege}
            className="px-3.5 sm:px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 active:scale-98 rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Enlist College</span>
            <span className="sm:hidden">Add</span>
          </button>

        </div>

      </div>
    </header>
  );
}
