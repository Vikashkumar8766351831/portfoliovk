import { motion } from 'framer-motion';
import {
  Atom, BarChart3, Code2, LayoutTemplate, Palette, ServerCog, Smartphone,
} from 'lucide-react';
import { portfolioData } from '../data/data';

const ICON_MAP = {
  Atom, BarChart3, Code2, LayoutTemplate, Palette, ServerCog, Smartphone,
};

function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-12 text-center"
      >
        <h2 className="mt-4 text-3xl font-black tracking-[-0.06em] text-slate-900 dark:text-white sm:text-5xl">Specialized digital product support.</h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {portfolioData.services.map((service, index) => {
          const Icon = ICON_MAP[service.icon] || Code2;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ y: -8 }}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900/80"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 text-blue-600 dark:text-blue-300">
                <Icon size={24} />
              </div>
              <h3 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">{service.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{service.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Services;
