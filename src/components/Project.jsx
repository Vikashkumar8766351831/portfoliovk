import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, GitBranch, X } from 'lucide-react';
import { portfolioData } from '../data/data';

const FILTERS = ['All', 'Frontend', 'Full Stack', 'React', 'Data Analytics'];

function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return portfolioData.projects;
    if (activeFilter === 'React')
      return portfolioData.projects.filter((p) => p.tech.includes('React'));
    return portfolioData.projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      {/* Filter pills */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActiveFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeFilter === f
                ? 'bg-slate-900 text-white shadow-lg dark:bg-white dark:text-slate-900'
                : 'border border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_22px_60px_rgba(15,23,42,0.07)] dark:border-slate-700 dark:bg-slate-900/80"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-80" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
                    >
                      View <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-300"
                  >
                    <GitBranch size={16} /> GitHub
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-300"
                  >
                    Live preview <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-700">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">
                    {selectedProject.category}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:text-slate-900 dark:border-slate-700 dark:text-slate-200"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                loading="lazy"
                className="h-72 w-full object-cover"
              />

              <div className="space-y-6 p-6">
                <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                  {selectedProject.description}
                </p>

                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">Features</h4>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {selectedProject.features.map((f) => (
                      <li key={f} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Challenge</h4>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {selectedProject.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Solution</h4>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
                  >
                    <GitBranch size={16} /> GitHub
                  </a>
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
                  >
                    Live Demo <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Project() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        className="mb-10 text-center"
      >
        <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-slate-900 dark:text-white sm:text-5xl">
          Built to look sharp and perform deeply.
        </h2>
      </motion.div>

      <ProjectsGrid />
    </section>
  );
}

export default Project;
