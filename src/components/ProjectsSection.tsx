
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, Zap, Shield, Cpu } from 'lucide-react';

interface ProjectsSectionProps {
  isDark: boolean;
}

const ProjectsSection = ({ isDark }: ProjectsSectionProps) => {
  const projects = [
    {
      title: "AI-Powered Network Monitor",
      description: "Intelligent network monitoring system using machine learning algorithms to predict and prevent network failures before they occur.",
      technologies: ["Python", "TensorFlow", "React", "PostgreSQL"],
      features: [
        "Real-time anomaly detection",
        "Predictive failure analysis",
        "Automated alert system",
        "Performance optimization"
      ],
      icon: <Zap className="w-6 h-6" />,
      github: "#",
      demo: "#"
    },
    {
      title: "IoT Security Framework",
      description: "Comprehensive security framework for IoT devices with automated threat detection and response mechanisms.",
      technologies: ["Python", "Django", "IoT Protocols", "Cybersecurity"],
      features: [
        "Device authentication",
        "Encrypted communication",
        "Threat detection",
        "Automated responses"
      ],
      icon: <Shield className="w-6 h-6" />,
      github: "#",
      demo: "#"
    },
    {
      title: "Network Automation Suite",
      description: "Complete automation suite for network configuration, deployment, and maintenance using Infrastructure as Code principles.",
      technologies: ["Python", "Ansible", "Docker", "API Integration"],
      features: [
        "Automated deployments",
        "Configuration management",
        "Rollback capabilities",
        "Multi-vendor support"
      ],
      icon: <Code className="w-6 h-6" />,
      github: "#",
      demo: "#"
    },
    {
      title: "Smart Campus Network",
      description: "Intelligent campus-wide network infrastructure with IoT integration for smart building management and energy optimization.",
      technologies: ["IoT", "Python", "MQTT", "Time Series DB"],
      features: [
        "Smart energy management",
        "Occupancy monitoring",
        "Predictive maintenance",
        "Real-time analytics"
      ],
      icon: <Cpu className="w-6 h-6" />,
      github: "#",
      demo: "#"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3
      }
    }
  };

  return (
    <section id="projects" className={`py-20 px-4 ${isDark ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Projects</h2>
          <div className={`w-24 h-1 ${isDark ? 'bg-white' : 'bg-black'} mx-auto mb-6`} />
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            A showcase of innovative solutions combining network engineering, AI, and IoT technologies
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-lg border ${isDark ? 'border-white/20 bg-white/5 hover:bg-white/10' : 'border-black/20 bg-black/5 hover:bg-black/10'} transition-all duration-500 hover:shadow-2xl hover:scale-105`}
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-full ${isDark ? 'bg-white/10 group-hover:bg-white/20' : 'bg-black/10 group-hover:bg-black/20'} transition-all duration-300 group-hover:scale-110`}>
                    {project.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <div className="flex gap-2">
                      <motion.a
                        href={project.github}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-2 rounded-full ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'} transition-colors`}
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        href={project.demo}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-2 rounded-full ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'} transition-colors`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>
                </div>

                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4 leading-relaxed`}>
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-xs font-medium rounded-full ${isDark ? 'bg-white/10 text-gray-200' : 'bg-black/10 text-gray-800'} transition-colors`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {project.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-white' : 'bg-black'}`} />
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Hover Effect */}
              <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-white/5 to-transparent' : 'bg-gradient-to-br from-black/5 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
            </motion.div>
          ))}
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Want to see more of my work?
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-2 px-6 py-3 border-2 ${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'} transition-all duration-300 font-medium`}
          >
            <Github className="w-5 h-5" />
            Visit My GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
