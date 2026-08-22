import { motion } from 'framer-motion';

const techs = [
  'React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind', 'Node.js', 'Express', 'MongoDB',
  'SQL', 'Git', 'GitHub', 'Figma', 'Next.js', 'GraphQL', 'Firebase', 'Python'
];

function TechMarquee() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/70 py-6 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/60">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent dark:from-slate-950" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent dark:from-slate-950" />

        <div className="flex min-w-max gap-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {[0, 1].map((row) => (
            <motion.div
              key={row}
              animate={{ x: row % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
              transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
              className="flex min-w-max gap-4 px-2"
            >
              {[...techs, ...techs].map((tech, index) => (
                <span
                  key={`${row}-${tech}-${index}`}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 whitespace-nowrap transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechMarquee;
