
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';

interface NavigationProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

const Navigation = ({ isDark, onThemeToggle }: NavigationProps) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      setIsMobileMenuOpen(false);
    }
  };

  // Desktop Navigation (left sidebar)
  const DesktopNav = () => (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-6 left-6 z-50 hidden lg:block"
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

  // Mobile Navigation (top bar with hamburger)
  const MobileNav = () => (
    <>
      {/* Mobile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden ${
          isDark ? 'bg-black/90 backdrop-blur-md border-white/10' : 'bg-white/90 backdrop-blur-md border-black/10'
        } border-b`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            RAVI RAYA
          </h1>
          <div className="flex items-center space-x-2">
            {/* Theme Toggle in Header */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onThemeToggle}
              className={`p-2 rounded-md transition-all duration-300 ${
                isDark ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/10'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                isDark ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/10'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-16 left-0 right-0 z-40 lg:hidden ${
              isDark ? 'bg-black/95 backdrop-blur-md border-white/10' : 'bg-white/95 backdrop-blur-md border-black/10'
            } border-b shadow-lg`}
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-md transition-all duration-300 ${
                    activeSection === item.id
                      ? isDark 
                        ? 'text-white bg-white/10 border border-white/20' 
                        : 'text-black bg-black/10 border border-black/20'
                      : isDark 
                        ? 'text-gray-400 hover:text-white hover:bg-white/5' 
                        : 'text-gray-600 hover:text-black hover:bg-black/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Theme Toggle in Menu */}
              <div className={`border-t ${isDark ? 'border-white/10' : 'border-black/10'} pt-2 mt-2`}>
                <button
                  onClick={onThemeToggle}
                  className={`w-full text-left px-4 py-3 rounded-md transition-all duration-300 flex items-center space-x-3 ${
                    isDark 
                      ? 'text-gray-400 hover:text-white hover:bg-white/5' 
                      : 'text-gray-600 hover:text-black hover:bg-black/5'
                  }`}
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
};

export default Navigation;
