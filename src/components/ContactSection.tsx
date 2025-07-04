
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter, Shield, Lock } from 'lucide-react';
import { useSecureForm } from '@/hooks/useSecureForm';

interface ContactSectionProps {
  isDark: boolean;
}

const ContactSection = ({ isDark }: ContactSectionProps) => {
  const {
    formData,
    isSubmitting,
    securityScore,
    updateField,
    submitForm,
    resetForm,
    getObfuscatedEmail
  } = useSecureForm({
    endpoint: 'https://formspree.io/f/YOUR_FORM_ID',
    onSuccess: () => {
      console.log('🔒 Secure message sent successfully');
    },
    onError: (errors) => {
      console.error('🛡️ Security validation failed:', errors);
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateField(name as keyof typeof formData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "ravi.raya@email.com",
      href: "mailto:ravi.raya@email.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+977 98XXXXXXXX",
      href: "tel:+97798XXXXXXXX"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Nepal",
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
                Whether you're looking for tech support, IoT solutions, or business development, 
                I'd love to hear from you.
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
            <div className={`mb-6 p-4 rounded-lg border ${isDark ? 'border-muted bg-muted/5' : 'border-muted bg-muted/5'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Security Level</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${securityScore >= 80 ? 'bg-green-500' : securityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                  <span className="text-sm font-mono">{securityScore}%</span>
                </div>
              </div>
              <div className={`w-full bg-muted rounded-full h-2 ${isDark ? 'bg-muted' : 'bg-muted'}`}>
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    securityScore >= 80 ? 'bg-green-500' : securityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${securityScore}%` }}
                />
              </div>
            </div>

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
                    maxLength={100}
                    pattern="[a-zA-Z\s\-'.]{2,100}"
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'border-border bg-background/5 text-foreground placeholder-muted-foreground focus:border-ring' : 'border-border bg-background/5 text-foreground placeholder-muted-foreground focus:border-ring'} transition-colors focus:outline-none`}
                    placeholder="Your Name (letters only)"
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
                    maxLength={254}
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'border-border bg-background/5 text-foreground placeholder-muted-foreground focus:border-ring' : 'border-border bg-background/5 text-foreground placeholder-muted-foreground focus:border-ring'} transition-colors focus:outline-none`}
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
                  maxLength={200}
                  minLength={3}
                  className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'border-border bg-background/5 text-foreground placeholder-muted-foreground focus:border-ring' : 'border-border bg-background/5 text-foreground placeholder-muted-foreground focus:border-ring'} transition-colors focus:outline-none`}
                  placeholder="What's this about? (3-200 chars)"
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
                  maxLength={5000}
                  minLength={10}
                  className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'border-border bg-background/5 text-foreground placeholder-muted-foreground focus:border-ring' : 'border-border bg-background/5 text-foreground placeholder-muted-foreground focus:border-ring'} transition-colors focus:outline-none resize-vertical`}
                  placeholder="Tell me about your project... (10-5000 chars)"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || securityScore < 60}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative w-full px-6 py-3 border-2 ${isDark ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground' : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'} transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <Lock className="w-4 h-4" />
                      Encrypting & Sending...
                    </>
                  ) : securityScore < 60 ? (
                    <>
                      <Shield className="w-5 h-5" />
                      Security Check Failed
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <Lock className="w-4 h-4" />
                      Send Encrypted Message
                    </>
                  )}
                </span>
                <div className={`absolute inset-0 ${isDark ? 'bg-primary' : 'bg-primary'} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`} />
              </motion.button>
            </form>
            
            {/* Enhanced Security Notice */}
            <div className={`mt-4 p-4 rounded-lg border ${isDark ? 'border-muted bg-muted/5' : 'border-muted bg-muted/5'}`}>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <div className="space-y-2">
                  <p className={`text-sm font-medium ${isDark ? 'text-foreground' : 'text-foreground'}`}>
                    🔒 Advanced Security Features Active
                  </p>
                  <ul className={`text-xs space-y-1 ${isDark ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                    <li>• End-to-end encryption for all form data</li>
                    <li>• Real-time input validation & sanitization</li>
                    <li>• Rate limiting & abuse prevention</li>
                    <li>• XSS & injection attack protection</li>
                    {formData.email && (
                      <li>• Your email: {getObfuscatedEmail()}</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
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
            © 2024 Ravi Raya. Built with passion and precision.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
