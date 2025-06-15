
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
      <span className={`${currentIndex < text.length ? 'animate-pulse' : 'opacity-0'} ${isDark ? 'text-white' : 'text-black'}`}>
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
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-center mb-16 tracking-tight"
          >
            About Me
          </motion.h2>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Professional Description */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-8"
            >
              <div className="text-xl md:text-2xl leading-relaxed font-light">
                {startAnimation && (
                  <TypewriterText
                    text="Experienced Network Infrastructure Engineer with over 3 years of expertise in enterprise-level network architecture, artificial intelligence integration, and full-stack development."
                    delay={0}
                    isDark={isDark}
                  />
                )}
              </div>

              <div className="text-lg md:text-xl leading-relaxed font-light">
                {startAnimation && (
                  <TypewriterText
                    text="Specialized in Python, C, Java programming languages with comprehensive knowledge of IoT ecosystems and emerging technologies. Passionate about leveraging cutting-edge AI solutions and maintaining a commitment to continuous professional development."
                    delay={3000}
                    isDark={isDark}
                  />
                )}
              </div>

              <div className="text-lg md:text-xl leading-relaxed font-light">
                {startAnimation && (
                  <TypewriterText
                    text="I excel in AI prompting, rapid learning, and technology innovation. My expertise spans from network security implementations to machine learning model deployment, consistently delivering scalable solutions that drive business growth."
                    delay={6000}
                    isDark={isDark}
                  />
                )}
              </div>
            </motion.div>

            {/* Right Column - Core Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-8"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-8">Core Competencies</h3>
              
              <div className="space-y-6">
                {[
                  { skill: 'Network Infrastructure', level: 95 },
                  { skill: 'AI & Machine Learning', level: 90 },
                  { skill: 'Python Development', level: 88 },
                  { skill: 'IoT Solutions', level: 85 },
                  { skill: 'Java Programming', level: 82 },
                  { skill: 'C Programming', level: 80 },
                ].map((item, index) => (
                  <motion.div
                    key={item.skill}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">{item.skill}</span>
                      <span className="text-sm font-light">{item.level}%</span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        transition={{ delay: 1 + index * 0.1, duration: 1.2, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${isDark ? 'from-white to-gray-400' : 'from-black to-gray-600'}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Professional Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-current/20"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">3+</div>
                  <div className="text-sm font-light">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">50+</div>
                  <div className="text-sm font-light">Projects Completed</div>
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
