import { motion } from 'framer-motion';
import { Briefcase, MapPin, Award, Target, Users } from 'lucide-react';

interface ExperienceSectionProps {
  isDark: boolean;
}

const ExperienceSection = ({ isDark }: ExperienceSectionProps) => {
  const experiences = [
    {
      title: "Tech Officer",
      company: "Vegas Recreation Nepal Pvt. Ltd.",
      status: "Current Position",
      level: "Senior Level",
      location: "Nepal",
      impact: "Leading IoT Infrastructure & Gaming Systems",
      description: [
        "Oversee IoT devices installation, maintenance and servicing",
        "Provide comprehensive IT tech support for all systems",
        "Manage and maintain surveillance systems infrastructure",
        "Handle slot machines technical operations and troubleshooting",
        "Design and implement networking solutions for gaming operations"
      ]
    },
    {
      title: "Business Owner & Leader",
      company: "Rejico (E-commerce Business)",
      status: "Entrepreneurship",
      level: "Founder & CEO",
      location: "Nepal",
      impact: "Built E-commerce Team of 5+ Members",
      description: [
        "Founded and led e-commerce dropshipping business with 5-member team",
        "Developed and executed digital marketing strategies and campaigns",
        "Managed SEO optimization to improve online visibility and sales",
        "Created targeted advertisements across multiple platforms",
        "Handled customer service operations and team coordination"
      ]
    },
    {
      title: "Technical Support Specialist",
      company: "Bilo Computer Sales and Suppliers",
      status: "Professional Growth",
      level: "Specialist Level",
      location: "Nepal",
      impact: "Enhanced Customer Technical Solutions",
      description: [
        "Provided comprehensive after-sales technical support to customers",
        "Resolved customer inquiries and technical issues efficiently",
        "Delivered various tech-related services and solutions",
        "Maintained customer satisfaction through effective problem-solving",
        "Built expertise in computer hardware and software troubleshooting"
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
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                      <p className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{exp.company}</p>
                      
                      {/* Professional Metrics */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-primary" />
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {exp.level}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-primary" />
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {exp.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {exp.location}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {exp.impact}
                          </span>
                        </div>
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
