
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AboutSectionProps {
  isDark: boolean;
}

const TypewriterText = ({ text, delay = 0, isDark }: { text: string; delay?: number; isDark: boolean }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50 + delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return (
    <span className={`${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
      {displayedText}
      <span className={`${currentIndex < text.length ? 'animate-pulse' : 'opacity-0'} transition-opacity duration-100 ${isDark ? 'text-white' : 'text-black'}`}>
        |
      </span>
    </span>
  );
};

const AboutSection = ({ isDark }: AboutSectionProps) => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="min-h-screen py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              About Me
            </h2>
            <div className={`w-24 h-1 mx-auto ${isDark ? 'bg-white' : 'bg-black'} rounded-full`}></div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Left Column - Professional Description */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-10"
            >
              <div className={`p-8 rounded-2xl border ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'} backdrop-blur-sm`}>
                <h3 className="text-2xl font-bold mb-6">Professional Overview</h3>
                <div className="text-lg leading-relaxed font-light space-y-4">
                  {startAnimation && (
                    <p>
                      <TypewriterText
                        text="Experienced Network Infrastructure Engineer with over 3 years of expertise in enterprise-level network architecture, artificial intelligence integration, and full-stack development."
                        delay={0}
                        isDark={isDark}
                      />
                    </p>
                  )}
                </div>
              </div>

              <div className={`p-8 rounded-2xl border ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'} backdrop-blur-sm`}>
                <h3 className="text-2xl font-bold mb-6">Technical Expertise</h3>
                <div className="text-lg leading-relaxed font-light">
                  {startAnimation && (
                    <p>
                      <TypewriterText
                        text="Specialized in Python, C, Java programming languages with comprehensive knowledge of IoT ecosystems and emerging technologies. Passionate about leveraging cutting-edge AI solutions and maintaining a commitment to continuous professional development."
                        delay={3000}
                        isDark={isDark}
                      />
                    </p>
                  )}
                </div>
              </div>

              <div className={`p-8 rounded-2xl border ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'} backdrop-blur-sm`}>
                <h3 className="text-2xl font-bold mb-6">Innovation & Growth</h3>
                <div className="text-lg leading-relaxed font-light">
                  {startAnimation && (
                    <p>
                      <TypewriterText
                        text="I excel in AI prompting, rapid learning, and technology innovation. My expertise spans from network security implementations to machine learning model deployment, consistently delivering scalable solutions that drive business growth."
                        delay={6000}
                        isDark={isDark}
                      />
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Core Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-8"
            >
              <div className={`p-8 rounded-2xl border ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'} backdrop-blur-sm`}>
                <h3 className="text-3xl font-bold mb-8 text-center">Core Competencies</h3>
                
                <div className="space-y-6">
                  {[
                    { skill: 'Network Infrastructure', level: 95, icon: '🌐' },
                    { skill: 'AI & Machine Learning', level: 90, icon: '🤖' },
                    { skill: 'Python Development', level: 88, icon: '🐍' },
                    { skill: 'IoT Solutions', level: 85, icon: '📡' },
                    { skill: 'Java Programming', level: 82, icon: '☕' },
                    { skill: 'C Programming', level: 80, icon: '⚡' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.skill}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                      className={`p-4 rounded-xl border ${isDark ? 'border-white/5 bg-white/5' : 'border-black/5 bg-black/5'} hover:scale-105 transition-all duration-300`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <span className="text-lg font-medium">{item.skill}</span>
                        </div>
                        <span className="text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {item.level}%
                        </span>
                      </div>
                      <div className={`w-full h-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'} overflow-hidden`}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          transition={{ delay: 1 + index * 0.1, duration: 1.2, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Professional Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className={`p-8 rounded-2xl border ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'} backdrop-blur-sm`}
              >
                <h3 className="text-2xl font-bold text-center mb-8">Professional Metrics</h3>
                <div className="grid grid-cols-2 gap-8">
                  <motion.div 
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                      3+
                    </div>
                    <div className="text-sm font-light opacity-80">Years Experience</div>
                  </motion.div>
                  <motion.div 
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                      50+
                    </div>
                    <div className="text-sm font-light opacity-80">Projects Completed</div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
