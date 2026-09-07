import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { College, CollegeImage } from '../types';
import { CAMPUS_IMAGE_PRESETS } from '../data/initialColleges';
import { X, Upload, Link as LinkIcon, Image as ImageIcon, Sparkles, Trash2, CheckCircle2 } from 'lucide-react';

interface AddImageModalProps {
  college: College;
  isOpen: boolean;
  onClose: () => void;
  onAddImages: (collegeId: string, newImages: CollegeImage[], setAsCoverId?: string) => void;
  onRemoveImage?: (collegeId: string, imageId: string) => void;
  onSetCover?: (collegeId: string, imageId: string) => void;
}

export default function AddImageModal({
  college,
  isOpen,
  onClose,
  onAddImages,
  onRemoveImage,
  onSetCover,
}: AddImageModalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets' | 'manage'>('upload');
  const [urlInput, setUrlInput] = useState('');
  const [captionInput, setCaptionInput] = useState('');
  const [makeCover, setMakeCover] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(Array.from(files));
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const processFiles = (files: File[]) => {
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    if (validFiles.length === 0) {
      showToast('Please select valid image files (JPG, PNG, WebP).');
      return;
    }

    // Process multiple or single
    const readPromises = validFiles.map((file, idx) => {
      return new Promise<CollegeImage>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({
            id: `img-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 5)}`,
            url: event.target?.result as string,
            caption: captionInput.trim() || `${file.name.replace(/\.[^/.]+$/, "")} Campus View`,
            addedAt: new Date().toISOString()
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readPromises).then(newImages => {
      const coverId = makeCover && newImages.length > 0 ? newImages[0].id : undefined;
      onAddImages(college.id, newImages, coverId);
      setPreviewUrl(null);
      setCaptionInput('');
      setMakeCover(false);
      showToast(`Successfully added ${newImages.length} image(s)!`);
      setActiveTab('manage');
    });
  };

  const handleAddFromUrl = () => {
    if (!urlInput.trim()) {
      showToast('Please enter an image URL.');
      return;
    }

    const newImg: CollegeImage = {
      id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      url: urlInput.trim(),
      caption: captionInput.trim() || 'Campus Photography',
      addedAt: new Date().toISOString()
    };

    onAddImages(college.id, [newImg], makeCover ? newImg.id : undefined);
    setUrlInput('');
    setCaptionInput('');
    setMakeCover(false);
    setPreviewUrl(null);
    showToast('Image successfully added via URL!');
    setActiveTab('manage');
  };

  const handleSelectPreset = (preset: typeof CAMPUS_IMAGE_PRESETS[0]) => {
    const newImg: CollegeImage = {
      id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      url: preset.url,
      caption: preset.name,
      addedAt: new Date().toISOString()
    };

    onAddImages(college.id, [newImg]);
    showToast(`Added "${preset.name}" preset photo!`);
    setActiveTab('manage');
  };

  return (
    <div id="add-image-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden border border-stone-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-sky-100 text-sky-800 rounded-lg">
                <ImageIcon className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-semibold text-stone-900">Add Campus Images</h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Target College: <span className="font-medium text-stone-700">{college.name}</span> ({college.gallery.length} photos)
            </p>
          </div>
          <button
            id="close-add-image-modal-btn"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-xl transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notification Banner */}
        {toastMessage && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 flex items-center gap-2 text-emerald-800 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-100 px-6 bg-white gap-2 pt-2">
          <button
            id="tab-upload-file-btn"
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'upload'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload File
          </button>
          <button
            id="tab-upload-url-btn"
            onClick={() => setActiveTab('url')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'url'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            Paste Web URL
          </button>
          <button
            id="tab-presets-btn"
            onClick={() => setActiveTab('presets')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'presets'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Campus Presets
          </button>
          <button
            id="tab-manage-photos-btn"
            onClick={() => setActiveTab('manage')}
            className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs font-medium border-b-2 transition-colors ml-auto ${
              activeTab === 'manage'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Manage Gallery ({college.gallery.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: FILE UPLOAD */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-sky-500 bg-sky-50/50'
                    : 'border-stone-300 hover:border-sky-400 bg-stone-50/50 hover:bg-stone-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-stone-800">
                  Drop campus images here or click to browse
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Supports JPG, PNG, WebP up to 10MB per image. Multi-file upload supported.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Image Caption / Description (Optional)
                  </label>
                  <input
                    type="text"
                    value={captionInput}
                    onChange={(e) => setCaptionInput(e.target.value)}
                    placeholder="e.g. Modern Computer Science Lab, Student Center, Central Lawn"
                    className="w-full px-3.5 py-2 text-xs border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="set-cover-checkbox-upload"
                    type="checkbox"
                    checked={makeCover}
                    onChange={(e) => setMakeCover(e.target.checked)}
                    className="rounded-sm border-stone-300 text-sky-600 focus:ring-sky-500 h-4 w-4"
                  />
                  <label htmlFor="set-cover-checkbox-upload" className="text-xs text-stone-700 font-medium cursor-pointer">
                    Set this as the primary cover photo for this college
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: URL INPUT */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Image Direct URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => {
                      setUrlInput(e.target.value);
                      setPreviewUrl(e.target.value);
                    }}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="flex-1 px-3.5 py-2 text-xs border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <p className="text-[11px] text-stone-400 mt-1">
                  Paste any public image link (Unsplash, college site, Flickr, Wikimedia, etc.)
                </p>
              </div>

              {previewUrl && (
                <div className="border border-stone-200 rounded-xl overflow-hidden bg-stone-100 p-2">
                  <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                    Image Preview
                  </span>
                  <div className="aspect-video w-full rounded-lg overflow-hidden relative bg-stone-200">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={() => {
                        showToast('Unable to load image from URL. Check that the link is directly accessible.');
                      }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Caption / Area Name (Optional)
                </label>
                <input
                  type="text"
                  value={captionInput}
                  onChange={(e) => setCaptionInput(e.target.value)}
                  placeholder="e.g. Aerial Campus View, Auditorium"
                  className="w-full px-3.5 py-2 text-xs border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="set-cover-checkbox-url"
                  type="checkbox"
                  checked={makeCover}
                  onChange={(e) => setMakeCover(e.target.checked)}
                  className="rounded-sm border-stone-300 text-sky-600 focus:ring-sky-500 h-4 w-4"
                />
                <label htmlFor="set-cover-checkbox-url" className="text-xs text-stone-700 font-medium cursor-pointer">
                  Set this as the primary cover photo for this college
                </label>
              </div>

              <button
                id="submit-url-image-btn"
                onClick={handleAddFromUrl}
                disabled={!urlInput.trim()}
                className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
              >
                Add Image to College
              </button>
            </div>
          )}

          {/* TAB 3: PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-3">
              <p className="text-xs text-stone-600">
                Choose from verified high-resolution academic campus photography to enrich this college's gallery:
              </p>
              <div className="grid grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
                {CAMPUS_IMAGE_PRESETS.map((preset, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectPreset(preset)}
                    className="group border border-stone-200 hover:border-sky-500 rounded-xl overflow-hidden cursor-pointer bg-white transition-all hover:shadow-md"
                  >
                    <div className="aspect-video relative overflow-hidden bg-stone-100">
                      <img
                        src={preset.url}
                        alt={preset.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-1.5 left-1.5 text-[10px] font-medium bg-stone-900/80 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                        {preset.tag}
                      </span>
                    </div>
                    <div className="p-2.5 flex items-center justify-between">
                      <span className="text-xs font-medium text-stone-800 line-clamp-1">
                        {preset.name}
                      </span>
                      <span className="text-[11px] text-sky-600 font-semibold shrink-0 ml-1">
                        + Add
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MANAGE EXISTING PHOTOS */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-700">
                  Current Gallery Images ({college.gallery.length})
                </span>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="text-xs text-sky-600 hover:text-sky-800 font-semibold"
                >
                  + Add More Photos
                </button>
              </div>

              {college.gallery.length === 0 ? (
                <div className="text-center py-8 text-stone-400 text-xs">
                  No images in this gallery yet. Use the upload or presets tab above!
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1">
                  {college.gallery.map((img) => {
                    const isCover = college.coverImage === img.url || img.isCover;
                    return (
                      <div
                        key={img.id}
                        className={`border rounded-xl overflow-hidden bg-stone-50 flex flex-col relative group ${
                          isCover ? 'border-sky-500 ring-2 ring-sky-200' : 'border-stone-200'
                        }`}
                      >
                        <div className="aspect-video relative overflow-hidden bg-stone-200">
                          <img
                            src={img.url}
                            alt={img.caption || 'Campus photo'}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          {isCover && (
                            <span className="absolute top-2 left-2 text-[10px] font-semibold bg-sky-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                              Primary Cover
                            </span>
                          )}
                        </div>

                        <div className="p-2.5 flex-1 flex flex-col justify-between">
                          <p className="text-[11px] font-medium text-stone-700 line-clamp-1 mb-2">
                            {img.caption || 'Campus View'}
                          </p>

                          <div className="flex items-center justify-between gap-1 pt-1 border-t border-stone-200/60">
                            {!isCover && onSetCover && (
                              <button
                                onClick={() => onSetCover(college.id, img.id)}
                                className="text-[10px] font-semibold text-stone-600 hover:text-sky-700 hover:underline"
                              >
                                Set as Cover
                              </button>
                            )}
                            {isCover && (
                              <span className="text-[10px] text-emerald-600 font-medium">
                                Active Cover
                              </span>
                            )}
                            
                            {onRemoveImage && college.gallery.length > 1 && (
                              <button
                                onClick={() => onRemoveImage(college.id, img.id)}
                                className="p-1 text-stone-400 hover:text-red-600 rounded-md transition-colors ml-auto"
                                title="Delete image"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-100 bg-stone-50/50 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
