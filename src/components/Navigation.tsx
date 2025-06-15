
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NavigationProps {
  isDark: boolean;
}

const Navigation = ({ isDark }: NavigationProps) => {
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-6 left-6 z-50"
    >
      <div className="flex flex-col space-y-2">
        {navItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => scrollToSection(item.id)}
            className={`group relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
              activeSection === item.id
                ? isDark ? 'text-white' : 'text-black'
                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
            }`}
          >
            <span className="relative z-10">{item.label}</span>
            {activeSection === item.id && (
              <motion.div
                layoutId="activeSection"
                className={`absolute inset-0 rounded-md border ${isDark ? 'border-white/20 bg-white/5' : 'border-black/20 bg-black/5'}`}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navigation;
