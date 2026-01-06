import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { clientsApi, type ClientItem } from '../../services/api';
import styles from './Clients.module.css';

const Clients: React.FC = () => {
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [pageTitle, setPageTitle] = useState<string>('');
  const [pageSubtitle, setPageSubtitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await clientsApi.getClients();
        setClients(response.clients);
        setPageTitle(response.settings.page_title);
        setPageSubtitle(response.settings.page_subtitle);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="clients" className={styles.clients}>
      <div className={styles.container}>
        {!loading && (
          <motion.div 
            className={styles.sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <h2 className={styles.title}>{pageTitle}</h2>
            <p className={styles.subtitle}>
              {pageSubtitle}
            </p>
          </motion.div>
        )}
        
        {!loading && (
          <motion.div 
            className={styles.clientsGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {clients.map((client) => (
              <motion.div 
                key={client.id} 
                className={styles.clientCard}
                variants={itemVariants}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className={styles.logoContainer}>
                  <img 
                    src={`${API_BASE_URL}/${client.client_image}`}
                    alt={client.client_name}
                    className={styles.clientLogo}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Clients;