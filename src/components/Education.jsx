import { motion } from 'framer-motion';
import { Award, ExternalLink, GraduationCap } from 'lucide-react';
import { portfolioData } from '../data/data';

function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">

      {/* ── Degrees ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-black tracking-[-0.06em] text-slate-900 dark:text-white sm:text-5xl">
          A foundation built on learning.
        </h2>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {portfolioData.education.map((item, index) => (
          <motion.article
            key={item.degree}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.04)] dark:border-slate-700 dark:bg-slate-900/80"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 text-blue-600 dark:text-blue-300">
                <GraduationCap size={22} />
              </div>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {item.year}
              </span>
            </div>

            <h3 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">{item.degree}</h3>
            <p className="mt-2 text-base font-medium text-blue-600 dark:text-blue-300">{item.institution}</p>
            <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">{item.grade}</p>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {item.coursework.map((course) => (
                <span
                  key={course}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  {course}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      {/* ── Divider ── */}
      <div className="my-16 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />

      {/* ── Certificates ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-10 text-center"
      >
        <h2 className="text-2xl font-black tracking-[-0.05em] text-slate-900 dark:text-white sm:text-4xl">
          Certifications
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {portfolioData.certificates.map((cert, index) => (
          <motion.article
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] dark:border-slate-700 dark:bg-slate-900/80"
          >
            {/* Certificate preview image */}
            <div className="relative overflow-hidden">
              <img
                src={cert.image}
                alt={cert.title}
                loading="lazy"
                className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              {/* overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              {/* year badge on image */}
              <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                {cert.year}
              </span>
              {/* Award icon on image */}
              <div className="absolute bottom-3 left-4 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/90 text-slate-900 backdrop-blur-sm">
                <Award size={18} />
              </div>
            </div>

            {/* Card body */}
            <div className="p-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{cert.title}</h3>
              <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-300">{cert.issuer}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{cert.description}</p>

              <motion.a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-xs font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.28)] transition-shadow hover:shadow-[0_12px_28px_rgba(79,70,229,0.42)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                View Certificate
                <ExternalLink size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            </div>
          </motion.article>
        ))}
      </div>

    </section>
  );
}

export default Education;
