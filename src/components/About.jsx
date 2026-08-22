import { motion } from 'framer-motion';
import { BriefcaseBusiness, Compass, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/data';

const infoCards = [
  { label: 'Education', value: portfolioData.education[0].degree, icon: GraduationCap },
  { label: 'Location', value: portfolioData.personal.location, icon: MapPin },
  { label: 'Role', value: 'MERN Stack Developer / AI-Powered Full-Stack Developer', icon: BriefcaseBusiness },
  { label: 'Status', value: portfolioData.personal.currentStatus, icon: Sparkles },
];

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-10 text-center"
      >
        <h2 className="mt-4 text-3xl font-black tracking-[-0.06em] text-slate-900 sm:text-5xl dark:text-white">Designing thoughtful digital experiences.</h2>
      </motion.div>

      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55 }}
          className="space-y-6"
        >
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900/80">
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
              I&apos;m a product-minded developer focused on building digital experiences that feel premium, intuitive, and easy to trust.
              My process blends interface craft, frontend architecture, and a sharp eye for product detail — from first concept to polished release.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {infoCards.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/80">
                  <div className="mb-3 inline-flex rounded-full bg-blue-100 p-2 text-blue-700 dark:bg-blue-500/10 dark:text-blue-200">
                    <Icon size={18} />
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{label}</p>
                  <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-900/80">
            <div className="flex items-center gap-3">
              <Compass className="text-blue-600 dark:text-blue-300" size={22} />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Career objective</h3>
            </div>
            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
              {portfolioData.personal.objective}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
