import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CareerDetails from '../components/CareerDetails/CareerDetails';
import styles from './CareerDetails.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const CareerDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [careerData, setCareerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    
    setLoading(true);
    fetch(`${API_BASE_URL}/public-api/career.php?slug=${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setCareerData(data.data);
          setError('');
        } else {
          setError('Career not found');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch career details');
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
        </div>
        <p className={styles.loadingText}>Loading career details...</p>
        <div className={styles.skeletonLayout}>
          <div className={styles.skeletonHeader}>
            <div className={styles.skeletonBadge}></div>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonMeta}>
              <div className={styles.skeletonMetaItem}></div>
              <div className={styles.skeletonMetaItem}></div>
              <div className={styles.skeletonMetaItem}></div>
            </div>
          </div>
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonSection}>
              <div className={styles.skeletonSectionTitle}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText} style={{ width: '90%' }}></div>
            </div>
            <div className={styles.skeletonSection}>
              <div className={styles.skeletonSectionTitle}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText} style={{ width: '85%' }}></div>
            </div>
            <div className={styles.skeletonSection}>
              <div className={styles.skeletonSectionTitle}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !careerData) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>{error || 'Career not found'}</h2>
        <a href="/careers" style={{ color: '#E26A23', marginTop: '2rem', display: 'inline-block' }}>
          Back to Careers
        </a>
      </div>
    );
  }

  // Transform API data to match component props
  const transformedCareer = {
    id: careerData.id.toString(),
    title: careerData.title,
    department: careerData.department.name,
    location: careerData.location.name,
    type: careerData.employment_type,
    experience: careerData.experience_level.name,
    salary: careerData.salary_range?.name,
    description: careerData.short_description,
    aboutRole: careerData.content || '',
    responsibilities: [],
    requirements: [],
    benefits: [],
    key_responsibilities: careerData.key_responsibilities || '',
    requirementsHtml: careerData.requirements || '',
    benefits_perks: careerData.benefits_perks || '',
  };

  // Sample career data - in a real app, this would come from an API or data store
  /* const sampleCareers = {
    'senior-fire-safety-engineer': {
      id: '1',
      title: 'Senior Fire Safety Engineer',
      department: 'Engineering',
      location: 'Dubai, UAE',
      type: 'Full-time',
      experience: '5+ years',
      salary: 'AED 15,000 - 25,000',
      description: 'Lead fire safety design and engineering projects for commercial and residential developments across the Middle East.',
      aboutRole: `We are seeking a highly skilled Senior Fire Safety Engineer to join our dynamic team in Dubai. In this role, you will be responsible for leading complex fire safety design projects, mentoring junior engineers, and ensuring compliance with international fire safety standards.

As a Senior Fire Safety Engineer, you will work on high-profile projects including commercial towers, residential complexes, and infrastructure developments. You will collaborate with architects, contractors, and regulatory authorities to deliver innovative fire safety solutions.

### What You'll Do
- Lead fire safety design and engineering for major projects
- Conduct fire risk assessments and code compliance reviews
- Mentor and guide junior engineering staff
- Interface with clients, architects, and regulatory bodies
- Develop innovative fire safety solutions for complex challenges
- Ensure all projects meet international safety standards

This is an excellent opportunity for an experienced professional looking to advance their career in a leading fire safety consultancy.`,
      responsibilities: [
        'Lead fire safety design for commercial and residential projects',
        'Conduct comprehensive fire risk assessments',
        'Prepare detailed fire safety reports and documentation',
        'Coordinate with project teams and stakeholders',
        'Review and approve junior engineer work',
        'Ensure compliance with local and international codes',
        'Present to clients and regulatory authorities',
        'Mentor and train junior engineering staff'
      ],
      requirements: [
        'Bachelor\'s degree in Fire Safety Engineering or related field',
        'Minimum 5 years of fire safety engineering experience',
        'Professional engineering license preferred',
        'Experience with international building codes (IBC, NFPA, BS, etc.)',
        'Proficiency in fire modeling software (FDS, CFAST)',
        'Strong communication and presentation skills',
        'Project management experience',
        'UAE experience preferred but not required'
      ],
      benefits: [
        'Competitive salary package (AED 15,000 - 25,000)',
        'Health insurance for employee and family',
        'Annual leave and flexible working arrangements',
        'Professional development and training opportunities',
        'Career advancement opportunities',
        'Performance-based bonuses',
        'Transportation allowance',
        'Relocation assistance for international candidates'
      ]
    },
    'project-manager-fire-systems': {
      id: '2',
      title: 'Project Manager - Fire Systems',
      department: 'Project Management',
      location: 'Riyadh, Saudi Arabia',
      type: 'Full-time',
      experience: '3-5 years',
      salary: 'SAR 12,000 - 18,000',
      description: 'Manage fire safety system installation projects from inception to completion, ensuring quality and timeline adherence.',
      aboutRole: `Join our growing team in Riyadh as a Project Manager specializing in fire safety systems. You will be responsible for managing multiple concurrent projects, coordinating with various stakeholders, and ensuring successful project delivery.

This role offers the opportunity to work on diverse projects across Saudi Arabia, including NEOM developments, infrastructure projects, and commercial buildings. You will be part of a collaborative team focused on delivering excellence in fire safety solutions.

### Project Scope
- Commercial and residential fire safety installations
- Industrial facility fire protection systems
- Infrastructure and transportation projects
- Healthcare and educational facility upgrades
- Heritage building preservation projects

The ideal candidate will have strong project management skills combined with technical knowledge of fire safety systems.`,
      responsibilities: [
        'Manage fire safety installation projects from start to finish',
        'Coordinate with contractors, suppliers, and clients',
        'Develop project schedules and monitor progress',
        'Ensure quality standards and safety compliance',
        'Manage project budgets and resource allocation',
        'Conduct regular site inspections and progress reviews',
        'Prepare project reports and client communications',
        'Resolve project issues and implement corrective actions'
      ],
      requirements: [
        'Project Management Professional (PMP) certification preferred',
        'Bachelor\'s degree in Engineering or related field',
        '3-5 years of project management experience',
        'Experience with fire safety systems and installations',
        'Strong organizational and communication skills',
        'Proficiency in project management software',
        'Arabic language skills preferred',
        'Valid driving license and willingness to travel'
      ],
      benefits: [
        'Competitive salary (SAR 12,000 - 18,000)',
        'Comprehensive health and dental insurance',
        'Annual performance bonuses',
        'Professional certification support',
        'Career development opportunities',
        'Company vehicle or transportation allowance',
        'Annual leave and sick leave benefits',
        'End-of-service benefits as per Saudi labor law'
      ]
    },
    'fire-safety-consultant': {
      id: '3',
      title: 'Fire Safety Consultant',
      department: 'Consulting',
      location: 'Abu Dhabi, UAE',
      type: 'Full-time',
      experience: '2-4 years',
      salary: 'AED 10,000 - 16,000',
      description: 'Provide expert fire safety consulting services to clients, including risk assessments and compliance reviews.',
      aboutRole: `We are looking for a motivated Fire Safety Consultant to join our Abu Dhabi office. In this role, you will work directly with clients to provide expert fire safety advice, conduct risk assessments, and ensure regulatory compliance.

This position offers excellent exposure to diverse projects and the opportunity to build strong client relationships. You will work with leading developers, architects, and government entities across the UAE.

### Client Engagement
- Direct interaction with high-profile clients
- Participation in design development meetings
- Regulatory authority liaison and approvals
- Expert witness and technical presentations
- Fire safety training and workshops
- Emergency planning and evacuation procedures

The role provides a clear path for career advancement within our consulting practice.`,
      responsibilities: [
        'Conduct fire safety risk assessments for various facilities',
        'Review architectural plans for fire safety compliance',
        'Prepare detailed fire safety reports and recommendations',
        'Liaise with regulatory authorities and approval bodies',
        'Provide technical support during construction phases',
        'Conduct fire safety audits and inspections',
        'Develop emergency evacuation plans',
        'Train client staff on fire safety procedures'
      ],
      requirements: [
        'Bachelor\'s degree in Fire Safety Engineering or related field',
        '2-4 years of fire safety consulting experience',
        'Strong knowledge of UAE building codes and regulations',
        'Experience with fire safety risk assessment methodologies',
        'Excellent written and verbal communication skills',
        'Client-facing experience and relationship building skills',
        'Professional certifications (CFPS, FIFireE) preferred',
        'UAE driving license preferred'
      ],
      benefits: [
        'Competitive salary package (AED 10,000 - 16,000)',
        'Health insurance for employee and dependents',
        'Annual performance-based salary increases',
        'Professional development and certification support',
        'Flexible working arrangements',
        'Annual leave and public holidays',
        'Mobile phone and laptop provision',
        'Client entertainment and networking opportunities'
      ]
    },
    'junior-fire-engineer': {
      id: '4',
      title: 'Junior Fire Engineer',
      department: 'Engineering',
      location: 'Dubai, UAE',
      type: 'Full-time',
      experience: '0-2 years',
      salary: 'AED 6,000 - 10,000',
      description: 'Support senior engineers in fire safety design projects and gain hands-on experience in the field.',
      aboutRole: `Start your career in fire safety engineering with our Dubai team. This entry-level position is perfect for recent graduates or early-career professionals looking to build expertise in fire safety design and engineering.

You will work closely with senior engineers on exciting projects across the Middle East, gaining exposure to cutting-edge fire safety technologies and design methodologies.

### Learning Opportunities
- Mentorship from experienced fire safety professionals
- Exposure to diverse project types and scales
- Training in fire modeling and simulation software
- Participation in site visits and inspections
- Client meeting participation and presentation skills
- Professional development and certification pathways

This role offers excellent growth potential within our expanding organization.`,
      responsibilities: [
        'Assist senior engineers with fire safety design calculations',
        'Prepare technical drawings and documentation',
        'Conduct research on fire safety codes and standards',
        'Support fire risk assessment activities',
        'Participate in site visits and inspections',
        'Maintain project files and documentation',
        'Assist with client presentations and meetings',
        'Learn and apply fire modeling software'
      ],
      requirements: [
        'Bachelor\'s degree in Engineering (any discipline)',
        'Strong interest in fire safety and building design',
        'Proficiency in CAD software (AutoCAD, Revit)',
        'Basic understanding of building codes and standards',
        'Strong analytical and problem-solving skills',
        'Good communication and teamwork abilities',
        'Willingness to learn and take on new challenges',
        'Fresh graduates welcome to apply'
      ],
      benefits: [
        'Competitive starting salary (AED 6,000 - 10,000)',
        'Comprehensive training and mentorship program',
        'Health insurance coverage',
        'Annual salary reviews and progression opportunities',
        'Professional development support',
        'Flexible working hours',
        'Team building and social activities',
        'Clear career advancement pathway'
      ]
    },
    'business-development-manager': {
      id: '5',
      title: 'Business Development Manager',
      department: 'Sales & Marketing',
      location: 'Multiple Locations',
      type: 'Full-time',
      experience: '3+ years',
      salary: 'Base + Commission',
      description: 'Drive business growth by identifying new opportunities and building relationships with key clients in the region.',
      aboutRole: `Lead our business development efforts across the Middle East region. This role combines strategic thinking with hands-on client relationship management to drive revenue growth and market expansion.

You will work with a diverse portfolio of clients including developers, contractors, government entities, and international corporations. The role offers significant earning potential through our competitive commission structure.

### Market Reach
- UAE, Saudi Arabia, Qatar, and Kuwait markets
- Commercial, residential, and infrastructure sectors
- Government and semi-government entities
- International corporations and joint ventures
- Architectural and engineering consultancies

Success in this role requires a combination of technical understanding and business acumen.`,
      responsibilities: [
        'Identify and develop new business opportunities',
        'Build and maintain relationships with key clients',
        'Prepare proposals and tender responses',
        'Conduct market research and competitive analysis',
        'Represent the company at industry events and conferences',
        'Collaborate with technical teams on solution development',
        'Negotiate contracts and commercial terms',
        'Achieve monthly and annual sales targets'
      ],
      requirements: [
        'Bachelor\'s degree in Business, Engineering, or related field',
        'Minimum 3 years of business development experience',
        'Experience in construction or engineering services industry',
        'Strong network in the Middle East construction sector',
        'Excellent communication and presentation skills',
        'Proven track record of achieving sales targets',
        'Cultural awareness and multi-language capabilities',
        'Willingness to travel frequently across the region'
      ],
      benefits: [
        'Competitive base salary plus commission structure',
        'High earning potential with uncapped commissions',
        'Company car or car allowance',
        'Travel and entertainment allowances',
        'Health insurance and life insurance',
        'Annual performance bonuses',
        'Professional development opportunities',
        'Stock option participation for senior performers'
      ]
    },
    'quality-assurance-specialist': {
      id: '6',
      title: 'Quality Assurance Specialist',
      department: 'Quality Control',
      location: 'Doha, Qatar',
      type: 'Full-time',
      experience: '2-3 years',
      salary: 'QAR 8,000 - 12,000',
      description: 'Ensure all fire safety systems meet quality standards and regulatory requirements through comprehensive testing and inspection.',
      aboutRole: `Join our quality assurance team in Doha to ensure the highest standards of fire safety system installation and performance. You will play a critical role in maintaining our reputation for excellence and regulatory compliance.

This position involves extensive fieldwork and interaction with installation teams, contractors, and regulatory inspectors. You will be responsible for quality control across major projects in Qatar.

### Quality Focus Areas
- Fire detection and alarm systems
- Suppression system installations
- Emergency lighting and signage
- Fire pump and water supply systems
- Smoke management and ventilation
- Integration and commissioning procedures

The role offers excellent exposure to cutting-edge fire safety technologies and systems.`,
      responsibilities: [
        'Conduct quality inspections of fire safety installations',
        'Develop and maintain quality control procedures',
        'Test and commission fire safety systems',
        'Prepare inspection reports and compliance documentation',
        'Coordinate with installation teams and contractors',
        'Ensure adherence to project specifications',
        'Interface with regulatory inspectors and authorities',
        'Identify and resolve quality-related issues'
      ],
      requirements: [
        'Bachelor\'s degree in Engineering or related technical field',
        '2-3 years of experience in quality assurance or inspection',
        'Knowledge of fire safety systems and components',
        'Familiarity with Qatar building codes and regulations',
        'Strong attention to detail and analytical skills',
        'Experience with testing and commissioning procedures',
        'Valid Qatar driving license',
        'Fluency in English and Arabic preferred'
      ],
      benefits: [
        'Competitive salary (QAR 8,000 - 12,000)',
        'Health insurance for employee and family',
        'Annual flight tickets to home country',
        'Accommodation allowance or company housing',
        'Transportation provided for site visits',
        'Training and certification opportunities',
        'Annual leave and public holidays',
        'End-of-service benefits as per Qatar labor law'
      ]
    }
  }; */

  return <CareerDetails career={transformedCareer} />;
};

export default CareerDetailsPage;
