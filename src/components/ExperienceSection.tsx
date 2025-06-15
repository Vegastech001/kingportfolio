
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface ExperienceSectionProps {
  isDark: boolean;
}

const ExperienceSection = ({ isDark }: ExperienceSectionProps) => {
  const experiences = [
    {
      title: "Senior Network Engineer",
      company: "TechCorp Solutions",
      period: "2022 - Present",
      location: "San Francisco, CA",
      description: [
        "Led network infrastructure redesign improving system performance by 40%",
        "Implemented AI-driven network monitoring solutions",
        "Managed IoT device integration across enterprise networks",
        "Mentored junior engineers and established best practices"
      ]
    },
    {
      title: "Network Engineer",
      company: "DataFlow Networks",
      period: "2021 - 2022",
      location: "Austin, TX",
      description: [
        "Designed and deployed scalable network architectures",
        "Automated network configuration using Python scripts",
        "Reduced network downtime by 60% through proactive monitoring",
        "Collaborated with cross-functional teams on IoT projects"
      ]
    },
    {
      title: "Junior Network Engineer",
      company: "ConnectTech Ltd",
      period: "2020 - 2021",
      location: "Remote",
      description: [
        "Assisted in network troubleshooting and maintenance",
        "Developed network documentation and procedures",
        "Supported IoT device connectivity and security protocols",
        "Gained expertise in AI-assisted network optimization"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        bounce: 0.3
      }
    }
  };

  return (
    <section id="experience" className={`py-20 px-4 ${isDark ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience</h2>
          <div className={`w-24 h-1 ${isDark ? 'bg-white' : 'bg-black'} mx-auto`} />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative p-6 rounded-lg border ${isDark ? 'border-white/20 hover:border-white/40 bg-white/5' : 'border-black/20 hover:border-black/40 bg-black/5'} transition-all duration-300 hover:shadow-xl`}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className={`p-3 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/10'} group-hover:scale-110 transition-transform duration-300`}>
                  <Briefcase className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{exp.company}</p>
                    </div>
                    <div className={`flex items-center gap-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2 md:mt-0`}>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-white' : 'bg-black'} mt-2 flex-shrink-0`} />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
