import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Mail, MapPin, MessageCircle, MessageSquareText, Phone, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { portfolioData } from '../data/data';
import SocialIcons from './SocialIcons';


const initialState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

function Contact() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) nextErrors.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = 'Enter a valid email address.';
    if (!formData.subject.trim()) nextErrors.subject = 'Please add a subject.';
    if (!formData.message.trim()) nextErrors.message = 'Message must be at least 20 characters.';
    else if (formData.message.trim().length < 20) nextErrors.message = 'Message must be at least 20 characters.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // If EmailJS env vars are configured, send a real email; otherwise simulate.
    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
          publicKey,
        );
        setStatus('success');
        setFormData(initialState);
      } catch (err) {
        console.error('EmailJS send failed:', err);
        setStatus('error');
      }
    } else {
      // Fallback: simulate success in dev when env vars are not set
      await new Promise((resolve) => setTimeout(resolve, 1400));
      setStatus('success');
      setFormData(initialState);
    }
  };

  const contactItems = [
    { label: 'Email', value: portfolioData.personal.email, href: `mailto:${portfolioData.personal.email}`, icon: Mail },
    { label: 'Phone', value: portfolioData.personal.phone || 'Not available', href: portfolioData.personal.phone ? `tel:${portfolioData.personal.phone}` : '#', icon: Phone },
    { label: 'Location', value: portfolioData.personal.location, href: '#', icon: MapPin },
  ];

  const socialLinks = portfolioData.social.map((s) => ({ name: s.name, url: s.url }));

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-12 text-center"
      >
        <h2 className="mt-4 text-3xl font-black tracking-[-0.06em] text-slate-900 dark:text-white sm:text-5xl">
          Let&apos;s build something amazing.
        </h2>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.04)] dark:border-slate-700 dark:bg-slate-900/80"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 text-blue-600 dark:text-blue-300">
            <MessageSquareText size={22} />
          </div>

          <h3 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">Contact information</h3>

          {/* Email / Phone / Location */}
          <div className="mt-6 space-y-4">
            {contactItems.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href === '#' ? undefined : href}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-300 hover:bg-white dark:border-slate-700 dark:bg-slate-800/80 dark:hover:border-blue-500/40"
                onClick={href === '#' ? (event) => event.preventDefault() : undefined}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-blue-300">
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{label}</p>
                  <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">{value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Social icons row */}
          <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-700">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Find me on
            </p>
            <SocialIcons socials={socialLinks} size="md" />
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.04)] dark:border-slate-700 dark:bg-slate-900/80"
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Name</label>
              <input
                id="name" name="name" value={formData.name} onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-500/20"
                placeholder="Your name"
              />
              {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
              <input
                id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-500/20"
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Subject</label>
            <input
              id="subject" name="subject" value={formData.subject} onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-500/20"
              placeholder="Project inquiry"
            />
            {errors.subject && <p className="mt-2 text-sm text-red-500">{errors.subject}</p>}
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Message</label>
            <textarea
              id="message" name="message" value={formData.message} onChange={handleChange} rows="5"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-500/20"
              placeholder="Tell me about your project..."
            />
            {errors.message && <p className="mt-2 text-sm text-red-500">{errors.message}</p>}
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-900"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
              {status !== 'loading' && <Send size={16} />}
            </button>

            {status === 'success' && (
              <p className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={18} /> Message sent successfully.
              </p>
            )}
            {status === 'error' && (
              <p className="inline-flex items-center gap-2 text-sm font-medium text-red-500 dark:text-red-400">
                <AlertCircle size={18} /> Failed to send. Please try again.
              </p>
            )}
          </div>
        </motion.form>
      </div>

      <p className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.
      </p>
    </section>
  );
}

export default Contact;
