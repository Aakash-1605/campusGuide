import { College } from '../types';

export const INITIAL_COLLEGES: College[] = [
  {
    id: 'sairam-eng',
    name: 'Sri Sairam Engineering College',
    shortName: 'SEC Chennai',
    location: {
      city: 'Chennai',
      state: 'Tamil Nadu',
      country: 'India'
    },
    type: 'Autonomous',
    category: 'Engineering & Tech',
    established: 1995,
    accreditation: 'NAAC A++ | NBA Tier-1',
    ranking: {
      rankNumber: 108,
      badge: 'NIRF Engineering Ranked'
    },
    rating: 4.6,
    reviewCount: 1420,
    coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        id: 'sec-img-1',
        url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Main Academic Quadrangle & Administrative Complex',
        isCover: true
      },
      {
        id: 'sec-img-2',
        url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
        caption: 'Central High-Tech Computing & AI Innovation Center'
      },
      {
        id: 'sec-img-3',
        url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
        caption: 'Central Digital Library & Research Archive'
      },
      {
        id: 'sec-img-4',
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        caption: 'Robotics & Embedded Systems Research Laboratory'
      }
    ],
    courses: [
      'B.Tech Information Technology',
      'B.Tech Artificial Intelligence & Data Science',
      'B.E Computer Science & Engineering',
      'B.E Electronics & Communication',
      'M.Tech Computer Science'
    ],
    avgPackage: '₹6.8 LPA',
    highestPackage: '₹42.0 LPA',
    campusArea: '300 Acres',
    tuitionFees: '₹85,000 - ₹1,40,000 / yr',
    facilities: [
      'High-Speed Wi-Fi',
      'Incubation & Startup Hub',
      'Smart Classrooms',
      'Hostel (Boys & Girls)',
      'Sports Complex & Gymnasium',
      'Fleet Transport (100+ Buses)'
    ],
    website: 'https://sairam.edu.in',
    contactEmail: 'admissions@sairam.edu.in',
    phone: '+91 44 2251 2222',
    description: 'A premier autonomous engineering institution affiliated with Anna University, known for stellar placements in tech majors, industry-sponsored labs, and high academic discipline.',
    createdAt: '2025-01-10T10:00:00.000Z'
  },
  {
    id: 'iit-madras',
    name: 'Indian Institute of Technology Madras',
    shortName: 'IIT Madras',
    location: {
      city: 'Chennai',
      state: 'Tamil Nadu',
      country: 'India'
    },
    type: 'Institute of National Importance',
    category: 'Engineering & Tech',
    established: 1959,
    accreditation: 'Institute of National Importance (INI)',
    ranking: {
      rankNumber: 1,
      badge: 'NIRF #1 Overall & Engineering'
    },
    rating: 4.9,
    reviewCount: 3890,
    coverImage: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        id: 'iitm-1',
        url: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
        caption: 'Gajendra Circle & Lush Green Heritage Campus',
        isCover: true
      },
      {
        id: 'iitm-2',
        url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
        caption: 'IITM Research Park & Incubator'
      },
      {
        id: 'iitm-3',
        url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80',
        caption: 'Central Library & Reading Halls'
      }
    ],
    courses: [
      'B.Tech Computer Science & Engineering',
      'B.Tech Electrical Engineering',
      'B.S Data Science & Applications',
      'Dual Degree Quantum Tech',
      'M.S / Ph.D Research'
    ],
    avgPackage: '₹21.4 LPA',
    highestPackage: '₹1.31 Cr PA',
    campusArea: '630 Acres',
    tuitionFees: '₹2,10,000 / yr',
    facilities: [
      'Supercomputing Facility',
      'IITM Research Park',
      'Olympic Swimming Pool',
      'Deer Park Campus Sanctuary',
      'Open Air Theatre',
      'High-Speed 10Gbps Network'
    ],
    website: 'https://www.iitm.ac.in',
    contactEmail: 'deanac@iitm.ac.in',
    phone: '+91 44 2257 8000',
    description: 'Consistently ranked India’s #1 educational institution, world-renowned for trailblazing research, the pioneering IITM Research Park, and top international engineering talent.',
    createdAt: '2025-01-11T10:00:00.000Z'
  },
  {
    id: 'bits-pilani',
    name: 'Birla Institute of Technology and Science, Pilani',
    shortName: 'BITS Pilani',
    location: {
      city: 'Pilani',
      state: 'Rajasthan',
      country: 'India'
    },
    type: 'Deemed University',
    category: 'Engineering & Tech',
    established: 1964,
    accreditation: 'Institute of Eminence (IoE)',
    ranking: {
      rankNumber: 20,
      badge: 'NIRF Top 20 University'
    },
    rating: 4.8,
    reviewCount: 2150,
    coverImage: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        id: 'bits-1',
        url: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Historic Clock Tower & Birla Mandir view',
        isCover: true
      },
      {
        id: 'bits-2',
        url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
        caption: 'Modern Interactive Lecture Theatres'
      },
      {
        id: 'bits-3',
        url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
        caption: 'Innovation Sandbox & Maker Lab'
      }
    ],
    courses: [
      'B.E Computer Science',
      'B.E Electrical & Electronics',
      'M.Sc Economics & Math Dual Degree',
      'MBA in Business Analytics'
    ],
    avgPackage: '₹19.5 LPA',
    highestPackage: '₹60.7 LPA',
    campusArea: '328 Acres',
    tuitionFees: '₹5,40,000 / yr',
    facilities: [
      'Practice School (PS-I & PS-II)',
      'Zero Attendance Policy Freedom',
      'Vibrant Cultural Festivals (Oasis)',
      '24/7 Library & Labs',
      'Student Activity Centre (SAC)'
    ],
    website: 'https://www.bits-pilani.ac.in',
    contactEmail: 'admissions@pilani.bits-pilani.ac.in',
    phone: '+91 1596 242 205',
    description: 'Renowned for meritocratic admissions through BITSAT, a flexible zero-mandatory attendance system, and an unparalleled startup alumni network.',
    createdAt: '2025-01-12T10:00:00.000Z'
  },
  {
    id: 'iim-ahmedabad',
    name: 'Indian Institute of Management Ahmedabad',
    shortName: 'IIM Ahmedabad',
    location: {
      city: 'Ahmedabad',
      state: 'Gujarat',
      country: 'India'
    },
    type: 'Institute of National Importance',
    category: 'Management',
    established: 1961,
    accreditation: 'EQUIS & AACSB Accredited',
    ranking: {
      rankNumber: 1,
      badge: 'NIRF #1 Management in India'
    },
    rating: 4.9,
    reviewCount: 1600,
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        id: 'iima-1',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Louis Kahn Plaza Iconic Exposed-Brick Architecture',
        isCover: true
      },
      {
        id: 'iima-2',
        url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
        caption: 'Case Study Seminar Room & Syndicate Discussions'
      }
    ],
    courses: [
      'Post Graduate Programme in Management (PGP / MBA)',
      'PGP in Food and Agri-Business (PGP-FABM)',
      'e-PGP Hybrid Executive Degree'
    ],
    avgPackage: '₹34.3 LPA',
    highestPackage: '₹1.15 Cr PA',
    campusArea: '102 Acres',
    tuitionFees: '₹25,00,000 (Total PGP)',
    facilities: [
      'Vikram Sarabhai Central Library',
      'CIIE.CO Startup Incubator',
      'Heritage Red-Brick Dorms',
      'Sports & Recreation Hub',
      'High-Tech Audio Visual Syndicate Rooms'
    ],
    website: 'https://www.iima.ac.in',
    contactEmail: 'admission@iima.ac.in',
    phone: '+91 79 7152 4000',
    description: 'The golden standard of business education in Asia, famous for its rigorous case-study pedagogy, Louis Kahn exposed-brick architecture, and global leadership alumni.',
    createdAt: '2025-01-13T10:00:00.000Z'
  },
  {
    id: 'aiims-delhi',
    name: 'All India Institute of Medical Sciences, New Delhi',
    shortName: 'AIIMS New Delhi',
    location: {
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India'
    },
    type: 'Institute of National Importance',
    category: 'Medical & Health',
    established: 1956,
    accreditation: 'National Apex Medical Institute',
    ranking: {
      rankNumber: 1,
      badge: 'NIRF #1 Medical Institution'
    },
    rating: 4.9,
    reviewCount: 3100,
    coverImage: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        id: 'aiims-1',
        url: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80',
        caption: 'AIIMS Main Hospital & Medical Academic Block',
        isCover: true
      },
      {
        id: 'aiims-2',
        url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
        caption: 'Advanced Clinical Simulation & Surgical Suites'
      }
    ],
    courses: [
      'MBBS (Bachelor of Medicine & Surgery)',
      'MD / MS Specialty Disciplines',
      'DM / MCh Super Specialty Fellowships',
      'B.Sc Nursing (Honours)'
    ],
    avgPackage: '₹18.0 LPA (Resident Doctors)',
    highestPackage: '₹35.0 LPA',
    campusArea: '115 Acres',
    tuitionFees: '₹1,628 (Nominal Gov Fee)',
    facilities: [
      'Trauma Centre of International Repute',
      'Advanced Robotic Surgery Systems',
      'National Medical Library (NML)',
      'Subsidized Health Facilities',
      'Multidisciplinary Research Labs'
    ],
    website: 'https://www.aiims.edu',
    contactEmail: 'registrar@aiims.edu',
    phone: '+91 11 2658 8500',
    description: 'The pinnacle of medical science education and healthcare in India, pioneering breakthrough clinical treatments and healthcare research.',
    createdAt: '2025-01-14T10:00:00.000Z'
  },
  {
    id: 'st-stephens-delhi',
    name: "St. Stephen's College, University of Delhi",
    shortName: "St. Stephen's",
    location: {
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India'
    },
    type: 'Autonomous',
    category: 'Arts & Sciences',
    established: 1881,
    accreditation: 'NAAC A+ Grade',
    ranking: {
      rankNumber: 14,
      badge: 'NIRF Top Colleges'
    },
    rating: 4.7,
    reviewCount: 1100,
    coverImage: 'https://images.unsplash.com/photo-1568792923760-d70635a89fa8?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        id: 'stephens-1',
        url: 'https://images.unsplash.com/photo-1568792923760-d70635a89fa8?auto=format&fit=crop&w=1200&q=80',
        caption: 'Historic North Campus Red Brick Colonnades',
        isCover: true
      },
      {
        id: 'stephens-2',
        url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Classical Literature & Philosophy Library'
      }
    ],
    courses: [
      'B.A. (Hons) Economics',
      'B.A. (Hons) English Literature',
      'B.A. (Hons) History',
      'B.Sc. (Hons) Mathematics & Physics'
    ],
    avgPackage: '₹10.5 LPA',
    highestPackage: '₹31.0 LPA',
    campusArea: '30 Acres',
    tuitionFees: '₹42,000 / yr',
    facilities: [
      'College Hall & Chapel',
      'Junior Combination Room (JCR)',
      'Cricket & Tennis Grounds',
      'Extensive Archival Library'
    ],
    website: 'https://www.ststephens.edu',
    contactEmail: 'admissions@ststephens.edu',
    phone: '+91 11 2766 7271',
    description: 'One of the oldest and most prestigious liberal arts institutions in India, celebrated for producing diplomat leaders, civil servants, authors, and economists.',
    createdAt: '2025-01-15T10:00:00.000Z'
  },
  {
    id: 'vit-vellore',
    name: 'Vellore Institute of Technology',
    shortName: 'VIT Vellore',
    location: {
      city: 'Vellore',
      state: 'Tamil Nadu',
      country: 'India'
    },
    type: 'Deemed University',
    category: 'Engineering & Tech',
    established: 1984,
    accreditation: 'NAAC A++ | IoE',
    ranking: {
      rankNumber: 11,
      badge: 'NIRF #11 Engineering'
    },
    rating: 4.5,
    reviewCount: 4200,
    coverImage: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        id: 'vit-1',
        url: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=1200&q=80',
        caption: 'Technology Tower & Main Plaza',
        isCover: true
      },
      {
        id: 'vit-2',
        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        caption: 'Smart Classrooms with Fully Flexible Credit System'
      }
    ],
    courses: [
      'B.Tech CSE with AI / Cyber Security',
      'B.Tech Electronics & Communication',
      'B.Tech Mechanical Engineering',
      'MCA & Integrated M.Tech'
    ],
    avgPackage: '₹9.2 LPA',
    highestPackage: '₹1.02 Cr PA',
    campusArea: '372 Acres',
    tuitionFees: '₹1,98,000 - ₹3,00,000 / yr',
    facilities: [
      'Fully Flexible Credit System (FFCS)',
      'Indoor Sports Stadium',
      'Food Courts & Modern Hostels',
      'Riviera International Cultural Fest'
    ],
    website: 'https://vit.ac.in',
    contactEmail: 'ugadmission@vit.ac.in',
    phone: '+91 416 220 2020',
    description: 'A global private technological university known for massive recruitment drives with 900+ companies, diverse international exchange programs, and state-of-the-art infrastructure.',
    createdAt: '2025-01-16T10:00:00.000Z'
  },
  {
    id: 'stanford-univ',
    name: 'Stanford University',
    shortName: 'Stanford',
    location: {
      city: 'Stanford',
      state: 'California',
      country: 'USA'
    },
    type: 'Private',
    category: 'Multi-Disciplinary',
    established: 1885,
    accreditation: 'WASC Senior College & University Commission',
    ranking: {
      rankNumber: 3,
      badge: 'QS World #3'
    },
    rating: 4.9,
    reviewCount: 5200,
    coverImage: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        id: 'stanford-1',
        url: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Main Quad & Stanford Memorial Church',
        isCover: true
      },
      {
        id: 'stanford-2',
        url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Engineering Quad & Packard Electrical Building'
      }
    ],
    courses: [
      'B.S Computer Science (AI Track)',
      'B.S Symbolic Systems',
      'MBA (Stanford Graduate School of Business)',
      'Bioengineering & Neuroscience'
    ],
    avgPackage: '$145,000 / yr',
    highestPackage: '$280,000 / yr',
    campusArea: '8,180 Acres',
    tuitionFees: '$62,484 / yr',
    facilities: [
      'Silicon Valley Venture Ecosystem',
      'SLAC National Accelerator Laboratory',
      'Cantor Arts Center',
      'Hoover Tower & Memorial Library'
    ],
    website: 'https://www.stanford.edu',
    contactEmail: 'admission@stanford.edu',
    phone: '+1 650 723 2091',
    description: 'At the beating heart of Silicon Valley, Stanford is the cradle of technological revolution and entrepreneurship, empowering founders and transformative researchers.',
    createdAt: '2025-01-17T10:00:00.000Z'
  }
];

export const CAMPUS_IMAGE_PRESETS = [
  {
    name: 'Modern University Glass Architecture',
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    tag: 'Campus Quad'
  },
  {
    name: 'Historic Academic Clock Tower & Lawns',
    url: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=80',
    tag: 'Heritage'
  },
  {
    name: 'High-Tech AI & Robotics Laboratory',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    tag: 'Research Lab'
  },
  {
    name: 'Grand Central Academic Library & Study Commons',
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    tag: 'Library'
  },
  {
    name: 'Tiered Lecture Theatre & Amphitheatre',
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    tag: 'Auditorium'
  },
  {
    name: 'Collaborative Student Innovation Hub',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    tag: 'Incubator'
  },
  {
    name: 'Lush Botanical Campus Pathways',
    url: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
    tag: 'Green Campus'
  },
  {
    name: 'Modern Engineering & Tech Center',
    url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    tag: 'Engineering'
  }
];
