import { College } from '../types';
import { X, Check, Trash2, ArrowRight } from 'lucide-react';

interface CollegeCompareModalProps {
  colleges: College[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveFromCompare: (id: string) => void;
  onSelectCollege: (college: College) => void;
}

export default function CollegeCompareModal({
  colleges,
  isOpen,
  onClose,
  onRemoveFromCompare,
  onSelectCollege,
}: CollegeCompareModalProps) {
  if (!isOpen) return null;

  return (
    <div id="compare-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-5xl my-6 shadow-2xl flex flex-col overflow-hidden border border-stone-200 max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/70">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Compare Colleges</h2>
            <p className="text-xs text-stone-500">
              Side-by-side comparison of institutional rankings, placements, tuition, and campus facilities.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-x-auto overflow-y-auto flex-1">
          {colleges.length === 0 ? (
            <div className="text-center py-12 text-stone-500 text-sm">
              No colleges selected for comparison. Click "Compare" on any college card to add them here!
            </div>
          ) : (
            <div className="min-w-[650px]">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="p-3 w-44 font-bold text-stone-400 uppercase text-[10px]">Criteria</th>
                    {colleges.map((c) => (
                      <th key={c.id} className="p-3 font-bold text-stone-900 align-top">
                        <div className="relative group">
                          <img
                            src={c.coverImage}
                            alt={c.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-24 object-cover rounded-xl mb-2"
                          />
                          <button
                            onClick={() => onRemoveFromCompare(c.id)}
                            className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-black/80 text-white rounded-md transition-colors"
                            title="Remove from comparison"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-bold text-stone-900 block text-xs line-clamp-1">{c.name}</span>
                          <span className="text-[11px] text-stone-500 font-normal">{c.location.city}, {c.location.state}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-100">
                  {/* Category */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Category</td>
                    {colleges.map(c => (
                      <td key={c.id} className="p-3 font-medium text-stone-800">{c.category}</td>
                    ))}
                  </tr>

                  {/* Institution Type */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Type</td>
                    {colleges.map(c => (
                      <td key={c.id} className="p-3 font-medium text-stone-800">{c.type}</td>
                    ))}
                  </tr>

                  {/* Ranking */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Rank &amp; Accreditation</td>
                    {colleges.map(c => (
                      <td key={c.id} className="p-3 font-medium text-stone-800">
                        <span className="inline-block bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[11px] mb-1">
                          {c.ranking.badge}
                        </span>
                        <span className="block text-[11px] text-stone-500">{c.accreditation}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Rating */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Rating</td>
                    {colleges.map(c => (
                      <td key={c.id} className="p-3 font-medium text-stone-800">
                        ⭐ {c.rating} / 5.0 ({c.reviewCount} reviews)
                      </td>
                    ))}
                  </tr>

                  {/* Avg Package */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Avg Placement</td>
                    {colleges.map(c => (
                      <td key={c.id} className="p-3 font-bold text-emerald-700 text-sm">{c.avgPackage}</td>
                    ))}
                  </tr>

                  {/* Highest Package */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Highest Package</td>
                    {colleges.map(c => (
                      <td key={c.id} className="p-3 font-semibold text-stone-800">{c.highestPackage || 'N/A'}</td>
                    ))}
                  </tr>

                  {/* Tuition Fees */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Tuition Fees</td>
                    {colleges.map(c => (
                      <td key={c.id} className="p-3 font-medium text-stone-800">{c.tuitionFees}</td>
                    ))}
                  </tr>

                  {/* Campus Area */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Campus Area</td>
                    {colleges.map(c => (
                      <td key={c.id} className="p-3 font-medium text-stone-800">{c.campusArea}</td>
                    ))}
                  </tr>

                  {/* Photos count */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Campus Photos</td>
                    {colleges.map(c => (
                      <td key={c.id} className="p-3 font-medium text-stone-800">
                        {c.gallery.length} verified photos
                      </td>
                    ))}
                  </tr>

                  {/* Facilities */}
                  <tr>
                    <td className="p-3 font-semibold text-stone-500 bg-stone-50/50">Key Facilities</td>
                    {colleges.map(c => (
                      <td key={c.id} className="p-3 font-medium text-stone-800">
                        <div className="flex flex-wrap gap-1">
                          {c.facilities.slice(0, 4).map((f, idx) => (
                            <span key={idx} className="bg-stone-100 text-stone-700 text-[10px] px-1.5 py-0.5 rounded">
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Action */}
                  <tr>
                    <td className="p-3 bg-stone-50/50"></td>
                    {colleges.map(c => (
                      <td key={c.id} className="p-3">
                        <button
                          onClick={() => {
                            onClose();
                            onSelectCollege(c);
                          }}
                          className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 shadow-xs transition-colors"
                        >
                          View Full Details <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
