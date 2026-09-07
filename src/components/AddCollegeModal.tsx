import { useState, useRef, ChangeEvent, DragEvent, FormEvent } from 'react';
import { College, CollegeCategory, CollegeType, CollegeImage } from '../types';
import { CAMPUS_IMAGE_PRESETS } from '../data/initialColleges';
import { X, Upload, Plus, Trash2, CheckCircle2, Building2, MapPin, Award, BookOpen, AlertCircle } from 'lucide-react';

interface AddCollegeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCollege: (college: College) => void;
}

const COMMON_FACILITIES = [
  'High-Speed Wi-Fi',
  'Incubation & Startup Hub',
  'Smart Classrooms',
  'Hostel (Boys & Girls)',
  'Sports Complex & Gymnasium',
  'Central Digital Library',
  'Robotics & AI Labs',
  'Fleet Transport',
  'Auditorium & Amphitheatre',
  'Food Court & Cafeteria'
];

export default function AddCollegeModal({ isOpen, onClose, onAddCollege }: AddCollegeModalProps) {
  // Form State
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [country, setCountry] = useState('India');
  const [type, setType] = useState<CollegeType>('Autonomous');
  const [category, setCategory] = useState<CollegeCategory>('Engineering & Tech');
  const [established, setEstablished] = useState<number>(2005);
  const [accreditation, setAccreditation] = useState('NAAC A++ | NBA Tier-1');
  const [rankingNumber, setRankingNumber] = useState<string>('45');
  const [rankingBadge, setRankingBadge] = useState('NIRF Top 50 Ranked');
  const [avgPackage, setAvgPackage] = useState('₹8.5 LPA');
  const [highestPackage, setHighestPackage] = useState('₹45.0 LPA');
  const [campusArea, setCampusArea] = useState('120 Acres');
  const [tuitionFees, setTuitionFees] = useState('₹1,10,000 / yr');
  const [website, setWebsite] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  
  // Courses state
  const [courses, setCourses] = useState<string[]>([
    'B.Tech Artificial Intelligence & Data Science',
    'B.Tech Computer Science & Engineering',
    'B.E Electronics & Communication'
  ]);
  const [newCourseInput, setNewCourseInput] = useState('');

  // Facilities state
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([
    'High-Speed Wi-Fi',
    'Smart Classrooms',
    'Hostel (Boys & Girls)',
    'Central Digital Library'
  ]);
  const [customFacility, setCustomFacility] = useState('');

  // Image handling
  const [coverImageUrl, setCoverImageUrl] = useState<string>(CAMPUS_IMAGE_PRESETS[0].url);
  const [additionalImages, setAdditionalImages] = useState<CollegeImage[]>([]);
  const [imageInputMode, setImageInputMode] = useState<'upload' | 'url' | 'presets'>('upload');
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle Cover file upload
  const handleCoverFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCoverImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCoverImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Additional gallery images upload
  const handleGalleryFilesUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      (Array.from(files) as File[]).forEach((file: File, idx: number) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setAdditionalImages(prev => [
              ...prev,
              {
                id: `gallery-upload-${Date.now()}-${idx}`,
                url: event.target?.result as string,
                caption: file.name.replace(/\.[^/.]+$/, ""),
                addedAt: new Date().toISOString()
              }
            ]);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const addCourse = () => {
    if (newCourseInput.trim() && !courses.includes(newCourseInput.trim())) {
      setCourses([...courses, newCourseInput.trim()]);
      setNewCourseInput('');
    }
  };

  const removeCourse = (idxToRemove: number) => {
    setCourses(courses.filter((_, idx) => idx !== idxToRemove));
  };

  const toggleFacility = (facility: string) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(selectedFacilities.filter(f => f !== facility));
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  const addCustomFacility = () => {
    if (customFacility.trim() && !selectedFacilities.includes(customFacility.trim())) {
      setSelectedFacilities([...selectedFacilities, customFacility.trim()]);
      setCustomFacility('');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg('Please enter the College Name.');
      return;
    }
    if (!city.trim() || !stateName.trim()) {
      setErrorMsg('Please enter the City and State location.');
      return;
    }
    if (!coverImageUrl) {
      setErrorMsg('Please provide a campus cover image.');
      return;
    }

    const collegeId = `college-${Date.now()}`;
    const cleanShortName = shortName.trim() || name.split(' ').slice(0, 3).map(w => w[0]).join('');

    // Prepare gallery: cover image + any additional uploaded images
    const galleryItems: CollegeImage[] = [
      {
        id: `img-cover-${Date.now()}`,
        url: coverImageUrl,
        caption: `${cleanShortName} Main Campus`,
        isCover: true,
        addedAt: new Date().toISOString()
      },
      ...additionalImages
    ];

    const newCollege: College = {
      id: collegeId,
      name: name.trim(),
      shortName: cleanShortName,
      location: {
        city: city.trim(),
        state: stateName.trim(),
        country: country.trim() || 'India'
      },
      type,
      category,
      established: Number(established) || 2000,
      accreditation: accreditation.trim() || 'Recognized by UGC / AICTE',
      ranking: {
        rankNumber: rankingNumber ? parseInt(rankingNumber, 10) : undefined,
        badge: rankingBadge.trim() || 'Accredited Institution'
      },
      rating: 4.5,
      reviewCount: 1,
      coverImage: coverImageUrl,
      gallery: galleryItems,
      courses: courses.length > 0 ? courses : ['General Degree Programs'],
      avgPackage: avgPackage.trim() || '₹6.0 LPA',
      highestPackage: highestPackage.trim() || '₹25.0 LPA',
      campusArea: campusArea.trim() || '50 Acres',
      tuitionFees: tuitionFees.trim() || '₹90,000 / yr',
      facilities: selectedFacilities,
      website: website.trim().startsWith('http') ? website.trim() : (website.trim() ? `https://${website.trim()}` : 'https://example.edu'),
      contactEmail: contactEmail.trim() || `info@${cleanShortName.toLowerCase().replace(/\s+/g, '')}.edu`,
      phone: phone.trim() || '+91 44 1234 5678',
      description: description.trim() || `${name.trim()} is an accredited educational institution providing high standard academic instruction, modern campus infrastructure, and student placement training.`,
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    onAddCollege(newCollege);
    onClose();
  };

  return (
    <div id="add-college-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-3xl my-8 shadow-2xl flex flex-col overflow-hidden border border-stone-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/70">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-sky-100 text-sky-800 rounded-xl">
              <Building2 className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-stone-900">Enlist New College</h2>
              <p className="text-xs text-stone-500">
                Register a new college profile with campus images, courses, and placement stats
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="bg-rose-50 border-b border-rose-200 px-6 py-2.5 flex items-center gap-2 text-rose-800 text-xs font-medium">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[75vh] space-y-6">
          
          {/* SECTION 1: BASIC INFORMATION */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> 1. Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  College Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  placeholder="e.g. Sri Sairam Institute of Technology"
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Short Name / Acronym
                </label>
                <input
                  type="text"
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  placeholder="e.g. SSIT Chennai"
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CollegeCategory)}
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                >
                  <option value="Engineering & Tech">Engineering & Tech</option>
                  <option value="Management">Management / B-School</option>
                  <option value="Medical & Health">Medical & Health Sciences</option>
                  <option value="Arts & Sciences">Arts & Sciences</option>
                  <option value="Multi-Disciplinary">Multi-Disciplinary University</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Institution Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as CollegeType)}
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                >
                  <option value="Autonomous">Autonomous</option>
                  <option value="Government / Public">Government / Public</option>
                  <option value="Private">Private</option>
                  <option value="Deemed University">Deemed University</option>
                  <option value="Institute of National Importance">Institute of National Importance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Established Year
                </label>
                <input
                  type="number"
                  value={established}
                  onChange={(e) => setEstablished(Number(e.target.value))}
                  min={1800}
                  max={2030}
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: LOCATION */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> 2. Location
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  City <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Chennai"
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  State / Region <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  placeholder="e.g. Tamil Nadu"
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="India"
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: CAMPUS IMAGES (USER'S EXPLICIT FEATURE) */}
          <div className="border border-sky-200 bg-sky-50/30 rounded-xl p-4.5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-sky-600" /> 3. Campus Images &amp; Cover Photo
                </h3>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Upload local photos, paste web URLs, or choose curated campus photography presets.
                </p>
              </div>

              {/* Mode switch */}
              <div className="flex bg-white rounded-lg p-1 border border-stone-200 text-xs">
                <button
                  type="button"
                  onClick={() => setImageInputMode('upload')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    imageInputMode === 'upload' ? 'bg-sky-600 text-white' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setImageInputMode('url')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    imageInputMode === 'url' ? 'bg-sky-600 text-white' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Web Link
                </button>
                <button
                  type="button"
                  onClick={() => setImageInputMode('presets')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    imageInputMode === 'presets' ? 'bg-sky-600 text-white' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Presets
                </button>
              </div>
            </div>

            {/* Mode: Upload */}
            {imageInputMode === 'upload' && (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors bg-white ${
                  dragActive ? 'border-sky-500 bg-sky-50' : 'border-stone-300 hover:border-sky-400'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverFileUpload}
                  className="hidden"
                />
                <Upload className="w-7 h-7 text-sky-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-stone-800">
                  Drop main campus cover photo here, or click to browse
                </p>
                <p className="text-[11px] text-stone-400 mt-0.5">Supports PNG, JPG, WebP</p>
              </div>
            )}

            {/* Mode: URL */}
            {imageInputMode === 'url' && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="flex-1 px-3.5 py-2 text-xs border border-stone-300 rounded-lg bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customUrlInput.trim()) {
                        setCoverImageUrl(customUrlInput.trim());
                      }
                    }}
                    className="px-3.5 py-2 bg-sky-600 text-white text-xs font-semibold rounded-lg hover:bg-sky-700"
                  >
                    Set Cover
                  </button>
                </div>
              </div>
            )}

            {/* Mode: Presets */}
            {imageInputMode === 'presets' && (
              <div className="grid grid-cols-4 gap-2">
                {CAMPUS_IMAGE_PRESETS.slice(0, 4).map((preset, i) => (
                  <div
                    key={i}
                    onClick={() => setCoverImageUrl(preset.url)}
                    className={`border rounded-lg overflow-hidden cursor-pointer relative group ${
                      coverImageUrl === preset.url ? 'ring-2 ring-sky-600 border-sky-600' : 'border-stone-200'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-16 object-cover"
                    />
                    <div className="p-1 bg-white text-[10px] truncate font-medium text-stone-700">
                      {preset.tag}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Active Cover Preview */}
            {coverImageUrl && (
              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-stone-200">
                <img
                  src={coverImageUrl}
                  alt="Cover preview"
                  referrerPolicy="no-referrer"
                  className="w-24 h-16 object-cover rounded-lg shrink-0 border border-stone-200"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-sky-700 uppercase">Primary Cover Selected</span>
                  <p className="text-xs text-stone-600 truncate mt-0.5">{coverImageUrl}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setCoverImageUrl('')}
                  className="p-1 text-stone-400 hover:text-red-600"
                  title="Remove cover"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Additional Campus Gallery Upload */}
            <div className="pt-2 border-t border-sky-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-stone-700">
                  Additional Campus Photos ({additionalImages.length} attached)
                </span>
                <button
                  type="button"
                  onClick={() => galleryFileInputRef.current?.click()}
                  className="text-xs font-semibold text-sky-700 hover:text-sky-800 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Gallery Photos
                </button>
                <input
                  ref={galleryFileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryFilesUpload}
                  className="hidden"
                />
              </div>

              {additionalImages.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {additionalImages.map((img, idx) => (
                    <div key={img.id} className="relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-stone-200 group">
                      <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setAdditionalImages(additionalImages.filter((_, i) => i !== idx))}
                        className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* SECTION 4: RANKING, FEES & PLACEMENT */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> 4. Rankings &amp; Placement Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Accreditation
                </label>
                <input
                  type="text"
                  value={accreditation}
                  onChange={(e) => setAccreditation(e.target.value)}
                  placeholder="e.g. NAAC A++ | NBA"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  NIRF Rank / Position
                </label>
                <input
                  type="number"
                  value={rankingNumber}
                  onChange={(e) => setRankingNumber(e.target.value)}
                  placeholder="e.g. 35"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Average Package
                </label>
                <input
                  type="text"
                  value={avgPackage}
                  onChange={(e) => setAvgPackage(e.target.value)}
                  placeholder="e.g. ₹7.5 LPA"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Highest Package
                </label>
                <input
                  type="text"
                  value={highestPackage}
                  onChange={(e) => setHighestPackage(e.target.value)}
                  placeholder="e.g. ₹42.0 LPA"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Campus Land Area
                </label>
                <input
                  type="text"
                  value={campusArea}
                  onChange={(e) => setCampusArea(e.target.value)}
                  placeholder="e.g. 150 Acres"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Tuition Fee Range
                </label>
                <input
                  type="text"
                  value={tuitionFees}
                  onChange={(e) => setTuitionFees(e.target.value)}
                  placeholder="e.g. ₹1,20,000 / yr"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Ranking Badge Text
                </label>
                <input
                  type="text"
                  value={rankingBadge}
                  onChange={(e) => setRankingBadge(e.target.value)}
                  placeholder="e.g. NIRF Top 50 Engineering"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* SECTION 5: COURSES & FACILITY TAGS */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> 5. Academic Courses &amp; Campus Facilities
            </h3>
            
            {/* Courses tag input */}
            <div className="space-y-2 mb-4">
              <label className="block text-xs font-semibold text-stone-700">
                Key Degree Programs &amp; Branches
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCourseInput}
                  onChange={(e) => setNewCourseInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCourse();
                    }
                  }}
                  placeholder="Type course name and press Add (e.g. B.Tech Computer Science)"
                  className="flex-1 px-3.5 py-2 text-xs border border-stone-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={addCourse}
                  className="px-4 py-2 bg-stone-800 text-white text-xs font-semibold rounded-lg hover:bg-stone-900"
                >
                  Add Course
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {courses.map((c, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-stone-100 text-stone-800 rounded-md border border-stone-200"
                  >
                    {c}
                    <button
                      type="button"
                      onClick={() => removeCourse(idx)}
                      className="text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Facilities pills */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700">
                Campus Infrastructure Facilities
              </label>
              <div className="flex flex-wrap gap-2">
                {COMMON_FACILITIES.map((fac) => {
                  const isSelected = selectedFacilities.includes(fac);
                  return (
                    <button
                      type="button"
                      key={fac}
                      onClick={() => toggleFacility(fac)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                        isSelected
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '} {fac}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={customFacility}
                  onChange={(e) => setCustomFacility(e.target.value)}
                  placeholder="Add custom facility (e.g. Olympic Track, Wind Tunnel)"
                  className="flex-1 px-3.5 py-1.5 text-xs border border-stone-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={addCustomFacility}
                  className="px-3 py-1.5 text-xs font-semibold bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300"
                >
                  + Add
                </button>
              </div>
            </div>

          </div>

          {/* SECTION 6: CONTACT & DESCRIPTION */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
              6. Contact &amp; Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Official Website</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://college.edu"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Admissions Email</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="admissions@college.edu"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 44 2251 0000"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">College Overview / Highlights</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Key highlights, historical background, notable alumni, or industry ties..."
                className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg"
              />
            </div>
          </div>

          {/* Form Footer */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              Save &amp; Enlist College
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
