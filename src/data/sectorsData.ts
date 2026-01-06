import { projectsData } from './projectsData';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// Helper to pick a representative image from projects by category
const pickImage = (category: string) => {
  const found = projectsData.find(p => (p.category || '').toLowerCase() === category.toLowerCase() && p.images && p.images.length);
  return found ? found.images[0] : '/images/projects/1.jpg';
};

export interface SectorData {
  name: string;
  slug: string;
  description: string;
  image: string;
}

export const sectorsData: SectorData[] = [
  {
    name: 'Aviation',
    slug: slugify('Aviation'),
    image: pickImage('Aviation'),
    description:
      'We deliver aviation-sector expertise across terminals, airside interfaces, and operational facilities. Our work covers fire strategy, emergency egress, smoke control, and complex MEP coordination for passenger terminals and support infrastructure. We integrate operational safety with passenger flow modelling and ensure compliance with international aviation standards while facilitating phased construction to keep airport operations live.'
  },
  {
    name: 'Mission Critical',
    slug: slugify('Mission Critical'),
    image: pickImage('Commercial'),
    description:
      'Mission-critical facilities demand redundancy, maintainability, and resilient MEP systems. We design fire safety and life-safety systems that complement uptime objectives, including segregated infrastructure, tiered power resilience, and tailored detection/suppression strategies. Our approach balances compartmentation, spatial planning and fire-fighting access with the strict operational needs of data centres and critical control rooms.'
  },
  {
    name: 'Roads & Tunnels',
    slug: slugify('Roads & Tunnels'),
    image: pickImage('Transport'),
    description:
      'Tunnel and underground infrastructure requires specialist ventilation, smoke control and evacuation strategies. We prepare detection, suppression and wayfinding designs for vehicular and pedestrian tunnels, coordinate with tunnel control systems, and perform scenario-based modelling to validate egress times and system responses under degraded conditions.'
  },
  {
    name: 'Healthcare',
    slug: slugify('Healthcare'),
    image: pickImage('Health Care'),
    description:
      'Healthcare environments need infection-aware life-safety design combined with safe patient movement. We provide compartmentation strategies, fire and smoke zoning, and coordinated evacuation guidance that respects clinical pathways. We work closely with clinical teams to ensure design decisions support patient care, critical services and regulatory compliance.'
  },
  {
    name: 'Residential',
    slug: slugify('Residential'),
    image: pickImage('Residential'),
    description:
      'Residential developments range from single dwellings to high-rise towers. Our services include building fire strategy, façade risk assessment, stair and refuge design, and systems coordination. We apply a performance-led approach to ensure occupant safety while supporting efficient building layouts and developer delivery programmes.'
  },
  {
    name: 'Mixed-Used',
    slug: slugify('Mixed-Used'),
    image: pickImage('Residential'),
    description:
      'Mixed-use projects combine commercial, residential and public spaces where interfaces create complex life-safety challenges. We resolve occupancy mixing, vertical circulation, shared services and phased handover sequencing to produce practical and code-compliant solutions across multi-asset campuses.'
  },
  {
    name: 'Hospitality',
    slug: slugify('Hospitality'),
    image: pickImage('Hospitality'),
    description:
      'Hotels, resorts and leisure assets require discreet, guest-focused safety solutions. We design egress strategies, staff/guest evacuation procedures, and integrated systems that protect guests while maintaining the hospitality experience. Our designs consider compartmentation, kitchen and services risks, and high-occupancy events planning.'
  },
  {
    name: 'Mass Transit',
    slug: slugify('Mass Transit'),
    image: pickImage('Transport'),
    description:
      'Mass transit stations and rail infrastructure need co-ordinated life-safety and passenger movement strategies. We provide station layout reviews, smoke control, platform evacuation analysis and cross-system coordination to ensure safe, reliable passenger journeys.'
  },
  {
    name: 'Fitout',
    slug: slugify('Fitout'),
    image: pickImage('Commercial'),
    description:
      'Interior fit-out projects require early-stage fire strategy to manage materials, compartmentation and means of escape. We assist designers and contractors with pragmatic solutions that meet regulatory requirements while supporting design intent and material selections.'
  },
  {
    name: 'Commercial',
    slug: slugify('Commercial'),
    image: pickImage('Commercial'),
    description:
      'Commercial buildings and offices demand robust life-safety engineering that balances occupant density with servicing and vertical transport. We design integrated building services, stair core strategies and risk-based approaches for atria and open-plan arrangements.'
  },
  {
    name: 'Marina',
    slug: slugify('Marina'),
    image: pickImage('Hospitality'),
    description:
      'Marinas and waterfront developments present unique hazards including fuel and firewater access. We advise on fire access planning, fuel risk mitigation, and safe berthing arrangements to ensure safe waterfront operations.'
  },
  {
    name: 'Industrial',
    slug: slugify('Industrial'),
    image: pickImage('Hospitality'),
    description:
      'Industrial and process facilities require specialist approaches to hazardous areas, suppression systems and process safety interfaces. We provide hazardous area classification, fire suppression design and integration with process control systems.'
  }
];

export default sectorsData;
