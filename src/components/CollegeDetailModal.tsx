import { useState } from 'react';
import { College, CollegeImage } from '../types';
import { 
  X, 
  MapPin, 
  Building2, 
  Star, 
  Award, 
  Globe, 
  Mail, 
  Phone, 
  Image as ImageIcon, 
  Plus, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2,
  Heart,
  Share2,
  Layers,
  BookOpen,
  Wifi,
  Sparkles
} from 'lucide-react';

interface CollegeDetailModalProps {
  college: College;
  isOpen: boolean;
  isShortlisted: boolean;
  isCompared: boolean;
  onClose: () => void;
  onToggleShortlist: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onOpenAddImages: (college: College) => void;
  onSetCover: (collegeId: string, imageId: string) => void;
}

export default function CollegeDetailModal({
  college,
  isOpen,
  isShortlisted,
  isCompared,
  onClose,
  onToggleShortlist,
  onToggleCompare,
  onOpenAddImages,
  onSetCover,
}: CollegeDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'gallery' | 'overview' | 'courses' | 'facilities' | 'contact'>('gallery');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);

  if (!isOpen) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  const currentLightboxImage = lightboxIndex !== null ? college.gallery[lightboxIndex] : null;

  return (
    <div id="college-detail-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 md:p-6 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] shadow-2xl flex flex-col overflow-hidden border border-stone-200">
        
        {/* Cover Hero Header */}
        <div className="relative h-64 md:h-72 w-full bg-stone-900 shrink-0 overflow-hidden">
          <img
            src={college.coverImage}
            alt={college.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

          {/* Top Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-600 text-white shadow-xs">
                {college.category}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-stone-900/80 text-white backdrop-blur-xs">
                {college.type}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                title="Share link"
                className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onToggleShortlist(college.id)}
                title={isShortlisted ? 'Remove bookmark' : 'Bookmark college'}
                className={`p-2 rounded-full backdrop-blur-xs transition-colors ${
                  isShortlisted ? 'bg-white text-rose-600' : 'bg-black/40 hover:bg-black/60 text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isShortlisted ? 'fill-rose-500' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Banner Details */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-bold px-2.5 py-0.5 bg-amber-500 text-stone-950 rounded-md shadow-xs">
                {college.ranking.badge}
              </span>
              <span className="text-xs text-stone-300 font-medium">
                {college.accreditation}
              </span>
              <span className="text-xs text-stone-300">• Est. {college.established}</span>
            </div>

            <h1 className="text-xl md:text-2xl font-black tracking-tight leading-snug">
              {college.name}
            </h1>
            
            <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
              <p className="text-xs text-stone-200 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                {college.location.city}, {college.location.state}, {college.location.country}
              </p>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-white">{college.rating}</span>
                  <span className="text-[10px] text-stone-300">({college.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 px-6 bg-stone-50 gap-2 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-1.5 py-3 px-3 text-xs font-bold border-b-2 transition-colors shrink-0 ${
              activeTab === 'gallery'
                ? 'border-sky-600 text-sky-700 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Campus Photos &amp; Gallery ({college.gallery.length})
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-1.5 py-3 px-3 text-xs font-bold border-b-2 transition-colors shrink-0 ${
              activeTab === 'overview'
                ? 'border-sky-600 text-sky-700 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Overview &amp; Stats
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-1.5 py-3 px-3 text-xs font-bold border-b-2 transition-colors shrink-0 ${
              activeTab === 'courses'
                ? 'border-sky-600 text-sky-700 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Courses &amp; Fees
          </button>
          <button
            onClick={() => setActiveTab('facilities')}
            className={`flex items-center gap-1.5 py-3 px-3 text-xs font-bold border-b-2 transition-colors shrink-0 ${
              activeTab === 'facilities'
                ? 'border-sky-600 text-sky-700 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Wifi className="w-4 h-4" />
            Campus Facilities
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex items-center gap-1.5 py-3 px-3 text-xs font-bold border-b-2 transition-colors shrink-0 ${
              activeTab === 'contact'
                ? 'border-sky-600 text-sky-700 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Globe className="w-4 h-4" />
            Contact &amp; Location
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-white space-y-6">

          {/* TAB: CAMPUS GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-sky-600" />
                    Campus Photo Gallery
                  </h3>
                  <p className="text-xs text-stone-500">
                    High-resolution photographs of academic facilities, labs, libraries, and student grounds.
                  </p>
                </div>

                {/* Primary Button to add more images */}
                <button
                  id="add-photos-to-college-detail-btn"
                  onClick={() => onOpenAddImages(college)}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Campus Photos
                </button>
              </div>

              {/* Photo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {college.gallery.map((img, idx) => {
                  const isCover = college.coverImage === img.url || img.isCover;
                  return (
                    <div
                      key={img.id || idx}
                      className="group relative rounded-xl overflow-hidden border border-stone-200 bg-stone-100 flex flex-col hover:shadow-md transition-shadow"
                    >
                      <div 
                        onClick={() => setLightboxIndex(idx)}
                        className="aspect-video relative overflow-hidden cursor-pointer bg-stone-200"
                      >
                        <img
                          src={img.url}
                          alt={img.caption || 'Campus photography'}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white gap-2">
                          <span className="p-2 bg-black/60 rounded-full">
                            <Maximize2 className="w-4 h-4" />
                          </span>
                        </div>

                        {isCover && (
                          <span className="absolute top-2 left-2 text-[10px] font-bold bg-sky-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                            Cover Photo
                          </span>
                        )}
                      </div>

                      <div className="p-3 bg-white flex-1 flex flex-col justify-between">
                        <p className="text-xs font-medium text-stone-800 line-clamp-2">
                          {img.caption || 'Campus View'}
                        </p>

                        {!isCover && (
                          <button
                            onClick={() => onSetCover(college.id, img.id)}
                            className="text-[11px] font-semibold text-sky-600 hover:text-sky-800 text-left mt-2"
                          >
                            Set as Cover Photo
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick drag drop promo inside gallery */}
              <div 
                onClick={() => onOpenAddImages(college)}
                className="border-2 border-dashed border-stone-200 hover:border-sky-400 rounded-2xl p-6 text-center cursor-pointer bg-stone-50/50 hover:bg-stone-50 transition-colors"
              >
                <Plus className="w-6 h-6 text-sky-600 mx-auto mb-1" />
                <span className="text-xs font-bold text-stone-800 block">
                  Have more photos of {college.shortName}?
                </span>
                <span className="text-[11px] text-stone-500">
                  Click here to upload campus pictures, lab shots, or events directly.
                </span>
              </div>
            </div>
          )}

          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                  <span className="text-[11px] uppercase font-bold text-stone-400 block">Average Package</span>
                  <span className="text-lg font-black text-stone-900 mt-0.5 block">{college.avgPackage}</span>
                  <span className="text-[11px] text-emerald-600 font-semibold">Top Recruitment Rate</span>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                  <span className="text-[11px] uppercase font-bold text-stone-400 block">Highest Package</span>
                  <span className="text-lg font-black text-stone-900 mt-0.5 block">{college.highestPackage || '₹45 LPA'}</span>
                  <span className="text-[11px] text-stone-500">International / Core</span>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                  <span className="text-[11px] uppercase font-bold text-stone-400 block">Campus Area</span>
                  <span className="text-lg font-black text-stone-900 mt-0.5 block">{college.campusArea}</span>
                  <span className="text-[11px] text-stone-500">World-Class Infrastructure</span>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                  <span className="text-[11px] uppercase font-bold text-stone-400 block">Tuition Fees</span>
                  <span className="text-base font-bold text-stone-900 mt-0.5 block truncate">{college.tuitionFees}</span>
                  <span className="text-[11px] text-stone-500">Per Academic Year</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-2">About the Institution</h3>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {college.description}
                </p>
              </div>

              {/* Institutional Credentials */}
              <div className="border border-stone-200 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Key Credentials</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block">Accreditation:</span>
                    <span className="font-semibold text-stone-800">{college.accreditation}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Institutional Classification:</span>
                    <span className="font-semibold text-stone-800">{college.type}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Academic Category:</span>
                    <span className="font-semibold text-stone-800">{college.category}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: COURSES */}
          {activeTab === 'courses' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-900">Offered Degree Programs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {college.courses.map((course, idx) => (
                  <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2.5">
                    <BookOpen className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">{course}</h4>
                      <p className="text-[11px] text-stone-500">Full-time • Under Graduate / Post Graduate</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: FACILITIES */}
          {activeTab === 'facilities' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-900">Campus Facilities &amp; Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {college.facilities.map((fac, idx) => (
                  <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                    <span className="text-xs font-medium text-stone-800">{fac}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CONTACT */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-900">Admissions &amp; Contact Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={college.website}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 bg-stone-50 hover:bg-sky-50 rounded-2xl border border-stone-200 hover:border-sky-300 transition-colors block"
                >
                  <Globe className="w-5 h-5 text-sky-600 mb-2" />
                  <span className="text-[11px] font-bold uppercase text-stone-400 block">Website</span>
                  <span className="text-xs font-bold text-stone-800 truncate block">{college.website}</span>
                </a>

                <a
                  href={`mailto:${college.contactEmail}`}
                  className="p-4 bg-stone-50 hover:bg-sky-50 rounded-2xl border border-stone-200 hover:border-sky-300 transition-colors block"
                >
                  <Mail className="w-5 h-5 text-sky-600 mb-2" />
                  <span className="text-[11px] font-bold uppercase text-stone-400 block">Email Admissions</span>
                  <span className="text-xs font-bold text-stone-800 truncate block">{college.contactEmail}</span>
                </a>

                <a
                  href={`tel:${college.phone}`}
                  className="p-4 bg-stone-50 hover:bg-sky-50 rounded-2xl border border-stone-200 hover:border-sky-300 transition-colors block"
                >
                  <Phone className="w-5 h-5 text-sky-600 mb-2" />
                  <span className="text-[11px] font-bold uppercase text-stone-400 block">Phone</span>
                  <span className="text-xs font-bold text-stone-800 truncate block">{college.phone}</span>
                </a>
              </div>

              <div className="p-4 bg-stone-100 rounded-2xl border border-stone-200 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-stone-600 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-stone-800 block">Campus Address:</span>
                  <span className="text-stone-600">
                    {college.name}, {college.location.city}, {college.location.state} - {college.location.country}
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Bar */}
        <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-50/70 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(college.id)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-colors ${
                isCompared 
                  ? 'bg-sky-50 border-sky-300 text-sky-700' 
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {isCompared ? <Check className="w-4 h-4 text-sky-600" /> : <Layers className="w-4 h-4" />}
              <span>{isCompared ? 'Compared' : 'Add to Comparison'}</span>
            </button>
            <button
              onClick={() => onToggleShortlist(college.id)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-colors ${
                isShortlisted 
                  ? 'bg-rose-50 border-rose-200 text-rose-700' 
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${isShortlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenAddImages(college)}
              className="px-3.5 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-200 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add More Images
            </button>
            <a
              href={college.website}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-1.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Visit Official Site</span>
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* LIGHTBOX FOR FULL IMAGE PREVIEW */}
      {lightboxIndex !== null && currentLightboxImage && (
        <div 
          className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="absolute top-4 right-4 flex items-center gap-2 text-white z-10" onClick={(e) => e.stopPropagation()}>
            <span className="text-xs text-stone-400 font-medium mr-2">
              {lightboxIndex + 1} / {college.gallery.length}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div 
            className="max-w-4xl max-h-[80vh] flex flex-col items-center justify-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentLightboxImage.url}
              alt={currentLightboxImage.caption}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
            {currentLightboxImage.caption && (
              <p className="text-stone-300 text-sm font-medium mt-3 text-center px-4">
                {currentLightboxImage.caption}
              </p>
            )}
          </div>

          {/* Prev/Next buttons */}
          {college.gallery.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex - 1 + college.gallery.length) % college.gallery.length);
                }}
                className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex + 1) % college.gallery.length);
                }}
                className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      )}

    </div>
  );
}
