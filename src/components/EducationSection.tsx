
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

  const certifications = [
    "Cisco Certified Network Associate (CCNA)",
    "AWS Certified Solutions Architect",
    "CompTIA Security+",
    "Network+ Certification",
    "IoT Fundamentals Certification"
  ];

  const coreSkills = [
    { 
      skill: 'Prompt Engineering', 
      level: 95, 
      icon: Brain,
      description: 'Advanced AI prompt crafting for cybersecurity automation and intelligent system interactions'
    },
    { 
      skill: 'Critical Thinking', 
      level: 92, 
      icon: Shield,
      description: 'Analytical problem-solving approach for complex security challenges and threat assessment'
    },
    { 
      skill: 'Future Technologies Awareness', 
      level: 88, 
      icon: Lightbulb,
      description: 'Deep understanding of emerging technologies and their security implications in evolving landscapes'
    },
    { 
      skill: 'Technology Adaptation', 
      level: 90, 
      icon: GraduationCap,
      description: 'Rapid learning and adaptation to changing technological environments and security paradigms'
    },
    { 
      skill: 'Ethical Standards', 
      level: 98, 
      icon: Award,
      description: 'Unwavering commitment to ethical practices in cybersecurity and professional conduct'
    }
  ];

  return (
    <section id="education" className={`py-20 px-4 ${isDark ? 'bg-black' : 'bg-white'} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Education & Skills
          </h2>
          <div className={`w-24 h-1 ${isDark ? 'bg-white' : 'bg-black'} mx-auto`} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold flex items-center gap-3 mb-6">
              <GraduationCap className="w-8 h-8 text-blue-500" />
              Academic Background
            </h3>
            
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`p-6 rounded-lg border ${isDark ? 'border-white/20 bg-white/5 hover:bg-white/10' : 'border-black/20 bg-black/5 hover:bg-black/10'} transition-all duration-300 cursor-pointer group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-start gap-4 relative z-10">
                  <motion.div 
                    className={`p-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/10'} group-hover:bg-blue-500/20 transition-colors duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <BookOpen className="w-5 h-5" />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1 group-hover:text-blue-400 transition-colors duration-300">
                      {edu.degree}
                    </h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2 font-medium`}>{edu.school}</p>
                    <div className="flex items-center gap-4 text-sm mb-3">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{edu.period}</span>
                      <span className="font-medium text-blue-500">{edu.gpa}</span>
                    </div>
                    <ul className="space-y-1">
                      {edu.achievements.map((achievement, i) => (
                        <motion.li 
                          key={i} 
                          className={`text-sm flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.2) + (i * 0.1) }}
                        >
                          <Award className="w-3 h-3 text-yellow-500" />
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Certifications */}
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
        </div>

        {/* Enhanced Core Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Professional Core Skills
          </h3>
          <div className="grid gap-6">
            {coreSkills.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-xl border ${isDark ? 'border-white/20 bg-white/5 hover:bg-white/10' : 'border-black/20 bg-black/5 hover:bg-black/10'} transition-all duration-300 group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-start gap-4 mb-4 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="p-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                  >
                    <item.icon className="w-6 h-6 text-blue-500" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-semibold group-hover:text-blue-400 transition-colors duration-300">
                        {item.skill}
                      </h4>
                      <span className="text-lg font-bold text-purple-500">{item.level}%</span>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-3 leading-relaxed`}>
                      {item.description}
                    </p>
                    <div className={`w-full h-3 rounded-full ${isDark ? 'bg-white/20' : 'bg-black/20'} overflow-hidden`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
