
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Brain, Shield, Lightbulb } from 'lucide-react';

interface EducationSectionProps {
  isDark: boolean;
}

const EducationSection = ({ isDark }: EducationSectionProps) => {
  const education = [
    {
      degree: "BIT (Hons) - Bachelor of Information Technology",
      school: "Balmiki Lincoln College University",
      period: "2020 - 2024",
      gpa: "First Class",
      achievements: [
        "Specialized in Network Security",
        "Outstanding Performance in Cybersecurity Modules",
        "Advanced Programming and System Security"
      ]
    },
    {
      degree: "Higher Secondary Education - Science",
      school: "Nidi Indreni Campus (Purbanchal Campus)",
      period: "2018 - 2020",
      gpa: "Computer Science Focus",
      achievements: [
        "Science and Mathematics Foundation",
        "Computer Science Specialization",
        "Strong Academic Performance"
      ]
    }
  ];

  // CERTIFICATIONS SECTION - COMMENTED OUT FOR NOW
  /*
  const certifications = [
    "Cisco Certified Network Associate (CCNA)",
    "AWS Certified Solutions Architect",
    "CompTIA Security+",
    "Network+ Certification",
    "IoT Fundamentals Certification"
  ];
  */

  const coreSkills = [
    { 
      skill: 'Prompt Engineering', 
      icon: Brain,
      description: 'Advanced AI prompt crafting for cybersecurity automation and intelligent system interactions'
    },
    { 
      skill: 'Critical Thinking', 
      icon: Shield,
      description: 'Analytical problem-solving approach for complex security challenges and threat assessment'
    },
    { 
      skill: 'Future Technologies Awareness', 
      icon: Lightbulb,
      description: 'Deep understanding of emerging technologies and their security implications in evolving landscapes'
    },
    { 
      skill: 'Technology Adaptation', 
      icon: GraduationCap,
      description: 'Rapid learning and adaptation to changing technological environments and security paradigms'
    },
    { 
      skill: 'Ethical Standards', 
      icon: Award,
      description: 'Unwavering commitment to ethical practices in cybersecurity and professional conduct'
    }
  ];

  return (
    <section id="education" className={`py-20 px-4 ${isDark ? 'bg-black' : 'bg-white'} relative overflow-hidden`}>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Education & Skills
          </h2>
          <div className={`w-24 h-1 ${isDark ? 'bg-white' : 'bg-black'} mx-auto`} />
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className={`text-3xl font-bold flex items-center justify-center gap-3 mb-12 ${isDark ? 'text-white' : 'text-black'}`}>
            <GraduationCap className={`w-8 h-8 ${isDark ? 'text-white' : 'text-black'}`} />
            <span>Academic Background</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`p-8 rounded-2xl border-2 transition-all duration-500 cursor-pointer group relative overflow-hidden ${
                  isDark 
                    ? 'border-white/20 bg-white/5 hover:border-white/40' 
                    : 'border-black/20 bg-black/5 hover:border-black/40'
                }`}
              >
                <div className="flex items-start gap-6 relative z-10">
                  <motion.div 
                    className={`p-4 rounded-full transition-all duration-500 ${
                      isDark ? 'bg-white/10 group-hover:bg-white/20' : 'bg-black/10 group-hover:bg-black/20'
                    }`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <BookOpen className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'}`} />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                      isDark ? 'text-white group-hover:text-gray-300' : 'text-black group-hover:text-gray-700'
                    }`}>
                      {edu.degree}
                    </h4>
                    <p className={`mb-3 font-semibold text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{edu.school}</p>
                    <div className="flex items-center gap-6 text-sm mb-4">
                      <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{edu.period}</span>
                      <span className={`font-bold px-3 py-1 rounded-full ${
                        isDark ? 'text-white bg-white/20' : 'text-black bg-black/20'
                      }`}>
                        {edu.gpa}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, i) => (
                        <motion.li 
                          key={i} 
                          className={`text-sm flex items-center gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.2) + (i * 0.1) }}
                        >
                          <Award className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                          <span className="font-medium">{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CERTIFICATIONS SECTION - COMMENTED OUT */}
        {/*
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-purple-500" />
            Certifications
          </h3>
          
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, x: 10 }}
                className={`group p-4 rounded-lg border ${isDark ? 'border-white/20 bg-white/5 hover:bg-white/10' : 'border-black/20 bg-black/5 hover:bg-black/10'} transition-all duration-300 cursor-pointer relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center gap-3 relative z-10">
                  <motion.div 
                    className={`w-3 h-3 rounded-full ${isDark ? 'bg-white' : 'bg-black'} group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300`}
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.2 }}
                  />
                  <span className="font-medium group-hover:text-purple-400 transition-colors duration-300">{cert}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        */}

        {/* Professional Core Skills Section - Updated to match Core Competencies design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              Professional Core Skills
            </h3>
            <div className={`w-20 h-0.5 mx-auto ${isDark ? 'bg-white' : 'bg-black'}`}></div>
          </motion.div>

          {/* Skills Grid - Matching Core Competencies Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {coreSkills.map((item, index) => (
              <motion.div
                key={item.skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
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
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isDark ? 'bg-white/10' : 'bg-black/10'
                    }`}
                  >
                    <item.icon className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'}`} />
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
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
