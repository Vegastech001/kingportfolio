
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useState, useEffect } from 'react';
import { Mesh } from 'three';
import TypewriterEffect from './TypewriterEffect';

interface HeroSectionProps {
  isDark: boolean;
}

// Enhanced 3D Sphere Component with mouse interaction and professional color changing
const InteractiveSphere = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const meshRef = useRef<Mesh>(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  
  // Professional and eye-catching color palette
  const colors = [
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#06B6D4', // Cyan
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#EC4899', // Pink
    '#84CC16', // Lime
    '#6366F1', // Indigo
    '#14B8A6', // Teal
  ];

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colors.length);
    }, 3000);

    return () => clearInterval(colorInterval);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation based on time and mouse position
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 + mousePosition.y * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + mousePosition.x * 0.5;
      
      // Subtle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 2]}>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial 
        color={colors[currentColorIndex]}
        wireframe={true}
        transparent={true}
        opacity={0.8}
      />
    </mesh>
  );
};

// Canvas wrapper component with mouse tracking
const InteractiveCanvas = ({ isDark }: { isDark: boolean }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="w-full h-full relative">
        <Canvas
          camera={{ 
            position: [0, 0, 5],
            fov: 60,
            aspect: window.innerWidth / window.innerHeight,
            near: 0.1,
            far: 1000
          }}
          style={{ 
            background: 'transparent',
            width: '100%',
            height: '100%'
          }}
          gl={{ 
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={isDark ? 0.4 : 0.7} />
            <pointLight position={[10, 10, 10]} intensity={isDark ? 0.9 : 1.3} />
            <pointLight position={[-10, -10, -10]} intensity={isDark ? 0.5 : 0.7} />
            <InteractiveSphere mousePosition={mousePosition} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

const HeroSection = ({ isDark }: HeroSectionProps) => {
  const profileTexts = [
    "Network Infrastructure Engineer",
    "AI & Machine Learning Specialist", 
    "Full-Stack Python Developer",
    "IoT Solutions Architect",
    "Technology Innovation Leader"
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    scrollToSection('contact');
  };

  const handlePortfolioClick = () => {
    scrollToSection('projects');
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 w-full h-full">
        <InteractiveCanvas isDark={isDark} />
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          {/* Professional Profile Picture */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", bounce: 0.3, duration: 1 }}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-8 sm:mb-12 relative"
          >
            <div className={`w-full h-full rounded-full border-4 ${isDark ? 'border-white shadow-2xl shadow-white/20' : 'border-black shadow-2xl shadow-black/20'} overflow-hidden bg-gradient-to-br ${isDark ? 'from-gray-800 via-gray-900 to-black' : 'from-gray-100 via-gray-200 to-gray-300'} relative`}>
              <div className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl md:text-6xl">
                👨‍💻
              </div>
              <div className={`absolute inset-0 rounded-full ${isDark ? 'bg-gradient-to-tr from-transparent via-white/5 to-white/20' : 'bg-gradient-to-tr from-transparent via-black/5 to-black/20'}`}></div>
            </div>
          </motion.div>

          {/* Professional Name - Mobile Responsive */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 tracking-tight"
          >
            RAVI RAYA
          </motion.h1>

          {/* Enhanced Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mb-8 sm:mb-12"
          >
            <TypewriterEffect texts={profileTexts} isDark={isDark} />
          </motion.div>

          {/* Functional CTA Buttons - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4"
          >
            <button 
              onClick={handlePortfolioClick}
              className={`px-6 sm:px-10 py-3 sm:py-4 rounded-full border-2 text-base sm:text-lg font-medium transition-all duration-500 transform hover:scale-105 ${isDark ? 'border-white text-white hover:bg-white hover:text-black hover:shadow-2xl hover:shadow-white/30' : 'border-black text-black hover:bg-black hover:text-white hover:shadow-2xl hover:shadow-black/30'}`}
            >
              Explore My Portfolio
            </button>
            <button 
              onClick={handleContactClick}
              className={`px-6 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-500 transform hover:scale-105 ${isDark ? 'bg-white text-black hover:bg-gray-200 hover:shadow-2xl hover:shadow-white/30' : 'bg-black text-white hover:bg-gray-800 hover:shadow-2xl hover:shadow-black/30'}`}
            >
              Professional Contact
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className={`w-6 sm:w-8 h-10 sm:h-12 rounded-full border-2 ${isDark ? 'border-white' : 'border-black'} flex justify-center relative`}>
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`w-1.5 sm:w-2 h-3 sm:h-4 ${isDark ? 'bg-white' : 'bg-black'} rounded-full mt-2`}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
