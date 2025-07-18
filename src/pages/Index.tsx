
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Navigation from '@/components/Navigation';
import { SecurityErrorBoundary } from '@/components/security/SecureComponent';
import { CodeObfuscator } from '@/lib/security/CodeObfuscation';

const Index = () => {
  const [isDark, setIsDark] = useState(true);
  const [securityInitialized, setSecurityInitialized] = useState(false);

  useEffect(() => {
    // Initialize security measures
    try {
      CodeObfuscator.enableAntiDebugging();
      setSecurityInitialized(true);
      console.log('🛡️ Security systems initialized');
    } catch (error) {
      console.error('Security initialization failed:', error);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  console.log('Portfolio loaded with theme:', isDark ? 'dark' : 'light');

  if (!securityInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">🛡️ Initializing Security Systems...</p>
        </div>
      </div>
    );
  }

  return (
    <SecurityErrorBoundary>
      <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'dark bg-black text-white' : 'bg-white text-black'}`}>
        {/* Desktop Theme Toggle - only show on large screens */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 right-6 z-50 hidden lg:block"
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

        {/* Navigation with theme toggle integrated for mobile */}
        <SecurityErrorBoundary>
          <Navigation isDark={isDark} onThemeToggle={toggleTheme} />
        </SecurityErrorBoundary>

        {/* Main Content with proper mobile spacing */}
        <main className="relative pt-0 lg:pt-0">
          {/* Mobile spacing div */}
          <div className="lg:hidden h-16"></div>
          
          <SecurityErrorBoundary>
            <HeroSection isDark={isDark} />
          </SecurityErrorBoundary>
          
          <SecurityErrorBoundary>
            <AboutSection isDark={isDark} />
          </SecurityErrorBoundary>
          
          <SecurityErrorBoundary>
            <ExperienceSection isDark={isDark} />
          </SecurityErrorBoundary>
          
          <SecurityErrorBoundary>
            <EducationSection isDark={isDark} />
          </SecurityErrorBoundary>
          
          <SecurityErrorBoundary>
            <ProjectsSection isDark={isDark} />
          </SecurityErrorBoundary>
          
          <SecurityErrorBoundary>
            <ContactSection isDark={isDark} />
          </SecurityErrorBoundary>
        </main>
      </div>
    </SecurityErrorBoundary>
  );
};

export default Index;
