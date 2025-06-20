
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
      }, 30 + delay);

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

  const coreCompetencies = [
    { 
      skill: 'Cybersecurity Fundamentals', 
      icon: '🛡️', 
      description: 'Network security implementation, penetration testing, and comprehensive vulnerability assessment methodologies'
    },
    { 
      skill: 'Python for Cybersecurity', 
      icon: '🐍', 
      description: 'Security automation scripting, malware analysis tools, and custom security solution development using specialized libraries'
    },
    { 
      skill: 'AI in Cybersecurity', 
      icon: '🤖', 
      description: 'AI-driven threat detection systems, anomaly identification, and intelligent security policy generation through advanced prompting'
    },
    { 
      skill: 'Network Infrastructure Security', 
      icon: '🌐', 
      description: 'Enterprise network architecture security, infrastructure hardening, and comprehensive security protocol implementation'
    },
    { 
      skill: 'Ethical Hacking', 
      icon: '🎯', 
      description: 'Penetration testing methodologies, vulnerability exploitation techniques, and comprehensive security assessment practices'
    },
    { 
      skill: 'Security Frameworks', 
      icon: '📋', 
      description: 'NIST Cybersecurity Framework, ISO 27001 compliance, and MITRE ATT&CK framework implementation for structured security approaches'
    },
  ];

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
                        text="Experienced Network Infrastructure Engineer with over 3 years of expertise in cybersecurity, network architecture, and artificial intelligence integration. Specializing in securing enterprise-level systems and implementing cutting-edge security solutions."
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
                        text="Comprehensive expertise in Python for cybersecurity applications, network infrastructure security, and IoT ecosystem protection. Passionate about leveraging AI-driven security solutions and maintaining ethical standards in cybersecurity practices."
                        delay={0}
                        isDark={isDark}
                      />
                    </p>
                  )}
                </div>
              </div>

              <div className={`p-8 rounded-2xl border ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'} backdrop-blur-sm`}>
                <h3 className="text-2xl font-bold mb-6">Innovation & Security</h3>
                <div className="text-lg leading-relaxed font-light">
                  {startAnimation && (
                    <p>
                      <TypewriterText
                        text="Excel in AI prompting for security automation, ethical hacking methodologies, and critical thinking in threat assessment. My expertise spans from vulnerability assessment to implementing security frameworks, consistently delivering robust solutions that protect digital assets."
                        delay={0}
                        isDark={isDark}
                      />
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Core Competencies with New Design */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-8"
            >
              {/* Core Competencies Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-center mb-12"
              >
                <h3 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                  Core Competencies
                </h3>
                <div className={`w-20 h-0.5 mx-auto ${isDark ? 'bg-white' : 'bg-black'}`}></div>
              </motion.div>

              {/* Skills Grid - 3x2 Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {coreCompetencies.map((item, index) => (
                  <motion.div
                    key={item.skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`group relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      isDark 
                        ? 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10' 
                        : 'border-black/20 bg-black/5 hover:border-black/40 hover:bg-black/10'
                    }`}
                  >
                    {/* Skill Icon and Title */}
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                          isDark ? 'bg-white/10' : 'bg-black/10'
                        }`}
                      >
                        {item.icon}
                      </motion.div>
                      <h4 className={`text-lg font-bold ${isDark ? 'text-white group-hover:text-gray-300' : 'text-black group-hover:text-gray-700'} transition-colors duration-300`}>
                        {item.skill}
                      </h4>
                    </div>

                    {/* Skill Description */}
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.description}
                    </p>

                    {/* Hover Effect Line */}
                    <div className={`absolute bottom-0 left-0 w-0 h-0.5 ${isDark ? 'bg-white' : 'bg-black'} group-hover:w-full transition-all duration-500 ease-out`}></div>
                  </motion.div>
                ))}
              </div>

              {/* Professional Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className={`mt-12 p-8 rounded-2xl border ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'} backdrop-blur-sm relative overflow-hidden`}
              >
                <h3 className={`text-2xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-black'}`}>Professional Metrics</h3>
                <div className="grid grid-cols-2 gap-8">
                  <motion.div 
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'} group-hover:scale-110 transition-transform duration-300`}>
                      3+
                    </div>
                    <div className={`text-sm font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Years Experience</div>
                  </motion.div>
                  <motion.div 
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'} group-hover:scale-110 transition-transform duration-300`}>
                      50+
                    </div>
                    <div className={`text-sm font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Projects Completed</div>
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
