import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Instagram, Youtube, MapPin, Mail } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { servicesApi } from '../../services/api';
import type { ServiceCategory } from '../../services/api';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

  useEffect(() => {
    const fetchServiceCategories = async () => {
      try {
        const response = await servicesApi.getServiceCategories();
        if (response.success && response.data) {
          setServiceCategories(response.data);
        }
      } catch (error) {
        console.error('Error fetching service categories:', error);
      }
    };

    fetchServiceCategories();
  }, []);

  // Navigate to appropriate route based on services count (same logic as Services component)
  const handleServiceClick = (category: ServiceCategory) => {
    if (category.services.length === 1) {
      // Single service: navigate to /service/{service_slug}
      navigate(`/service/${category.services[0].slug}`);
    } else {
      // Multiple services: navigate to first service
      navigate(`/service/${category.services[0].slug}`);
    }
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Services', href: '/services' },
    { name: 'Insights', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact Us', href: '/contact-us' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: <Linkedin size={20} />, href: settings?.social_linkedin || '#' },
    { name: 'Twitter', icon: <Twitter size={20} />, href: settings?.social_twitter || '#' },
    { name: 'Facebook', icon: <Facebook size={20} />, href: settings?.social_facebook || '#' },
    { name: 'Instagram', icon: <Instagram size={20} />, href: settings?.social_instagram || '#' },
    { name: 'YouTube', icon: <Youtube size={20} />, href: settings?.social_youtube || '#' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.companySection}>
            <div className={styles.logo}>
              <img 
                src={settings?.footer_logo_url ? `${API_BASE_URL}/${settings.footer_logo_url}` : '/logo.png'} 
                alt={settings?.logo_alt_text || 'Xeluxe Fire & Safety'} 
                className={styles.logoImage} 
              />
              <div className={styles.tagline}>
                <div>{settings?.logo_tagline_1 || 'Engineering a Sustainable'}</div>
                <div>{settings?.logo_tagline_2 || 'and Resilient Future - Together'}</div>
              </div>
            </div>
            
            <p className={styles.companyDescription}>
              {settings?.footer_text || 'Your trusted partner in fire safety solutions. We provide comprehensive fire protection services with cutting-edge technology and unmatched expertise.'}
            </p>
            
            
          </div>
          
          <div className={styles.linksSection}>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <ul className={styles.linksList}>
              {quickLinks.map((link, index) => (
                <li key={index} className={styles.linkItem}>
                  <a href={link.href} className={styles.link}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.servicesSection}>
            <h4 className={styles.sectionTitle}>Our Services</h4>
            <ul className={styles.linksList}>
              {serviceCategories.map((category) => (
                <li key={category.id} className={styles.linkItem}>
                  <a 
                    href="#" 
                    className={styles.link}
                    onClick={(e) => {
                      e.preventDefault();
                      handleServiceClick(category);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {category.category_name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.contactSection}>
            <h4 className={styles.sectionTitle}>Contact Info</h4>
            
            <div className={styles.contactItem}>
              <MapPin className={styles.contactIcon} size={16} />
              <div className={styles.contactText}>
                <p>Dubai (HQ), Cork, Dammam, Abu Dhabi, Kerala</p>
              </div>
            </div>
            
            <div className={styles.contactItem}>
              <Mail className={styles.contactIcon} size={16} />
              <div className={styles.contactText}>
                <p>{settings?.general_enquiry_email || 'info@xeluxefiresafety.com'}</p>
                <span className={styles.contactNote}>{settings?.general_enquiry_person || 'General inquiries'}</span>
              </div>
            </div>
            
            <div className={styles.contactItem}>
              <Mail className={styles.contactIcon} size={16} />
              <div className={styles.contactText}>
                <p>{settings?.managing_partner_email || 'c.ahking@xeluxefiresafety.com'}</p>
                <span className={styles.contactNote}>{settings?.managing_partner_person || 'Managing Partner'}</span>
              </div>
            </div>
            
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={styles.socialLink}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <div className={styles.bottomContent}>
            <div className={styles.copyright}>
              <p>{settings?.footer_copyright_text || `© ${currentYear} Xeluxe Fire & Safety Consultancy. All rights reserved.`}</p>
            </div>
            
            <div className={styles.legalLinks}>
              <a href="/blog" className={styles.legalLink}>Insights</a>
              <a href="/careers" className={styles.legalLink}>Careers</a>
            </div>
            
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
