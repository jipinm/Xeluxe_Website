import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Clock, Users, ArrowRight, ChevronDown } from 'lucide-react';
import styles from './Careers.module.css';
import {
  fetchPublicDepartments,
  fetchPublicLocations,
  fetchPublicExperienceLevels,
  fetchPublicCareers,
} from '../../services/api';
import type {
  PublicDepartment,
  PublicLocation,
  PublicExperienceLevel,
  PublicCareer,
  PublicCareersResponse
} from '../../services/api';

// API-driven careers data


interface FilterState {
  department_id: number | '';
  location_id: number | '';
  experience_level_id: number | '';
}


const Careers: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [departments, setDepartments] = useState<PublicDepartment[]>([]);
  const [locations, setLocations] = useState<PublicLocation[]>([]);
  const [experienceLevels, setExperienceLevels] = useState<PublicExperienceLevel[]>([]);
  const [careers, setCareers] = useState<PublicCareer[]>([]);
  const [pagination, setPagination] = useState<PublicCareersResponse['pagination'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    department_id: '',
    location_id: '',
    experience_level_id: '',
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPublicDepartments().then(setDepartments);
    fetchPublicLocations().then(setLocations);
    fetchPublicExperienceLevels().then(setExperienceLevels);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchPublicCareers({
      department_id: filters.department_id ? Number(filters.department_id) : undefined,
      location_id: filters.location_id ? Number(filters.location_id) : undefined,
      experience_level_id: filters.experience_level_id ? Number(filters.experience_level_id) : undefined,
      page: page,
      limit: 12,
    }).then(res => {
      setCareers(res.data);
      setPagination(res.pagination);
      setLoading(false);
    }).catch(err => {
      console.error('Error fetching careers:', err);
      setCareers([]);
      setLoading(false);
    });
  }, [filters, page]);

  const handleFilterChange = (filterType: keyof FilterState, value: string | number) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setPage(1);
  };

  const handleFilterSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPage(1);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50
    },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };


  return (
    <section id="careers" className={styles.careers} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.jobsSection}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2
            className={styles.sectionTitle}
            variants={cardVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Open Positions
          </motion.h2>

          <form className={styles.filterSection} onSubmit={handleFilterSubmit}>
            <div className={styles.filterGroup}>
              <select
                className={styles.filterSelect}
                value={filters.department_id}
                onChange={e => handleFilterChange('department_id', e.target.value ? Number(e.target.value) : '')}
              >
                <option value="">Department...</option>
                {departments.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
              <ChevronDown className={styles.selectIcon} size={16} />
            </div>

            <div className={styles.filterGroup}>
              <select
                className={styles.filterSelect}
                value={filters.location_id}
                onChange={e => handleFilterChange('location_id', e.target.value ? Number(e.target.value) : '')}
              >
                <option value="">Location...</option>
                {locations.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
              <ChevronDown className={styles.selectIcon} size={16} />
            </div>

            <div className={styles.filterGroup}>
              <select
                className={styles.filterSelect}
                value={filters.experience_level_id}
                onChange={e => handleFilterChange('experience_level_id', e.target.value ? Number(e.target.value) : '')}
              >
                <option value="">Experience Level...</option>
                {experienceLevels.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
              <ChevronDown className={styles.selectIcon} size={16} />
            </div>

            {/* Only Department, Location, Experience Level filters are shown */}

            <button className={styles.filterButton} type="submit">
              FILTER
            </button>
          </form>

          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}>
                <div className={styles.spinnerRing}></div>
                <div className={styles.spinnerRing}></div>
                <div className={styles.spinnerRing}></div>
              </div>
              <p className={styles.loadingText}>Loading careers...</p>
              <div className={styles.jobsGrid}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={styles.skeletonCard}>
                    <div className={styles.skeletonBadge}></div>
                    <div className={styles.skeletonTitle}></div>
                    <div className={styles.skeletonMeta}>
                      <div className={styles.skeletonMetaItem}></div>
                      <div className={styles.skeletonMetaItem}></div>
                      <div className={styles.skeletonMetaItem}></div>
                    </div>
                    <div className={styles.skeletonText}></div>
                    <div className={styles.skeletonText} style={{ width: '90%' }}></div>
                    <div className={styles.skeletonText} style={{ width: '80%' }}></div>
                    <div className={styles.skeletonButton}></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.jobsGrid}>
              {careers.length === 0 ? (
                <div className={styles.noResults}>No careers found.</div>
              ) : careers.map((job) => (
                <motion.div
                  key={job.id}
                  variants={cardVariants}
                  className={styles.jobCard}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                >
                  <div className={styles.jobHeader}>
                    <div className={styles.jobBadge}>{job.department.name}</div>
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                    <div className={styles.jobMeta}>
                      <div className={styles.metaItem}>
                        <MapPin size={14} />
                        <span>{job.location.name}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <Clock size={14} />
                        <span>{job.employment_type}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <Users size={14} />
                        <span>{job.experience_level.name}</span>
                      </div>
                    </div>
                  </div>
                  <p className={styles.jobDescription}>{job.short_description}</p>
                  <div className={styles.jobRequirements}>
                    <h4>Salary Range:</h4>
                    <span>{job.salary_range?.name || '-'}</span>
                  </div>
                  <a
                    href={`/career-details/${job.slug}`}
                    className={styles.applyButton}
                  >
                    View Details
                    <ArrowRight size={16} className={styles.arrow} />
                  </a>
                </motion.div>
              ))}
            </div>
          )}

          {pagination && pagination.total_pages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageButton}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>
              <span className={styles.pageInfo}>
                Page {pagination.current_page} of {pagination.total_pages}
              </span>
              <button
                className={styles.pageButton}
                disabled={page === pagination.total_pages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Careers;