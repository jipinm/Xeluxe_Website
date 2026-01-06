import React from 'react';
import { motion } from 'framer-motion';
import { Target, Flag, Shield, Scale, Network, FileText, Lightbulb, Trophy } from 'lucide-react';
import styles from './VisionMissionValuesSection.module.css';

// Animation variants for entrance effects only
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0
  }
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

interface VisionMissionValuesSectionProps {
  data?: {
    section_title: string;
    section_subtitle: string;
    vision_content: string;
    mission_content: string;
  };
  values?: Array<{
    id: number;
    title: string;
    subtitle: string;
    icon_path: string;
    view_order: number;
  }>;
}

const VisionMissionValuesSection: React.FC<VisionMissionValuesSectionProps> = ({ data, values = [] }) => {
  // Default values if API data is not available
  const defaultValues = [
    {
      id: 1,
      icon: <Shield size={24} />,
      title: 'Safety',
      subtitle: 'We prioritise life safety in everything we do.',
      view_order: 1
    },
    {
      id: 2,
      icon: <Scale size={24} />,
      title: 'Integrity',
      subtitle: 'We operate transparently and ethically, always.',
      view_order: 2
    },
    {
      id: 3,
      icon: <Network size={24} />,
      title: 'Collaboration',
      subtitle: 'We work side-by-side with clients and partners to achieve shared success.',
      view_order: 3
    },
    {
      id: 4,
      icon: <FileText size={24} />,
      title: 'Accountability',
      subtitle: 'We take ownership of outcomes and deliver on our promises.',
      view_order: 4
    },
    {
      id: 5,
      icon: <Lightbulb size={24} />,
      title: 'Innovation',
      subtitle: 'We apply advanced thinking to real-world challenges.',
      view_order: 5
    },
    {
      id: 6,
      icon: <Trophy size={24} />,
      title: 'Excellence',
      subtitle: 'We strive for the highest standards in every project and interaction.',
      view_order: 6
    }
  ];

  return (
    <section id="vision-mission-values" className={styles.visionMissionValues}>
      <div className={styles.container}>
        <motion.div 
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className={styles.title}>{data?.section_title || 'Vision, Mission & Values'}</h2>
          <p className={styles.subtitle}>
            {data?.section_subtitle || 'Our foundation principles that guide every decision, project, and partnership as we work to create a safer, more sustainable built environment.'}
          </p>
        </motion.div>
        
        <motion.div 
          className={styles.contentGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Left Column - Vision and Mission */}
          <motion.div className={styles.leftColumn} variants={itemVariants} transition={{ duration: 0.6, ease: "easeOut" }}>
            {/* Vision Card */}
            <div className={styles.contentCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconContainer}>
                  <Target size={16} />
                </div>
                <h3 className={styles.cardTitle}>Vision</h3>
              </div>
              <div 
                className={styles.cardContent}
                dangerouslySetInnerHTML={{ 
                  __html: data?.vision_content || '<p>To lead the way in creating a safer, more sustainable, and resilient built environment — where people, projects, and systems perform at their best.</p>' 
                }}
              />
            </div>

            {/* Mission Card */}
            <div className={styles.contentCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconContainer}>
                  <Flag size={16} />
                </div>
                <h3 className={styles.cardTitle}>Mission</h3>
              </div>
              <div 
                className={styles.cardContent}
                dangerouslySetInnerHTML={{ 
                  __html: data?.mission_content || '<p>To be the trusted and preferred specialist engineering company for our partners in the built environment, fostering lasting value by protecting life, preserving assets, and delivering resilient, high-performance solutions.</p>' 
                }}
              />
            </div>
          </motion.div>

          {/* Right Column - Values */}
          <motion.div className={styles.rightColumn} variants={itemVariants} transition={{ duration: 0.6, ease: "easeOut" }}>
            <div className={styles.contentCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Values</h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.valuesList}>
                  {values.length > 0 ? (
                    values.map((value) => (
                      <div key={value.id} className={styles.valueItem}>
                        <div className={styles.valueIcon}>
                          <img 
                            src={`${API_BASE_URL}/${value.icon_path}`} 
                            alt={value.title}
                            className={styles.valueImage}
                          />
                        </div>
                        <div className={styles.valueContent}>
                          <span className={styles.valueTitle}>{value.title}</span>
                          <span className={styles.valueDash}> — </span>
                          <span className={styles.valueDescription}>{value.subtitle}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    defaultValues.map((value) => (
                      <div key={value.id} className={styles.valueItem}>
                        <div className={styles.valueIcon}>
                          {value.icon}
                        </div>
                        <div className={styles.valueContent}>
                          <span className={styles.valueTitle}>{value.title}</span>
                          <span className={styles.valueDash}> — </span>
                          <span className={styles.valueDescription}>{value.subtitle}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMissionValuesSection;
