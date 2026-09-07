import { FilterState, SortOption, ViewMode } from '../types';
import { LayoutGrid, List, SlidersHorizontal, RotateCcw, Heart } from 'lucide-react';

interface FiltersBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalCount: number;
  shortlistedCount: number;
  availableStates: string[];
}

const CATEGORIES = [
  'All',
  'Engineering & Tech',
  'Management',
  'Medical & Health',
  'Arts & Sciences',
  'Multi-Disciplinary'
];

export default function FiltersBar({
  filters,
  onFilterChange,
  viewMode,
  onViewModeChange,
  totalCount,
  shortlistedCount,
  availableStates,
}: FiltersBarProps) {
  const hasActiveFilters = 
    filters.category !== 'All' || 
    filters.type !== 'All' || 
    filters.state !== 'All' || 
    filters.onlyShortlisted || 
    filters.searchQuery !== '';

  const resetFilters = () => {
    onFilterChange({
      searchQuery: '',
      category: 'All',
      type: 'All',
      state: 'All',
      onlyShortlisted: false,
      sortBy: 'rank-asc'
    });
  };

  return (
    <div className="bg-white border-b border-stone-200 sticky top-16 z-20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
        
        {/* Top Row: Category Pills & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isSelected = filters.category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onFilterChange({ ...filters, category: cat })}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200/80 text-stone-600'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Right Side: Shortlist Toggle & View Mode */}
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            {/* Shortlist Filter */}
            <button
              onClick={() => onFilterChange({ ...filters, onlyShortlisted: !filters.onlyShortlisted })}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                filters.onlyShortlisted
                  ? 'bg-rose-50 border-rose-200 text-rose-700'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${filters.onlyShortlisted ? 'fill-rose-500' : ''}`} />
              <span>Shortlisted ({shortlistedCount})</span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-stone-200 rounded-lg p-0.5 bg-stone-50">
              <button
                onClick={() => onViewModeChange('grid')}
                title="Grid View"
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                title="List View"
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Secondary Row: Dropdowns, Sort, Count & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1 border-t border-stone-100">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Institution Type */}
            <select
              value={filters.type}
              onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
              className="px-2.5 py-1.5 border border-stone-200 rounded-lg bg-stone-50/60 font-medium text-stone-700 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            >
              <option value="All">All Types</option>
              <option value="Autonomous">Autonomous</option>
              <option value="Institute of National Importance">Institute of National Importance</option>
              <option value="Deemed University">Deemed University</option>
              <option value="Government / Public">Government / Public</option>
              <option value="Private">Private</option>
            </select>

            {/* State/Region filter */}
            <select
              value={filters.state}
              onChange={(e) => onFilterChange({ ...filters, state: e.target.value })}
              className="px-2.5 py-1.5 border border-stone-200 rounded-lg bg-stone-50/60 font-medium text-stone-700 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            >
              <option value="All">All States / Regions</option>
              {availableStates.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-400 text-[11px] font-medium hidden sm:inline">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as SortOption })}
                className="px-2.5 py-1.5 border border-stone-200 rounded-lg bg-stone-50/60 font-semibold text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              >
                <option value="rank-asc">Ranking (Top First)</option>
                <option value="rating-desc">Student Rating</option>
                <option value="package-desc">Average Placement</option>
                <option value="name-asc">Alphabetical (A - Z)</option>
                <option value="newest">Recently Added</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-stone-500 hover:text-stone-800 flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md hover:bg-stone-100 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          <div className="text-[11px] font-semibold text-stone-500 ml-auto">
            Showing <span className="text-stone-900 font-bold">{totalCount}</span> colleges
          </div>

        </div>

      </div>
    </div>
  );
}
