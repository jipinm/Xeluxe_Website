import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useSettings } from '../../../contexts/SettingsContext';
import { useServiceMenu } from '../../../contexts/ServiceMenuContext';
import { useProjectMenu } from '../../../contexts/ProjectMenuContext';
import type { ServiceCategory, ProjectCategory } from '../../../services/api';

interface NavItem {
  name: string;
  href: string;
  type: 'route';
  dropdown?: DropdownItem[];
  isServicesMenu?: boolean;
}

interface DropdownItem {
  name: string;
  href: string;
  nested?: NestedDropdownItem[];
}

interface NestedDropdownItem {
  name: string;
  href: string;
}

interface HeaderContentProps {
  styles: any; // CSS modules styles object
  className?: string;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ styles, className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [openNestedMobile, setOpenNestedMobile] = useState<number | null>(null);
  const [nestedFlipUp, setNestedFlipUp] = useState<{ [key: string]: boolean }>({});
  const nestedDropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const location = useLocation();
  const { categories: serviceCategories } = useServiceMenu();
  const { categories: projectCategories } = useProjectMenu();

  // Check if nested dropdown should flip upward to stay in viewport
  const checkNestedPosition = useCallback((menuName: string, dropdownIndex: number) => {
    const key = `${menuName}-${dropdownIndex}`;
    const nestedEl = nestedDropdownRefs.current[key];
    if (!nestedEl) return;

    const rect = nestedEl.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // If the bottom of the nested dropdown exceeds viewport, flip it up
    if (rect.bottom > viewportHeight) {
      setNestedFlipUp(prev => ({ ...prev, [key]: true }));
    } else {
      setNestedFlipUp(prev => ({ ...prev, [key]: false }));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownToggle = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  const handleDropdownClose = () => {
    setOpenDropdown(null);
    setHoveredCategory(null);
    setOpenNestedMobile(null);
    setNestedFlipUp({});
  };

  const handleMobileDropdownClick = (e: React.MouseEvent, itemName: string, hasDropdown: boolean) => {
    if (hasDropdown && window.innerWidth <= 768) {
      e.preventDefault();
      handleDropdownToggle(itemName);
    }
  };

  // Transform API service categories into dropdown format
  const transformServiceCategoriesToDropdown = (categories: ServiceCategory[]): DropdownItem[] => {
    return categories.map(category => {
      // If category has only one service, link directly to it
      if (category.services.length === 1) {
        return {
          name: category.category_name,
          href: `/service/${category.services[0].slug}`,
        };
      }
      
      // Otherwise, create nested dropdown
      return {
        name: category.category_name,
        href: '#', // Placeholder, won't be used for categories with multiple services
        nested: category.services.map(service => ({
          name: service.title,
          href: `/service/${service.slug}`,
        })),
      };
    });
  };

  // Transform API project categories into dropdown format for Sectors menu
  const transformProjectCategoriesToDropdown = (categories: ProjectCategory[]): DropdownItem[] => {
    return categories
      .filter(category => category.projects.length > 0)
      .map(category => {
        // Link directly to sector page without nested projects
        return {
          name: category.category_name,
          href: `/sector/${category.slug}`,
        };
      });
  };

  const navItems: NavItem[] = [
    { name: 'Home', href: '/', type: 'route' },
    { name: 'About Us', href: '/about-us', type: 'route' },
    { 
      name: 'Services', 
      href: '/services', 
      type: 'route',
      isServicesMenu: true,
      dropdown: transformServiceCategoriesToDropdown(serviceCategories),
    },
    { 
      name: 'Sectors', 
      href: '/sectors', 
      type: 'route',
      isServicesMenu: true, // Reuse same mega menu styles
      dropdown: transformProjectCategoriesToDropdown(projectCategories),
    },
    { name: 'Projects', href: '/projects', type: 'route' },
    { name: 'Insights', href: '/blog', type: 'route' },
    { name: 'Careers', href: '/careers', type: 'route' },
    { name: 'Contact Us', href: '/contact-us', type: 'route' },
  ];

  // Function to check if a navigation item is active
  const isActiveNavItem = (item: NavItem): boolean => {
    // For route-based navigation, check exact path match
    if (location.pathname === item.href) {
      return true;
    }
    // Special case: highlight "Services" menu when on service detail pages
    if (item.href === '/services' && location.pathname.startsWith('/service/')) {
      return true;
    }
    // Special case: highlight "Projects" menu when on project detail pages
    if (item.href === '/projects' && location.pathname.startsWith('/project/')) {
      return true;
    }
    // Special case: highlight "Insights" menu when on blog or blog details pages
    if (item.href === '/blog' && (location.pathname === '/blog' || location.pathname.startsWith('/blog-details'))) {
      return true;
    }
    // Special case: highlight "Careers" menu when on career details pages
    if (item.href === '/careers' && location.pathname.startsWith('/career-details/')) {
      return true;
    }
    return false;
  };

  const { settings } = useSettings();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

  return (
    <div className={`${styles.container} ${className} ${isScrolled ? styles.scrolled : ''}`}>
      <a href="/" className={styles.logo}>
        <img 
          src={settings?.logo_url ? `${API_BASE_URL}/${settings.logo_url}` : '/logo.png'} 
          alt={settings?.logo_alt_text || 'Xeluxe Fire & Safety'} 
          className={styles.logoImage} 
        />
        <div className={styles.tagline}>
          <div>{settings?.logo_tagline_1 || 'Engineering a Sustainable'}</div>
          <div>{settings?.logo_tagline_2 || 'and Resilient Future - Together'}</div>
        </div>
      </a>

      <div className={styles.rightSection}>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            {navItems.map((item, index) => {
              const isActive = isActiveNavItem(item);
              const hasDropdown = item.dropdown && item.dropdown.length > 0;
              const isDropdownOpen = openDropdown === item.name;
              
              return (
                <li 
                  key={index} 
                  className={`${styles.navItem} ${hasDropdown ? styles.hasDropdown : ''}`}
                  onMouseEnter={() => hasDropdown && handleDropdownToggle(item.name)}
                  onMouseLeave={() => hasDropdown && handleDropdownClose()}
                >
                  <a 
                    href={item.href} 
                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                    onClick={(e) => {
                      handleMobileDropdownClick(e, item.name, !!hasDropdown);
                      if (!hasDropdown || window.innerWidth > 768) {
                        setIsMenuOpen(false);
                      }
                    }}
                  >
                    {item.name}
                    {hasDropdown && (
                      <ChevronDown 
                        size={16} 
                        className={`${styles.dropdownIcon} ${isDropdownOpen ? styles.dropdownIconRotated : ''}`}
                      />
                    )}
                  </a>
                  
                  {hasDropdown && (
                    <div className={`${styles.dropdown} ${isDropdownOpen ? styles.dropdownOpen : ''} ${item.isServicesMenu ? styles.megaMenu : ''}`}>
                      <ul className={styles.dropdownList}>
                        {item.dropdown?.map((dropdownItem, dropdownIndex) => {
                          const hasNested = dropdownItem.nested && dropdownItem.nested.length > 0;
                          const isHovered = hoveredCategory === dropdownIndex;
                          const flipKey = `${item.name}-${dropdownIndex}`;
                          
                          return (
                            <li 
                              key={dropdownIndex} 
                              className={`${styles.dropdownItem} ${hasNested ? styles.hasNested : ''}`}
                              onMouseEnter={() => {
                                if (hasNested && window.innerWidth > 768) {
                                  // Reset flip state first, then check position after render
                                  setNestedFlipUp(prev => ({ ...prev, [flipKey]: false }));
                                  setHoveredCategory(dropdownIndex);
                                  // Check position after a small delay to allow the dropdown to render
                                  setTimeout(() => checkNestedPosition(item.name, dropdownIndex), 10);
                                }
                              }}
                              onMouseLeave={() => {
                                if (hasNested && window.innerWidth > 768) {
                                  setHoveredCategory(null);
                                  // Reset flip state when leaving
                                  setNestedFlipUp(prev => ({ ...prev, [flipKey]: false }));
                                }
                              }}
                            >
                              {hasNested ? (
                                <>
                                  <a
                                    href={dropdownItem.href}
                                    className={`${styles.dropdownLink} ${styles.categoryLink}`}
                                    onClick={(e) => {
                                      if (window.innerWidth <= 768) {
                                        e.preventDefault();
                                        setOpenNestedMobile(openNestedMobile === dropdownIndex ? null : dropdownIndex);
                                      }
                                    }}
                                  >
                                    {dropdownItem.name}
                                    <ChevronRight size={16} className={styles.nestedIcon} />
                                  </a>
                                  {/* Nested submenu with header */}
                                  <div 
                                    ref={(el) => { nestedDropdownRefs.current[flipKey] = el; }}
                                    className={`${styles.nestedDropdown} ${(isHovered || openNestedMobile === dropdownIndex) ? styles.nestedDropdownOpen : ''} ${nestedFlipUp[flipKey] ? styles.nestedDropdownFlipUp : ''}`}
                                  >
                                    <ul className={styles.nestedDropdownList}>
                                      {dropdownItem.nested?.map((nestedItem, nestedIndex) => (
                                        <li key={nestedIndex} className={styles.nestedDropdownItem}>
                                          <a 
                                            href={nestedItem.href}
                                            className={styles.nestedDropdownLink}
                                            onClick={() => {
                                              setIsMenuOpen(false);
                                              handleDropdownClose();
                                              setHoveredCategory(null);
                                            }}
                                          >
                                            {nestedItem.name}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </>
                              ) : (
                                <a 
                                  href={dropdownItem.href}
                                  className={styles.dropdownLink}
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    handleDropdownClose();
                                  }}
                                >
                                  {dropdownItem.name}
                                </a>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <button 
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className={`${styles.line} ${isMenuOpen ? styles.line1 : ''}`}></span>
        <span className={`${styles.line} ${isMenuOpen ? styles.line2 : ''}`}></span>
        <span className={`${styles.line} ${isMenuOpen ? styles.line3 : ''}`}></span>
      </button>
    </div>
  );
};

export default HeaderContent;
