export interface ProjectData {
  id: string;
  title: string;
  location: string;
  images: string[];
  category: string;
  featured: boolean;
  displayOrder: number;
}

export const projectsData: ProjectData[] = [
  // Residential
  {
    id: '1',
    title: 'VAULT – TROJENA',
    location: 'NEOM, KSA',
    images: ['/images/projects/1.jpg'],
    category: 'Residential',
    featured: false,
    displayOrder: 1000
  },
  {
    id: '2',
    title: 'Mixed Use Building, B+G+2P+20 Bu Khadra',
    location: 'DUBAI, U.A.E',
    images: ['/images/projects/2.jpg'],
    category: 'Residential',
    featured: false,
    displayOrder: 1000
  },
  {
    id: '3',
    title: 'Residential Building, B+G+P+ 15 Nshama 62',
    location: 'DUBAI, U.A.E',
    images: ['/images/projects/3.jpg'],
    category: 'Residential',
    featured: true,
    displayOrder: 6
  },
  {
    id: '4',
    title: 'NEOM OXAGON VILLAGE RESIDENTIAL ASSETS',
    location: 'NEOM, KSA',
    images: ['/images/projects/4.jpg'],
    category: 'Residential',
    featured: false,
    displayOrder: 1000
  },
  {
    id: '5',
    title: 'RESIDENTIAL BUILDING G+2P+12 NAKHLAT DEIRA',
    location: 'DUBAI, U.A.E',
    images: ['/images/projects/5.jpg'],
    category: 'Residential',
    featured: false,
    displayOrder: 1000
  },
  {
    id: '6',
    title: 'CONSTRUCTION VILLAGE & OFFICES',
    location: 'AMAALA, KSA',
    images: ['/images/projects/6.jpg'],
    category: 'Residential',
    featured: false,
    displayOrder: 1000
  },
  
  // Aviation
  {
    id: '7',
    title: 'DUBAI AIRPORT',
    location: 'DUBAI, UAE',
    images: ['/images/projects/7.jpg'],
    category: 'Aviation',
    featured: true,
    displayOrder: 2
  },
  {
    id: '8',
    title: 'VELANAA INTERNATIONAL AIRPORT',
    location: 'MALDIVES',
    images: ['/images/projects/8.jpg'],
    category: 'Aviation',
    featured: false,
    displayOrder: 1000
  },
  {
    id: '9',
    title: 'EXECUJET DUBAI SOUTH,',
    location: 'DUBAI, UAE',
    images: ['/images/projects/9.jpg'],
    category: 'Aviation',
    featured: true,
    displayOrder: 5
  },
  {
    id: '10',
    title: 'NEOM BAY ARRIVAL LOUNGE NEOM,',
    location: 'KINGDOM OF SAUDI ARABIA',
    images: ['/images/projects/10.jpg'],
    category: 'Aviation',
    featured: false,
    displayOrder: 1000
  },
  
  // Health Care
  {
    id: '11',
    title: 'ADVANCE HEALTH CENTRE, OXAGON',
    location: 'NEOM, KSA',
    images: ['/images/projects/11.jpg'],
    category: 'Health Care',
    featured: false,
    displayOrder: 1000
  },
  {
    id: '12',
    title: 'AL WAKRA HOSPITAL',
    location: 'QATAR',
    images: ['/images/projects/12.jpg'],
    category: 'Health Care',
    featured: true,
    displayOrder: 3
  },
  {
    id: '13',
    title: 'CLINIC BUILDING, HEALTHCARE CITY',
    location: 'DUBAI, U.A.E',
    images: ['/images/projects/13.jpg'],
    category: 'Health Care',
    featured: false,
    displayOrder: 1000
  },
  
  // Hospitality
  {
    id: '14',
    title: 'SINDALAH, LUXURY ISLAND',
    location: 'NEOM, KSA',
    images: ['/images/projects/14.jpg'],
    category: 'Hospitality',
    featured: false,
    displayOrder: 1000
  },
  {
    id: '15',
    title: 'LAHEQ ISLAND,',
    location: 'RED SEA GLOBAL, KSA',
    images: ['/images/projects/15.jpg'],
    category: 'Hospitality',
    featured: true,
    displayOrder: 4
  },
  {
    id: '16',
    title: 'Hotel 14, Southern Dunes,',
    location: 'RED SEA GLOBAL KSA',
    images: ['/images/projects/16.jpg'],
    category: 'Hospitality',
    featured: false,
    displayOrder: 1000
  },
  {
    id: '17',
    title: 'DESERT ROCK,',
    location: 'RED SEA GLOBAL, KSA',
    images: ['/images/projects/17.jpg'],
    category: 'Hospitality',
    featured: false,
    displayOrder: 1000
  },
  {
    id: '18',
    title: 'HOTEL APARTMENTS G+7 DUBAI LAND,',
    location: 'DUBAI, UAE',
    images: ['/images/projects/18.jpg'],
    category: 'Hospitality',
    featured: false,
    displayOrder: 1000
  },
  {
    id: '19',
    title: 'AL WASL GATE,',
    location: 'DUBAI, UAE',
    images: ['/images/projects/19.jpg'],
    category: 'Hospitality',
    featured: false,
    displayOrder: 1000
  },
  {
    id: '20',
    title: 'SLOPE RESIDENCE HOTEL',
    location: 'NEOM, KSA',
    images: ['/images/projects/20.jpg'],
    category: 'Hospitality',
    featured: false,
    displayOrder: 1000
  },
  {
    id: '21',
    title: 'SKI VILLAGE, TROJENA',
    location: 'NEOM, KSA',
    images: ['/images/projects/21a.jpg', '/images/projects/21b.jpg'],
    category: 'Hospitality',
    featured: false,
    displayOrder: 1000
  },
  {
    id: '22',
    title: 'THE BOW, TROJENA',
    location: 'NEOM, KSA',
    images: ['/images/projects/22a.jpg', '/images/projects/22b.jpg'],
    category: 'Hospitality',
    featured: false,
    displayOrder: 1000
  },
  
  // Transport
  {
    id: '25',
    title: 'TIME TRAVEL TUNNEL, TROJENA,',
    location: 'NEOM, KSA',
    images: ['/images/projects/25.jpg'],
    category: 'Transport',
    featured: false,
    displayOrder: 1000
  },
  {
    id: '26',
    title: 'THE MIRAGE VISITOR CENTER, TROJENA',
    location: 'NEOM, KSA',
    images: ['/images/projects/26.jpg'],
    category: 'Transport',
    featured: false,
    displayOrder: 1000
  },
  {
    id: '27',
    title: 'METRO STATIONs – TERMINAL 1 & 3',
    location: 'DUBAI, UAE',
    images: ['/images/projects/27a.jpg', '/images/projects/27b.jpg'],
    category: 'Transport',
    featured: false,
    displayOrder: 1000
  },
  
  // Commercial
  {
    id: '29',
    title: 'MALL OF QATAR',
    location: 'QATAR',
    images: ['/images/projects/29.jpg'],
    category: 'Commercial',
    featured: false,
    displayOrder: 1000
  },
  {
    id: '30',
    title: 'ADNEC-Y TOWER',
    location: 'ABU DHABI, UAE',
    images: ['/images/projects/30.jpg'],
    category: 'Commercial',
    featured: false,
    displayOrder: 1000
  },
  
  // Education
  {
    id: '31',
    title: 'INNOVATION CAMPUS, OXAGON',
    location: 'NEOM, KSA',
    images: ['/images/projects/31.jpg'],
    category: 'Education',
    featured: true,
    displayOrder: 1
  },
  {
    id: '32',
    title: 'NEOM COMMUNITY SCHOOL',
    location: 'NEOM, KSA',
    images: ['/images/projects/32.jpg'],
    category: 'Education',
    featured: false,
    displayOrder: 1000
  },
  
  // Master planning
  {
    id: '33',
    title: 'DETAILED MASTER PLAN OF OXAGON',
    location: 'NEOM, KSA',
    images: ['/images/projects/33.jpg'],
    category: 'Master planning',
    featured: false,
    displayOrder: 1000
  },
  {
    id: '34',
    title: 'TROJENA, MOUNTAINS',
    location: 'NEOM, KSA',
    images: ['/images/projects/34.jpg'],
    category: 'Master planning',
    featured: false,
    displayOrder: 1000
  },
  {
    id: '35',
    title: 'LAHEQ ISLAND',
    location: 'RED SEA GLOBAL, KSA',
    images: ['/images/projects/35.jpg'],
    category: 'Master planning',
    featured: false,
    displayOrder: 1000
  }
];

export const getProjectsByCategory = () => {
  const categories = ['Residential', 'Aviation', 'Health Care', 'Hospitality', 'Transport', 'Commercial', 'Education', 'Master planning'];
  return categories.reduce((acc, category) => {
    acc[category] = projectsData.filter(project => project.category === category);
    return acc;
  }, {} as Record<string, ProjectData[]>);
};

// Legacy functions for backward compatibility (since project detail pages still exist)
export const getProjectBySlug = (slug: string): ProjectData | undefined => {
  // Since we don't have slugs anymore, try to find by id or return undefined
  console.warn(`getProjectBySlug called with slug: ${slug}, but slugs are no longer supported`);
  return undefined;
};

export const getRelatedProjects = (currentSlug: string, limit: number = 3): ProjectData[] => {
  // Return first few projects as related projects
  console.warn(`getRelatedProjects called with currentSlug: ${currentSlug}, returning first ${limit} projects`);
  return projectsData.slice(0, limit);
};
