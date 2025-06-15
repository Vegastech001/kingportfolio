
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactSectionProps {
  isDark: boolean;
}

const ContactSection = ({ isDark }: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "john.doe@email.com",
      href: "mailto:john.doe@email.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "San Francisco, CA",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "#",
      label: "LinkedIn"
    },
    {
      icon: <Github className="w-5 h-5" />,
      href: "#",
      label: "GitHub"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: "#",
      label: "Twitter"
    }
  ];

  return (
    <section id="contact" className={`py-20 px-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <div className={`w-24 h-1 ${isDark ? 'bg-white' : 'bg-black'} mx-auto mb-6`} />
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Ready to collaborate on your next project? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-8 leading-relaxed`}>
                I'm always interested in new opportunities and exciting projects. 
                Whether you're looking for a network engineer, need consultation on AI integration, 
                or want to discuss IoT solutions, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`group flex items-center gap-4 p-4 rounded-lg border ${isDark ? 'border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10' : 'border-black/20 hover:border-black/40 bg-black/5 hover:bg-black/10'} transition-all duration-300`}
                >
                  <div className={`p-3 rounded-full ${isDark ? 'bg-white/10 group-hover:bg-white/20' : 'bg-black/10 group-hover:bg-black/20'} transition-all duration-300 group-hover:scale-110`}>
                    {info.icon}
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{info.label}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-full border ${isDark ? 'border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10' : 'border-black/20 hover:border-black/40 bg-black/5 hover:bg-black/10'} transition-all duration-300`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'border-white/20 bg-white/5 text-white placeholder-gray-400 focus:border-white/40' : 'border-black/20 bg-black/5 text-black placeholder-gray-600 focus:border-black/40'} transition-colors focus:outline-none`}
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'border-white/20 bg-white/5 text-white placeholder-gray-400 focus:border-white/40' : 'border-black/20 bg-black/5 text-black placeholder-gray-600 focus:border-black/40'} transition-colors focus:outline-none`}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'border-white/20 bg-white/5 text-white placeholder-gray-400 focus:border-white/40' : 'border-black/20 bg-black/5 text-black placeholder-gray-600 focus:border-black/40'} transition-colors focus:outline-none`}
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'border-white/20 bg-white/5 text-white placeholder-gray-400 focus:border-white/40' : 'border-black/20 bg-black/5 text-black placeholder-gray-600 focus:border-black/40'} transition-colors focus:outline-none resize-vertical`}
                  placeholder="Tell me about your project or how I can help..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative w-full px-6 py-3 border-2 ${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'} transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </span>
                <div className={`absolute inset-0 ${isDark ? 'bg-white' : 'bg-black'} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`} />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-center mt-16 pt-8 border-t ${isDark ? 'border-white/20' : 'border-black/20'}`}
        >
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2024 John Doe. Built with passion and precision.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
