
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

interface EducationSectionProps {
  isDark: boolean;
}

const EducationSection = ({ isDark }: EducationSectionProps) => {
  const education = [
    {
      degree: "Bachelor of Science in Computer Engineering",
      school: "Tech University",
      period: "2016 - 2020",
      gpa: "3.8/4.0",
      achievements: [
        "Magna Cum Laude",
        "Dean's List for 6 semesters",
        "Outstanding Student in Network Engineering"
      ]
    },
    {
      degree: "Network+ Certification",
      school: "CompTIA",
      period: "2020",
      gpa: "Certified",
      achievements: [
        "Network Infrastructure",
        "Network Operations",
        "Network Security"
      ]
    }
  ];

  const certifications = [
    "Cisco Certified Network Associate (CCNA)",
    "AWS Certified Solutions Architect",
    "CompTIA Security+",
    "Python Institute PCEP",
    "IoT Fundamentals Certification"
  ];

  return (
    <section id="education" className={`py-20 px-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Education</h2>
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
              <GraduationCap className="w-8 h-8" />
              Academic Background
            </h3>
            
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`p-6 rounded-lg border ${isDark ? 'border-white/20 bg-white/5' : 'border-black/20 bg-black/5'} hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1">{edu.degree}</h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{edu.school}</p>
                    <div className="flex items-center gap-4 text-sm mb-3">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{edu.period}</span>
                      <span className="font-medium">{edu.gpa}</span>
                    </div>
                    <ul className="space-y-1">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className={`text-sm flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          <Award className="w-3 h-3" />
                          {achievement}
                        </li>
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
              <Award className="w-8 h-8" />
              Certifications
            </h3>
            
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`group p-4 rounded-lg border ${isDark ? 'border-white/20 bg-white/5 hover:bg-white/10' : 'border-black/20 bg-black/5 hover:bg-black/10'} transition-all duration-300 cursor-pointer hover:shadow-md`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-white' : 'bg-black'} group-hover:scale-125 transition-transform duration-300`} />
                    <span className="font-medium">{cert}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skills Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <h4 className="text-lg font-semibold mb-4">Core Skills</h4>
              {[
                { skill: 'Network Engineering', level: 95 },
                { skill: 'Python Programming', level: 88 },
                { skill: 'AI/ML Integration', level: 82 },
                { skill: 'IoT Systems', level: 90 },
                { skill: 'Problem Solving', level: 96 }
              ].map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.skill}</span>
                    <span>{item.level}%</span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${isDark ? 'bg-white/20' : 'bg-black/20'}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      transition={{ delay: index * 0.1, duration: 1 }}
                      className={`h-full rounded-full ${isDark ? 'bg-white' : 'bg-black'}`}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
