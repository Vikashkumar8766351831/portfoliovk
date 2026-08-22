import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Atom, Brain, Code2, Coffee, Database, GitBranch, LayoutTemplate, Palette,
  PenTool, Server, Smartphone, Sparkles, TableProperties, Waypoints,
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import { portfolioData } from '../data/data';

const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'Languages', 'Other'];

const ICON_MAP = {
  Atom, Brain, Code2, Coffee, Database, GitBranch, LayoutTemplate, Palette,
  PenTool, Server, Smartphone, Sparkles, TableProperties, Waypoints,
};

function getIcon(name) {
  return ICON_MAP[name] || Code2;
}

/** Animated progress bar that runs like a loading fill when it enters view */
function ProgressBar({ level, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-60px' });

  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 48, damping: 18, mass: 0.6 });
  const width = useTransform(spring, (v) => `${v}%`);

  useEffect(() => {
    let timeout;
    if (isInView) {
      // small delay so stagger feels intentional
      timeout = setTimeout(() => raw.set(level), delay * 1000);
    } else {
      // reset so it re-runs next time it scrolls into view
      raw.set(0);
    }
    return () => clearTimeout(timeout);
  }, [isInView, level, delay, raw]);

  return (
    <div ref={ref} className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700/70">
      {/* shimmer track */}
      <motion.div
        style={{ width }}
        className="relative h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 overflow-hidden"
      >
        {/* running shine effect */}
        <motion.span
          animate={{ x: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut', repeatDelay: 0.6 }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
        />
      </motion.div>
    </div>
  );
}

function Skills() {
  const grouped = categories.map((category) => ({
    category,
    items: portfolioData.skills.filter(
      (skill) =>
        skill.category === category ||
        (category === 'Other' && !['Frontend', 'Backend', 'Database', 'Tools', 'Languages'].includes(skill.category)),
    ),
  }));

  return (
    <section id="skills" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-10 text-center"
      >
        <h2 className="mt-4 text-3xl font-black tracking-[-0.06em] text-slate-900 sm:text-5xl dark:text-white">
          Tools, systems, and craft.
        </h2>
      </motion.div>

      <div className="space-y-10">
        {grouped
          .filter((group) => group.items.length > 0)
          .map((group, groupIndex) => (
            <div key={group.category} className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{group.category}</h3>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {group.items.map((skill, index) => {
                  const Icon = getIcon(skill.icon);
                  const barDelay = index * 0.08 + groupIndex * 0.06;

                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.35, delay: index * 0.04 + groupIndex * 0.06 }}
                      whileHover={{ y: -6 }}
                      className="group rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(59,130,246,0.14)] dark:border-slate-700 dark:bg-slate-900/80"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 text-blue-600 shadow-inner dark:text-blue-300">
                            <Icon size={22} />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{skill.name}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{skill.category}</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{skill.level}%</span>
                      </div>

                      <ProgressBar level={skill.level} delay={barDelay} />

                      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{skill.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Skills;
