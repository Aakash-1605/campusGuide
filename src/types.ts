export interface CollegeImage {
  id: string;
  url: string;
  caption: string;
  isCover?: boolean;
  addedAt?: string;
}

export type CollegeType = 
  | 'Autonomous' 
  | 'Government / Public' 
  | 'Private' 
  | 'Deemed University' 
  | 'Institute of National Importance';

export type CollegeCategory = 
  | 'Engineering & Tech' 
  | 'Management' 
  | 'Medical & Health' 
  | 'Arts & Sciences' 
  | 'Multi-Disciplinary';

export interface College {
  id: string;
  name: string;
  shortName: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  type: CollegeType;
  category: CollegeCategory;
  established: number;
  accreditation: string;
  ranking: {
    rankNumber?: number;
    badge: string;
  };
  rating: number;
  reviewCount: number;
  coverImage: string;
  gallery: CollegeImage[];
  courses: string[];
  avgPackage: string;
  highestPackage?: string;
  campusArea: string;
  tuitionFees: string;
  facilities: string[];
  website: string;
  contactEmail: string;
  phone: string;
  description: string;
  isCustom?: boolean;
  createdAt: string;
}

export type SortOption = 
  | 'rank-asc' 
  | 'rating-desc' 
  | 'name-asc' 
  | 'package-desc' 
  | 'newest';

export type ViewMode = 'grid' | 'list';

export interface FilterState {
  searchQuery: string;
  category: string;
  type: string;
  state: string;
  onlyShortlisted: boolean;
  sortBy: SortOption;
}
