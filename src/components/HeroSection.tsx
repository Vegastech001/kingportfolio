
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import TypewriterEffect from './TypewriterEffect';

interface HeroSectionProps {
  isDark: boolean;
}

const AnimatedSphere = () => {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color={Math.random() > 0.5 ? "#ffffff" : "#000000"}
        distort={0.3}
        speed={2}
        roughness={0.1}
      />
    </Sphere>
  );
};

const HeroSection = ({ isDark }: HeroSectionProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const skills = [
    "Network Engineer",
    "AI Prompt Engineer", 
    "Python Developer",
    "IoT Specialist",
    "Quick Learner"
  ];

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        {mounted && (
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Profile Picture Cutout */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', bounce: 0.4, duration: 1 }}
          className="mb-8"
        >
          <div className={`w-48 h-48 mx-auto rounded-full border-4 ${isDark ? 'border-white' : 'border-black'} overflow-hidden bg-gradient-to-br ${isDark ? 'from-gray-800 to-gray-900' : 'from-gray-100 to-gray-200'}`}>
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
              alt="Profile"
              className="w-full h-full object-cover grayscale"
            />
          </div>
        </motion.div>

        {/* Name with Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
        >
          <span className="inline-block">John</span>{' '}
          <span className="inline-block bg-gradient-to-r from-current to-current bg-clip-text">
            Doe
          </span>
        </motion.h1>

        {/* Typewriter Effect */}
        <div className="mb-8">
          <TypewriterEffect 
            texts={skills}
            isDark={isDark}
          />
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
        >
          Passionate Network Engineer with 3+ years of experience in designing robust network infrastructures. 
          Expert in AI integration, IoT systems, and emerging technologies. Always ready to tackle new challenges 
          and drive innovation in the digital landscape.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8"
        >
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className={`group relative px-8 py-3 border-2 ${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'} transition-all duration-300 font-medium`}
          >
            <span className="relative z-10">Get In Touch</span>
            <div className={`absolute inset-0 ${isDark ? 'bg-white' : 'bg-black'} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
