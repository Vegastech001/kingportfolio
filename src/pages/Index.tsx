
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/HeroSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Navigation from '@/components/Navigation';

const Index = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  console.log('Portfolio loaded with theme:', isDark ? 'dark' : 'light');

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'dark bg-black text-white' : 'bg-white text-black'}`}>
      {/* Theme Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-6 right-6 z-50"
      >
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="icon"
          className="bg-transparent border-current hover:bg-current/10 transition-all duration-300"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </motion.div>

      {/* Navigation */}
      <Navigation isDark={isDark} />

      {/* Main Content */}
      <main className="relative">
        <HeroSection isDark={isDark} />
        <ExperienceSection isDark={isDark} />
        <EducationSection isDark={isDark} />
        <ProjectsSection isDark={isDark} />
        <ContactSection isDark={isDark} />
      </main>
    </div>
  );
};

export default Index;
