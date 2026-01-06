export interface ServiceData {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  content: string;
}

export interface OtherService {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: '1',
    title: 'Fire and Life Safety',
    slug: 'fire-and-life-safety',
    description: 'Comprehensive fire safety solutions for buildings and infrastructure',
    image: 'https://images.unsplash.com/photo-1624969862644-791f3dc98927?auto=format&fit=crop&w=1200&q=80',
    content: `Integration of Fire and Life Safety principles into urban planning and development of large-scale infrastructure projects is essential for embedding robust emergency response strategies, resilience and efficiency within the overall design and functionality of the development.

Our expert team brings extensive experience in developing and reviewing Fire and Life Safety Master Plan strategies, focusing on:

• Strategic Placement and sizing of Fire Stations: To ensure optimal locations for fire stations to maximize coverage for all assets and minimize response times while ensuring optimistic deployment of Emergency response personnel in the distribution as per requirements of NFPA 1710, Community Risk assessment and integrating fire safety resilience in the process.

• Sitewide Road Network Design: Planning efficient road layouts to facilitate seamless access for emergency vehicles and improve overall mobility while confirming to prescriptive requirements of the governing international and local building codes including NFPA 1, IBC, SBC, UAE Fire and Life Safety Code etc. Establishing alternate means of compliance by integrating suited Emergency Response Strategy to preserve the design intent and functionality of the development while achieving resilient Emergency response measures.

• Communication Strategy: Developing efficient Communication strategy to integrate assets with Emergency control centers and public safety answering points to enhance response duration, real time monitoring, multiple agency coordination, managing evacuation and increase survivability.

• Efficient plot allocation, Building Separation and Fire Spread Control: Establishing adequate spatial separation between buildings to prevent or minimize the risk of fire spread from one structure to another, thereby enhancing overall site fire safety and resilience.

• Fire Water Supply Systems: Designing reliable and accessible fire water infrastructure to support emergency firefighting operations.

These strategic decisions are made in the broader context of the development to balance safety and operational efficiency with cost-effectiveness. By integrating these considerations early in the planning process, we help optimize budgets while maintaining the essential delivery of emergency response services, safeguarding both life and property.`
  },
  {
    id: '2',
    title: 'Process Safety',
    slug: 'process-safety',
    description: 'Industrial process safety management and risk assessment',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    content: `Our Process Safety services help organizations manage and mitigate risks in industrial processes:
    
    • Hazard identification and risk assessment
    • Process safety management systems
    • Safety integrity level assessment
    • HAZOP studies
    • Emergency response planning
    • Safety case development`
  },
  {
    id: '3',
    title: 'Engineering Simulation',
    slug: 'engineering-simulation',
    description: 'Advanced computational modeling and simulation services',
    image: 'https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=1200&q=80',
    content: `We utilize advanced computational tools for engineering analysis and design:
    
    • Computational Fluid Dynamics (CFD)
    • Fire and smoke modeling
    • Structural fire engineering
    • Evacuation modeling
    • Heat and mass transfer analysis
    • Performance-based design validation`
  },
  {
    id: '4',
    title: 'Acoustics',
    slug: 'acoustics',
    description: 'Acoustic design and noise control solutions',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80',
    content: `Our Acoustics team provides comprehensive solutions for noise control and acoustic design:
    
    • Architectural acoustics
    • Environmental noise assessment
    • Building acoustics design
    • Sound insulation testing
    • Vibration control
    • Acoustic modeling and simulation`
  },
  {
    id: '5',
    title: 'Commissioning',
    slug: 'commissioning',
    description: 'Building systems commissioning and performance verification',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1200&q=80',
    content: `Our Commissioning services ensure optimal building system performance:
    
    • Building systems commissioning
    • Fire safety systems testing
    • Performance verification
    • Systems integration testing
    • Operation and maintenance planning
    • Documentation and training`
  },
  {
    id: '6',
    title: 'Construction Supervision',
    slug: 'construction-supervision',
    description: 'On-site construction supervision and quality assurance',
    image: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1200&q=80',
    content: `We provide comprehensive construction supervision services:
    
    • On-site safety supervision
    • Quality assurance and control
    • Installation verification
    • Compliance monitoring
    • Progress reporting
    • Technical support and guidance`
  }
];

// Convert serviceCategories to the expected ServiceData format
export const servicesData: ServiceData[] = serviceCategories.map(service => ({
  id: service.id,
  name: service.title,
  slug: service.slug,
  shortDescription: service.description,
  fullDescription: service.content,
  image: service.image
}));

export const otherServices = serviceCategories.map(service => ({
  id: service.id,
  title: service.title,
  description: service.description,
  image: service.image
}));

export const getServiceBySlug = (slug: string): ServiceCategory | undefined => {
  return serviceCategories.find(service => service.slug === slug);
};

export const getServiceDataBySlug = (slug: string): ServiceData | undefined => {
  return servicesData.find(service => service.slug === slug);
};

export const getRelatedServices = (count: number = 3): ServiceCategory[] => {
  return serviceCategories.sort(() => Math.random() - 0.5).slice(0, count);
};