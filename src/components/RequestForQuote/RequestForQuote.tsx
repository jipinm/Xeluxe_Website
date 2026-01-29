import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import styles from './RequestForQuote.module.css';

const RequestForQuote: React.FC = () => {
  const handleClick = () => {
    window.location.href = '/contact-us#request-quote-form';
  };

  return (
    <div className={styles.rfqContainer}>
      <button 
        className={styles.rfqButton}
        onClick={handleClick}
        aria-label="Request for Quote"
      >
        <div className={styles.buttonContent}>
          <MessageSquare className={styles.icon} size={24} />
          <div className={styles.textContainer}>
            <span className={styles.mainText}>Request for Quote</span>
            <span className={styles.subText}>Get a free consultation</span>
          </div>
          <ArrowRight className={styles.arrowIcon} size={20} />
        </div>
      </button>
    </div>
  );
};

export default RequestForQuote;
