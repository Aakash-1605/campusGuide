import { useState } from 'react';
import { College } from '../types';
import { 
  MapPin, 
  Star, 
  Layers, 
  Image as ImageIcon, 
  Heart, 
  Plus, 
  Check
} from 'lucide-react';

interface CollegeCardProps {
  key?: string;
  college: College;
  isShortlisted: boolean;
  isCompared: boolean;
  onToggleShortlist: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelect: (college: College) => void;
  onOpenAddImages: (college: College) => void;
  viewMode: 'grid' | 'list';
}

export default function CollegeCard({
  college,
  isShortlisted,
  isCompared,
  onToggleShortlist,
  onToggleCompare,
  onSelect,
  onOpenAddImages,
  viewMode,
}: CollegeCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const fallbackCover = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80';

  if (viewMode === 'list') {
    return (
      <div 
        id={`college-card-${college.id}`}
        className="bg-white rounded-xl border border-stone-200/90 hover:border-sky-300 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col md:flex-row group"
      >
        {/* List Mode Cover Image */}
        <div className="relative md:w-72 h-48 md:h-auto shrink-0 bg-stone-100 overflow-hidden">
          <img
            src={imageError ? fallbackCover : (college.coverImage || fallbackCover)}
            alt={college.name}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-70 blur-xs'
            }`}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-900/80 text-white backdrop-blur-xs">
              {college.category}
            </span>
            {college.ranking.rankNumber && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500 text-stone-950">
                #{college.ranking.rankNumber}
              </span>
            )}
          </div>

          {/* Quick Add Photo button */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="text-[11px] font-medium bg-black/70 text-white px-2 py-0.5 rounded-md flex items-center gap-1 backdrop-blur-xs">
              <ImageIcon className="w-3 h-3" />
              {college.gallery.length} photos
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenAddImages(college);
              }}
              title="Add photos to this college"
              className="text-[11px] font-semibold bg-sky-600 hover:bg-sky-700 text-white px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1 transition-transform active:scale-95"
            >
              <Plus className="w-3 h-3" /> Add Photos
            </button>
          </div>
        </div>

        {/* List Mode Info Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-sm">
                    {college.type}
                  </span>
                  <span className="text-xs text-stone-400">• Est. {college.established}</span>
                  <span className="text-xs text-stone-500 font-medium">{college.accreditation}</span>
                </div>
                <h3 
                  onClick={() => onSelect(college)}
                  className="text-base font-bold text-stone-900 mt-1 hover:text-sky-700 cursor-pointer transition-colors"
                >
                  {college.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-stone-500 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{college.location.city}, {college.location.state}, {college.location.country}</span>
                </div>
              </div>

              {/* Action toggles */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => onToggleShortlist(college.id)}
                  title={isShortlisted ? 'Remove from shortlist' : 'Shortlist college'}
                  className={`p-2 rounded-lg border transition-colors ${
                    isShortlisted 
                      ? 'bg-rose-50 border-rose-200 text-rose-600' 
                      : 'bg-white border-stone-200 text-stone-400 hover:text-stone-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isShortlisted ? 'fill-rose-500' : ''}`} />
                </button>
                <button
                  onClick={() => onToggleCompare(college.id)}
                  title="Compare"
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border flex items-center gap-1 transition-colors ${
                    isCompared 
                      ? 'bg-sky-50 border-sky-300 text-sky-700' 
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {isCompared ? <Check className="w-3.5 h-3.5 text-sky-600" /> : <Layers className="w-3.5 h-3.5" />}
                  <span>Compare</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
              {college.description}
            </p>

            {/* Courses pills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {college.courses.slice(0, 3).map((course, idx) => (
                <span key={idx} className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-medium">
                  {course}
                </span>
              ))}
              {college.courses.length > 3 && (
                <span className="text-[11px] text-stone-400 self-center">
                  +{college.courses.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Stats Bar & CTA */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-4 border-t border-stone-100">
            <div className="flex items-center gap-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Avg Package</span>
                <span className="font-bold text-stone-800">{college.avgPackage}</span>
              </div>
              <div className="h-6 w-px bg-stone-200" />
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Tuition</span>
                <span className="font-semibold text-stone-700">{college.tuitionFees}</span>
              </div>
              <div className="h-6 w-px bg-stone-200" />
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-stone-800">{college.rating}</span>
                <span className="text-stone-400 text-[11px]">({college.reviewCount})</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelect(college)}
                className="px-4 py-2 text-xs font-bold text-sky-700 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors flex items-center gap-1.5"
              >
                View Details &amp; Gallery
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // GRID MODE (Default)
  return (
    <div 
      id={`college-card-${college.id}`}
      className="bg-white rounded-2xl border border-stone-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-16/10 w-full bg-stone-100 overflow-hidden">
        <img
          src={imageError ? fallbackCover : (college.coverImage || fallbackCover)}
          alt={college.name}
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-70 blur-xs'
          }`}
        />

        {/* Gradient shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-stone-900/85 text-white backdrop-blur-xs shadow-xs">
            {college.category}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleShortlist(college.id);
              }}
              title={isShortlisted ? 'Remove from shortlist' : 'Shortlist college'}
              className={`p-1.5 rounded-full backdrop-blur-xs transition-colors ${
                isShortlisted 
                  ? 'bg-white text-rose-600 shadow-sm' 
                  : 'bg-black/40 text-white hover:bg-black/60'
              }`}
            >
              <Heart className={`w-4 h-4 ${isShortlisted ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Ranking & Photo count footer */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="text-white">
            <span className="text-[11px] font-bold px-2 py-0.5 bg-amber-500 text-stone-950 rounded-md inline-block mb-1 shadow-xs">
              {college.ranking.badge}
            </span>
            <p className="text-xs text-stone-200 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-300" />
              {college.location.city}, {college.location.state}
            </p>
          </div>

          {/* Quick Add Photos button */}
          <div className="flex flex-col items-end gap-1">
            <span className="text-[11px] font-medium bg-black/70 text-white px-2 py-0.5 rounded-md flex items-center gap-1 backdrop-blur-xs">
              <ImageIcon className="w-3 h-3" />
              {college.gallery.length} photos
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenAddImages(college);
              }}
              className="text-[11px] font-bold bg-sky-600 hover:bg-sky-700 text-white px-2 py-0.5 rounded-md shadow-xs flex items-center gap-0.5 transition-transform active:scale-95"
            >
              <Plus className="w-3 h-3" /> Photo
            </button>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Accreditation & Year */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span className="font-semibold text-sky-700">{college.type}</span>
            <span>Est. {college.established}</span>
          </div>

          {/* College Title */}
          <h3 
            onClick={() => onSelect(college)}
            className="text-base font-bold text-stone-900 group-hover:text-sky-700 cursor-pointer line-clamp-1 transition-colors"
          >
            {college.name}
          </h3>
          <p className="text-xs text-stone-500 font-medium mt-0.5">{college.shortName}</p>

          {/* Rating & Accreditation */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-stone-800">{college.rating}</span>
              <span className="text-[11px] text-stone-400">({college.reviewCount})</span>
            </div>
            <span className="text-[11px] font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-sm">
              {college.accreditation.split('|')[0].trim()}
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 mt-3 p-2.5 bg-stone-50 rounded-xl text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Avg Package</span>
              <span className="font-bold text-stone-800">{college.avgPackage}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Tuition Fees</span>
              <span className="font-semibold text-stone-700 truncate block">{college.tuitionFees}</span>
            </div>
          </div>

          {/* Courses preview */}
          <div className="flex flex-wrap gap-1 mt-3">
            {college.courses.slice(0, 2).map((c, i) => (
              <span key={i} className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md truncate max-w-[170px]">
                {c}
              </span>
            ))}
            {college.courses.length > 2 && (
              <span className="text-[10px] text-stone-400 px-1 py-0.5">
                +{college.courses.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer CTA */}
        <div className="flex items-center justify-between gap-2 pt-4 mt-3 border-t border-stone-100">
          <button
            onClick={() => onToggleCompare(college.id)}
            className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium flex items-center gap-1 transition-colors ${
              isCompared 
                ? 'bg-sky-50 border-sky-300 text-sky-700' 
                : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            {isCompared ? <Check className="w-3.5 h-3.5 text-sky-600" /> : <Layers className="w-3.5 h-3.5" />}
            <span>Compare</span>
          </button>

          <button
            onClick={() => onSelect(college)}
            className="flex-1 py-1.5 px-3 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors text-center shadow-xs"
          >
            Campus &amp; Details
          </button>
        </div>

      </div>
    </div>
  );
}
