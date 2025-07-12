
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter, Shield, Lock, Quote } from 'lucide-react';
import { useSecureForm } from '@/hooks/useSecureForm';
import { useState, useEffect } from 'react';

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

  const [currentQuote, setCurrentQuote] = useState<{ text: string; author: string } | null>(null);

  const quotes = [
    // Technology (25 quotes)
    { text: "The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life.", author: "Bill Gates" },
    { text: "Technology is best when it brings people together.", author: "Matt Mullenweg" },
    { text: "The real problem is not whether machines think but whether men do.", author: "B.F. Skinner" },
    { text: "The computer was born to solve problems that did not exist before.", author: "Bill Gates" },
    { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
    { text: "Technology is nothing. What's important is that you have a faith in people.", author: "Steve Jobs" },
    { text: "The great growling engine of change - technology.", author: "Alvin Toffler" },
    { text: "Technology is a useful servant but a dangerous master.", author: "Christian Lous Lange" },
    { text: "We are stuck with technology when what we really want is just stuff that works.", author: "Douglas Adams" },
    { text: "The science of today is the technology of tomorrow.", author: "Edward Teller" },
    { text: "Technology will not replace great teachers, but technology in the hands of great teachers can be transformational.", author: "George Couros" },
    { text: "The technology you use impresses no one. The experience you create with it is everything.", author: "Sean Gerety" },
    { text: "It has become appallingly obvious that our technology has exceeded our humanity.", author: "Albert Einstein" },
    { text: "Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important.", author: "Bill Gates" },
    { text: "The first rule of any technology used in a business is that automation applied to an efficient operation will magnify the efficiency.", author: "Bill Gates" },
    { text: "Technology is the campfire around which we tell our stories.", author: "Laurie Anderson" },
    { text: "If we continue to develop our technology without wisdom or prudence, our servant may prove to be our executioner.", author: "Omar Bradley" },
    { text: "The human spirit must prevail over technology.", author: "Albert Einstein" },
    { text: "Technology is best when it's invisible.", author: "John Thackara" },
    { text: "One machine can do the work of fifty ordinary men. No machine can do the work of one extraordinary man.", author: "Elbert Hubbard" },
    { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
    { text: "The Internet is becoming the town square for the global village of tomorrow.", author: "Bill Gates" },
    { text: "Technology is not just the thing that makes your life easier. It's the thing that makes you who you are.", author: "Anonymous" },
    { text: "Innovation is the outcome of a habit, not a random act.", author: "Sukant Ratnakar" },
    { text: "To err is human, but to really foul things up you need a computer.", author: "Paul Ehrlich" },

    // AI & Machine Learning (20 quotes)
    { text: "Artificial intelligence is the new electricity.", author: "Andrew Ng" },
    { text: "The question isn't whether AI will replace humans, but whether humans will enhance themselves with AI.", author: "Anonymous" },
    { text: "Machine learning is the science of getting computers to learn and act like humans do.", author: "Katharine Jarmul" },
    { text: "I think AI is akin to building a rocket ship. You need a huge engine and a lot of fuel.", author: "Andrew Ng" },
    { text: "The development of full artificial intelligence could spell the end of the human race.", author: "Stephen Hawking" },
    { text: "AI is likely to be either the best or worst thing to happen to humanity.", author: "Stephen Hawking" },
    { text: "By far, the greatest danger of Artificial Intelligence is that people conclude too early that they understand it.", author: "Eliezer Yudkowsky" },
    { text: "The real question is, when will we draft an artificial intelligence bill of rights? What will that consist of? And who will get to decide that?", author: "Gray Scott" },
    { text: "Machine intelligence is the last invention that humanity will ever need to make.", author: "Nick Bostrom" },
    { text: "I visualize a time when we will be to robots what dogs are to humans.", author: "Claude Shannon" },
    { text: "AI will probably most likely lead to the end of the world, but in the meantime, there'll be great companies.", author: "Sam Altman" },
    { text: "The pace of progress in artificial intelligence is incredibly fast.", author: "Elon Musk" },
    { text: "Artificial intelligence would be the ultimate version of Google.", author: "Larry Page" },
    { text: "We're going to become cyborgs. The question is not whether we'll merge with AI, but how quickly.", author: "Elon Musk" },
    { text: "Success in creating AI would be the biggest event in human history.", author: "Stephen Hawking" },
    { text: "What we want is a machine that can learn from experience.", author: "Alan Turing" },
    { text: "The automation of factories has already decimated jobs in traditional manufacturing.", author: "Bill Gates" },
    { text: "I'm increasingly inclined to think that there should be some regulatory oversight, maybe at the national and international level.", author: "Elon Musk" },
    { text: "Artificial intelligence will reach human levels by around 2029.", author: "Ray Kurzweil" },
    { text: "Everything we love about civilization is a product of intelligence.", author: "Max Tegmark" },

    // Life & Philosophy (25 quotes)
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "Life is really simple, but we insist on making it complicated.", author: "Confucius" },
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { text: "Life isn't about finding yourself. Life is about creating yourself.", author: "George Bernard Shaw" },
    { text: "The unexamined life is not worth living.", author: "Socrates" },
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein" },
    { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
    { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
    { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
    { text: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
    { text: "The way to happiness lies neither in pleasure nor in pain, but in the middle way.", author: "Buddha" },
    { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
    { text: "Life shrinks or expands in proportion to one's courage.", author: "Anaïs Nin" },
    { text: "The meaning of life is to find your gift. The purpose of life is to give it away.", author: "Pablo Picasso" },
    { text: "Yesterday is history, tomorrow is a mystery, today is a gift.", author: "Eleanor Roosevelt" },
    { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
    { text: "Life begins at the end of your comfort zone.", author: "Neale Donald Walsch" },
    { text: "The good life is one inspired by love and guided by knowledge.", author: "Bertrand Russell" },
    { text: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.", author: "Maya Angelou" },
    { text: "The secret to getting ahead is getting started.", author: "Mark Twain" },
    { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" },

    // Hard Work & Success (15 quotes)
    { text: "There is no substitute for hard work.", author: "Thomas Edison" },
    { text: "Success is 1% inspiration and 99% perspiration.", author: "Thomas Edison" },
    { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" },
    { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
    { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { text: "The road to success and the road to failure are almost exactly the same.", author: "Colin R. Davis" },
    { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
    { text: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson" },
    { text: "Success isn't just about what you accomplish in your life, it's about what you inspire others to do.", author: "Unknown" },
    { text: "Don't wish it were easier; wish you were better.", author: "Jim Rohn" },
    { text: "The successful warrior is the average man with laser-like focus.", author: "Bruce Lee" },
    { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },

    // Great Minds & Inspiration (15 quotes)
    { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { text: "Imagination is more important than knowledge.", author: "Albert Einstein" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "Your limitation—it's only your imagination.", author: "Anonymous" },
    { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein" },
    { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
    { text: "What doesn't kill you makes you stronger.", author: "Friedrich Nietzsche" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The mind is everything. What you think you become.", author: "Buddha" }
  ];

  useEffect(() => {
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    };
    
    getRandomQuote();
  }, []);

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

            {/* Inspirational Quote */}
            {currentQuote && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className={`mt-8 p-6 rounded-lg border ${isDark ? 'border-white/20 bg-white/5' : 'border-black/20 bg-black/5'}`}
              >
                <div className="flex items-start gap-4">
                  <Quote className={`w-6 h-6 mt-1 ${isDark ? 'text-white/60' : 'text-black/60'} flex-shrink-0`} />
                  <div>
                    <p className={`text-lg italic leading-relaxed mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      "{currentQuote.text}"
                    </p>
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      — {currentQuote.author}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
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
                className={`group relative w-full px-6 py-3 border-2 ${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'} transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
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
