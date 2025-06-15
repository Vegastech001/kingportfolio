
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useState, useEffect } from 'react';
import { Mesh } from 'three';
import TypewriterEffect from './TypewriterEffect';

interface HeroSectionProps {
  isDark: boolean;
}

// Enhanced 3D Sphere Component with mouse interaction and color changing
const InteractiveSphere = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const meshRef = useRef<Mesh>(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  
  // Professional color palette
  const colors = [
    '#6366f1', // Indigo
    '#8b5cf6', // Violet
    '#06b6d4', // Cyan
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#ec4899', // Pink
    '#84cc16', // Lime
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
    <mesh ref={meshRef} scale={[1.5, 1.5, 1.5]}>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial 
        color={colors[currentColorIndex]}
        wireframe={true}
        transparent={true}
        opacity={0.6}
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
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={isDark ? 0.3 : 0.6} />
          <pointLight position={[10, 10, 10]} intensity={isDark ? 0.8 : 1.2} />
          <pointLight position={[-10, -10, -10]} intensity={isDark ? 0.4 : 0.6} />
          <InteractiveSphere mousePosition={mousePosition} />
        </Suspense>
      </Canvas>
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

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <InteractiveCanvas isDark={isDark} />
      
      {/* Main Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
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
            className="w-48 h-48 mx-auto mb-12 relative"
          >
            <div className={`w-full h-full rounded-full border-4 ${isDark ? 'border-white shadow-2xl shadow-white/20' : 'border-black shadow-2xl shadow-black/20'} overflow-hidden bg-gradient-to-br ${isDark ? 'from-gray-800 via-gray-900 to-black' : 'from-gray-100 via-gray-200 to-gray-300'} relative`}>
              <div className="w-full h-full flex items-center justify-center text-6xl">
                👨‍💻
              </div>
              <div className={`absolute inset-0 rounded-full ${isDark ? 'bg-gradient-to-tr from-transparent via-white/5 to-white/20' : 'bg-gradient-to-tr from-transparent via-black/5 to-black/20'}`}></div>
            </div>
          </motion.div>

          {/* Professional Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-8 tracking-tight"
          >
            Professional Portfolio
          </motion.h1>

          {/* Enhanced Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mb-12"
          >
            <TypewriterEffect texts={profileTexts} isDark={isDark} />
          </motion.div>

          {/* Professional CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button className={`px-10 py-4 rounded-full border-2 text-lg font-medium transition-all duration-500 transform hover:scale-105 ${isDark ? 'border-white text-white hover:bg-white hover:text-black hover:shadow-2xl hover:shadow-white/30' : 'border-black text-black hover:bg-black hover:text-white hover:shadow-2xl hover:shadow-black/30'}`}>
              Explore My Portfolio
            </button>
            <button className={`px-10 py-4 rounded-full text-lg font-medium transition-all duration-500 transform hover:scale-105 ${isDark ? 'bg-white text-black hover:bg-gray-200 hover:shadow-2xl hover:shadow-white/30' : 'bg-black text-white hover:bg-gray-800 hover:shadow-2xl hover:shadow-black/30'}`}>
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className={`w-8 h-12 rounded-full border-2 ${isDark ? 'border-white' : 'border-black'} flex justify-center relative`}>
          <motion.div 
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`w-2 h-4 ${isDark ? 'bg-white' : 'bg-black'} rounded-full mt-2`}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
