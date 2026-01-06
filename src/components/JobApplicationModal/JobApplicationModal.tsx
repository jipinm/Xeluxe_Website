import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Loader } from 'lucide-react';
import styles from './JobApplicationModal.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  jobId: string;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ isOpen, onClose, jobTitle, jobId }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    cover_letter: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setErrorMessage('Please upload a PDF or Word document');
        return;
      }

      if (file.size > maxSize) {
        setErrorMessage('File size must be less than 5MB');
        return;
      }

      setResume(file);
      setResumeFileName(file.name);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resume) {
      setErrorMessage('Please upload your resume/CV');
      return;
    }

    setSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const submitData = new FormData();
    submitData.append('job_id', jobId);
    submitData.append('full_name', formData.full_name);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('cover_letter', formData.cover_letter);
    submitData.append('resume', resume);

    try {
      const response = await fetch(`${API_BASE_URL}/public-api/apply-job.php`, {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
          resetForm();
        }, 2000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Failed to submit application');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      full_name: '',
      email: '',
      phone: '',
      cover_letter: '',
    });
    setResume(null);
    setResumeFileName('');
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  const handleClose = () => {
    if (!submitting) {
      resetForm();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div>
                <h2 className={styles.modalTitle}>Apply for Position</h2>
                <p className={styles.jobTitleText}>{jobTitle}</p>
              </div>
              <button className={styles.closeButton} onClick={handleClose} disabled={submitting}>
                <X size={24} />
              </button>
            </div>

            {submitStatus === 'success' ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <h3>Application Submitted Successfully!</h3>
                <p>Thank you for your interest. We'll review your application and get back to you soon.</p>
              </div>
            ) : (
              <form className={styles.modalForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="full_name" className={styles.formLabel}>
                    Full Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    className={styles.formInput}
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email Address <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.formInput}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>
                    Phone Number <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={styles.formInput}
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="resume" className={styles.formLabel}>
                    Resume/CV <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.fileUploadWrapper}>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      className={styles.fileInput}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      required
                      disabled={submitting}
                    />
                    <label htmlFor="resume" className={styles.fileLabel}>
                      <Upload size={20} />
                      {resumeFileName || 'Choose File (PDF, DOC, DOCX - Max 5MB)'}
                    </label>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="cover_letter" className={styles.formLabel}>
                    Cover Letter
                  </label>
                  <textarea
                    id="cover_letter"
                    name="cover_letter"
                    className={styles.formTextarea}
                    value={formData.cover_letter}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Tell us why you're a great fit for this position..."
                    disabled={submitting}
                  />
                </div>

                {errorMessage && (
                  <div className={styles.errorMessage}>{errorMessage}</div>
                )}

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={handleClose}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader className={styles.spinner} size={18} />
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobApplicationModal;
