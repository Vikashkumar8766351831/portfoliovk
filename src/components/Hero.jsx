import { motion } from 'framer-motion';
import { ArrowRight, FileText, Mail, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { portfolioData } from '../data/data';
import { images } from '../data/images';
import SocialIcons from './SocialIcons';

function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % portfolioData.personal.heroTitles.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = portfolioData.social
    .filter((s) => ['GitHub', 'LinkedIn', 'Instagram'].includes(s.name))
    .map((s) => ({ name: s.name, url: s.url }));

  // add email separately
  const emailLink = `mailto:${portfolioData.personal.email}`;

  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.14),transparent_30%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">

        {/* ── Left: text content ── */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-700 shadow-sm dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200"
          >
            <Sparkles size={12} />
            {portfolioData.personal.availability}
          </motion.div>

          {/* Heading — slightly smaller */}
          <h1 className="text-3xl font-black tracking-[-0.07em] text-slate-950 sm:text-4xl lg:text-5xl xl:text-6xl dark:text-white">
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
              {portfolioData.personal.name}
            </span>
          </h1>

          {/* Animated title — smaller */}
          <div className="mt-4 flex min-h-[56px] items-center text-2xl font-bold tracking-[-0.04em] text-slate-700 sm:text-3xl lg:text-4xl dark:text-slate-200">
            <span className="mr-2">I build</span>
            <motion.span
              key={portfolioData.personal.heroTitles[titleIndex]}
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
            >
              {portfolioData.personal.heroTitles[titleIndex]}
            </motion.span>
          </div>

          {/* Intro — smaller */}
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            {portfolioData.personal.intro}
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(15,23,42,0.2)] transition hover:-translate-y-0.5 hover:bg-slate-700 dark:bg-white dark:text-slate-900"
            >
              View My Work
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(99,102,241,0.28)] transition hover:-translate-y-0.5"
            >
              <Mail size={16} />
              Let&apos;s Talk
            </a>

            <a
              href={portfolioData.personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 dark:border-slate-600 dark:bg-slate-800/70 dark:text-slate-100 dark:hover:border-blue-400"
            >
              <FileText size={16} />
              My Resume
            </a>
          </div>
        </motion.div>

        {/* ── Right: card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-500/15 via-violet-500/10 to-cyan-500/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/70 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.14)] backdrop-blur-2xl min-h-[600px] dark:border-slate-700 dark:bg-slate-900/60">

            {/* macOS dots */}
            <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-700">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                dev workspace
              </span>
            </div>

            <div className="flex flex-col gap-5">
              {/* Circle image — bigger */}
              <div className="flex items-center justify-center pt-2">
                <div className="relative">
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-indigo-500 blur-sm opacity-75" />
                  <div className="relative h-72 w-72 overflow-hidden rounded-full border-4 border-white shadow-[0_20px_60px_rgba(99,102,241,0.35)] dark:border-slate-800">
                    <img
                      src={images.profile}
                      alt={portfolioData.personal.name}
                      className="h-full w-full object-cover object-top"
                      fetchpriority="high"
                    />
                  </div>
                </div>
              </div>

              <p className="-mt-1 text-center text-sm font-semibold text-slate-700 dark:text-slate-200">
                {portfolioData.personal.role}
              </p>

              {/* Focus + Stack side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/80">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">focus</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">High-impact product experiences</p>
                </div>

                <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/80">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">stack</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {['React', 'Next.js', 'Node.js', 'JS', 'AI'].map((item) => (
                      <span key={item} className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social icons row */}
              <div className="flex items-center justify-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-700/60">
                <SocialIcons socials={socialLinks} size="sm" />
                {/* Email icon */}
                <a
                  href={emailLink}
                  aria-label="Send email"
                  title="Email"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-600 shadow-[0_2px_8px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-[0_8px_24px_rgba(59,130,246,0.3)]"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white/60 p-4 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/50 sm:grid-cols-2 lg:grid-cols-4">
          {portfolioData.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="rounded-[1.4rem] border border-slate-200 bg-slate-50/80 p-5 text-center dark:border-slate-700 dark:bg-slate-800/80"
            >
              <div className="text-3xl font-black tracking-[-0.08em] text-slate-900 dark:text-white">{stat.value}{stat.suffix}</div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
