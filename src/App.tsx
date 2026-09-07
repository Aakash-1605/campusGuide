import { useState, useEffect, useMemo } from 'react';
import { College, FilterState, ViewMode, CollegeImage } from './types';
import { INITIAL_COLLEGES } from './data/initialColleges';
import Navbar from './components/Navbar';
import FiltersBar from './components/FiltersBar';
import CollegeCard from './components/CollegeCard';
import CollegeDetailModal from './components/CollegeDetailModal';
import AddCollegeModal from './components/AddCollegeModal';
import AddImageModal from './components/AddImageModal';
import CollegeCompareModal from './components/CollegeCompareModal';
import { 
  Building2, 
  Upload, 
  Image as ImageIcon, 
  Search, 
  Sparkles, 
  Plus, 
  GraduationCap, 
  Award,
  Layers,
  Heart
} from 'lucide-react';

const LOCAL_STORAGE_KEY_COLLEGES = 'campusguide_colleges_v1';
const LOCAL_STORAGE_KEY_SHORTLIST = 'campusguide_shortlist_v1';

export default function App() {
  // 1. Colleges State with LocalStorage persistence
  const [colleges, setColleges] = useState<College[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_COLLEGES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_COLLEGES;
  });

  // 2. Shortlisted colleges ID set
  const [shortlistedIds, setShortlistedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SHORTLIST);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['sairam-eng', 'iit-madras'];
  });

  // 3. Compare colleges ID set
  const [comparedIds, setComparedIds] = useState<string[]>([]);

  // 4. Filter and View states
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'All',
    type: 'All',
    state: 'All',
    onlyShortlisted: false,
    sortBy: 'rank-asc'
  });
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // 5. Active Modals state
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [collegeForAddingImages, setCollegeForAddingImages] = useState<College | null>(null);
  const [isAddCollegeOpen, setIsAddCollegeOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_COLLEGES, JSON.stringify(colleges));
    } catch {
      // handle storage quota
    }
  }, [colleges]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_SHORTLIST, JSON.stringify(shortlistedIds));
    } catch {
      // fallback
    }
  }, [shortlistedIds]);

  // Keep selectedCollege and collegeForAddingImages in sync with main state changes
  useEffect(() => {
    if (selectedCollege) {
      const updated = colleges.find(c => c.id === selectedCollege.id);
      if (updated) setSelectedCollege(updated);
    }
  }, [colleges, selectedCollege?.id]);

  useEffect(() => {
    if (collegeForAddingImages) {
      const updated = colleges.find(c => c.id === collegeForAddingImages.id);
      if (updated) setCollegeForAddingImages(updated);
    }
  }, [colleges, collegeForAddingImages?.id]);

  // Unique list of available states
  const availableStates = useMemo(() => {
    const states = new Set<string>();
    colleges.forEach(c => {
      if (c.location.state) states.add(c.location.state);
    });
    return Array.from(states).sort();
  }, [colleges]);

  // Filtering and Sorting
  const filteredColleges = useMemo(() => {
    return colleges.filter(college => {
      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = college.name.toLowerCase().includes(query);
        const matchesShort = college.shortName.toLowerCase().includes(query);
        const matchesCity = college.location.city.toLowerCase().includes(query);
        const matchesState = college.location.state.toLowerCase().includes(query);
        const matchesCourses = college.courses.some(c => c.toLowerCase().includes(query));
        const matchesDesc = college.description.toLowerCase().includes(query);
        if (!matchesName && !matchesShort && !matchesCity && !matchesState && !matchesCourses && !matchesDesc) {
          return false;
        }
      }

      // Category filter
      if (filters.category !== 'All' && college.category !== filters.category) {
        return false;
      }

      // Institution type filter
      if (filters.type !== 'All' && college.type !== filters.type) {
        return false;
      }

      // State filter
      if (filters.state !== 'All' && college.location.state !== filters.state) {
        return false;
      }

      // Only shortlisted
      if (filters.onlyShortlisted && !shortlistedIds.includes(college.id)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'rank-asc') {
        const rankA = a.ranking.rankNumber ?? 9999;
        const rankB = b.ranking.rankNumber ?? 9999;
        return rankA - rankB;
      }
      if (filters.sortBy === 'rating-desc') {
        return b.rating - a.rating;
      }
      if (filters.sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (filters.sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (filters.sortBy === 'package-desc') {
        // Extract numeric value from average package string (e.g. "₹21.4 LPA" -> 21.4)
        const parsePkg = (val: string) => {
          const match = val.match(/[\d.]+/);
          return match ? parseFloat(match[0]) : 0;
        };
        return parsePkg(b.avgPackage) - parsePkg(a.avgPackage);
      }
      return 0;
    });
  }, [colleges, filters, shortlistedIds]);

  // Actions
  const handleToggleShortlist = (id: string) => {
    setShortlistedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleCompare = (id: string) => {
    setComparedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 colleges at once.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleRemoveFromCompare = (id: string) => {
    setComparedIds(prev => prev.filter(item => item !== id));
  };

  const handleAddCollege = (newCollege: College) => {
    setColleges(prev => [newCollege, ...prev]);
    setSelectedCollege(newCollege);
  };

  const handleAddImagesToCollege = (collegeId: string, newImages: CollegeImage[], setAsCoverId?: string) => {
    setColleges(prev => prev.map(col => {
      if (col.id !== collegeId) return col;

      const updatedGallery = [...col.gallery, ...newImages];
      let updatedCover = col.coverImage;

      if (setAsCoverId) {
        const coverImg = updatedGallery.find(img => img.id === setAsCoverId);
        if (coverImg) updatedCover = coverImg.url;
      }

      return {
        ...col,
        gallery: updatedGallery,
        coverImage: updatedCover
      };
    }));
  };

  const handleRemoveImageFromCollege = (collegeId: string, imageId: string) => {
    setColleges(prev => prev.map(col => {
      if (col.id !== collegeId) return col;
      const filtered = col.gallery.filter(img => img.id !== imageId);
      return {
        ...col,
        gallery: filtered
      };
    }));
  };

  const handleSetCoverPhoto = (collegeId: string, imageId: string) => {
    setColleges(prev => prev.map(col => {
      if (col.id !== collegeId) return col;
      const targetImg = col.gallery.find(img => img.id === imageId);
      if (!targetImg) return col;
      return {
        ...col,
        coverImage: targetImg.url,
        gallery: col.gallery.map(img => ({
          ...img,
          isCover: img.id === imageId
        }))
      };
    }));
  };

  const handleRestoreDefaults = () => {
    if (window.confirm('Reset directory back to original verified colleges? Custom entries will be refreshed.')) {
      setColleges(INITIAL_COLLEGES);
      setShortlistedIds(['sairam-eng', 'iit-madras']);
      setComparedIds([]);
    }
  };

  const comparedColleges = useMemo(() => {
    return colleges.filter(c => comparedIds.includes(c.id));
  }, [colleges, comparedIds]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900">
      
      {/* Top Navigation */}
      <Navbar
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => setFilters(prev => ({ ...prev, searchQuery: q }))}
        onOpenAddCollege={() => setIsAddCollegeOpen(true)}
        comparedCount={comparedIds.length}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Hero Welcome & Image Feature Callout */}
      <section className="bg-gradient-to-b from-white to-stone-50 border-b border-stone-200/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Campus Directory &amp; Visual Showcase Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-stone-950 leading-tight">
              Explore Top Colleges &amp; Verified Campus Galleries
            </h1>
            <p className="text-sm text-stone-600 mt-2 leading-relaxed">
              Enlist colleges, discover NIRF rankings and placement track records, and upload campus photography 
              including lecture halls, laboratories, dorms, and academic quads.
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsAddCollegeOpen(true)}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-sky-600 hover:bg-sky-700 active:scale-98 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Enlist New College</span>
            </button>
            
            <button
              onClick={() => {
                if (colleges.length > 0) {
                  setCollegeForAddingImages(colleges[0]);
                }
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold rounded-xl border border-stone-200 shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              <Upload className="w-4 h-4 text-sky-600" />
              <span>Add Images</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter and View Bar */}
      <FiltersBar
        filters={filters}
        onFilterChange={setFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCount={filteredColleges.length}
        shortlistedCount={shortlistedIds.length}
        availableStates={availableStates}
      />

      {/* Main College List View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Empty State */}
        {filteredColleges.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-xl mx-auto shadow-xs my-8">
            <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-stone-900">No colleges matched your filters</h3>
            <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
              We couldn't find any college matching your current search or category criteria. Try broadening your filters or enlist a new college profile.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setFilters({
                  searchQuery: '',
                  category: 'All',
                  type: 'All',
                  state: 'All',
                  onlyShortlisted: false,
                  sortBy: 'rank-asc'
                })}
                className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
              >
                Clear All Filters
              </button>
              <button
                onClick={() => setIsAddCollegeOpen(true)}
                className="px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Enlist College
              </button>
            </div>
          </div>
        ) : (
          /* College Items Container */
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'flex flex-col gap-4'
          }>
            {filteredColleges.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
                isShortlisted={shortlistedIds.includes(college.id)}
                isCompared={comparedIds.includes(college.id)}
                onToggleShortlist={handleToggleShortlist}
                onToggleCompare={handleToggleCompare}
                onSelect={setSelectedCollege}
                onOpenAddImages={setCollegeForAddingImages}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-6 px-4 sm:px-6 lg:px-8 text-xs text-stone-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-sky-600" />
            <span className="font-bold text-stone-800">CampusGuide Portal</span>
            <span>• Verified college database &amp; campus photography directory</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleRestoreDefaults}
              className="text-stone-400 hover:text-stone-700 underline text-[11px]"
            >
              Reset to Sample Colleges
            </button>
            <span>Total Institutions: {colleges.length}</span>
          </div>
        </div>
      </footer>

      {/* MODAL: College Detail View */}
      {selectedCollege && (
        <CollegeDetailModal
          college={selectedCollege}
          isOpen={!!selectedCollege}
          isShortlisted={shortlistedIds.includes(selectedCollege.id)}
          isCompared={comparedIds.includes(selectedCollege.id)}
          onClose={() => setSelectedCollege(null)}
          onToggleShortlist={handleToggleShortlist}
          onToggleCompare={handleToggleCompare}
          onOpenAddImages={setCollegeForAddingImages}
          onSetCover={handleSetCoverPhoto}
        />
      )}

      {/* MODAL: Add Photos to College */}
      {collegeForAddingImages && (
        <AddImageModal
          college={collegeForAddingImages}
          isOpen={!!collegeForAddingImages}
          onClose={() => setCollegeForAddingImages(null)}
          onAddImages={handleAddImagesToCollege}
          onRemoveImage={handleRemoveImageFromCollege}
          onSetCover={handleSetCoverPhoto}
        />
      )}

      {/* MODAL: Enlist New College */}
      <AddCollegeModal
        isOpen={isAddCollegeOpen}
        onClose={() => setIsAddCollegeOpen(false)}
        onAddCollege={handleAddCollege}
      />

      {/* MODAL: Side-by-Side Comparison */}
      <CollegeCompareModal
        colleges={comparedColleges}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onRemoveFromCompare={handleRemoveFromCompare}
        onSelectCollege={(c) => {
          setIsCompareOpen(false);
          setSelectedCollege(c);
        }}
      />

    </div>
  );
}
