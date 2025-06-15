
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import TypewriterEffect from './TypewriterEffect';

interface HeroSectionProps {
  isDark: boolean;
}

// Simple 3D Sphere Component
const AnimatedSphere = () => {
  return (
    <mesh rotation={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color="#ffffff" 
        wireframe={true}
        transparent={true}
        opacity={0.3}
      />
    </mesh>
  );
};

// Canvas wrapper component
const CanvasWrapper = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <AnimatedSphere />
        </Suspense>
      </Canvas>
    </div>
  );
};

const HeroSection = ({ isDark }: HeroSectionProps) => {
  const profileTexts = [
    "Network Engineer",
    "AI Enthusiast", 
    "Python Developer",
    "IoT Specialist",
    "Quick Learner"
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 3D Background */}
      <CanvasWrapper isDark={isDark} />
      
      {/* Main Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Profile Picture Placeholder */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
            className="w-40 h-40 mx-auto mb-8 relative"
          >
            <div className={`w-full h-full rounded-full border-4 ${isDark ? 'border-white' : 'border-black'} overflow-hidden bg-gradient-to-br ${isDark ? 'from-gray-800 to-gray-900' : 'from-gray-200 to-gray-300'}`}>
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold">
                👨‍💻
              </div>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Your Name
          </motion.h1>

          {/* Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mb-8"
          >
            <TypewriterEffect texts={profileTexts} isDark={isDark} />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Network Engineer with 3+ years of experience in AI, Python, C, Java, and IoT devices. 
            Passionate about leveraging AI technologies and continuous learning to solve complex problems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className={`px-8 py-3 rounded-full border-2 transition-all duration-300 ${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'}`}>
              View My Work
            </button>
            <button className={`px-8 py-3 rounded-full transition-all duration-300 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
              Contact Me
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, repeat: Infinity, repeatType: "reverse", duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className={`w-6 h-10 rounded-full border-2 ${isDark ? 'border-white' : 'border-black'} flex justify-center`}>
          <div className={`w-1 h-3 ${isDark ? 'bg-white' : 'bg-black'} rounded-full mt-2`}></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
