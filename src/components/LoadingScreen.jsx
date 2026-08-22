import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function LoadingScreen({ loading }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) return undefined;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 6;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-white dark:bg-slate-950"
        >
          <div className="w-full max-w-sm px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-xl font-black text-white shadow-[0_20px_40px_rgba(99,102,241,0.25)]">
                V
              </div>
              <p className="mt-5 text-2xl font-black tracking-[-0.06em] text-slate-900 dark:text-white">Vikash Kumar</p>
            </motion.div>

            <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"
              />
            </div>
            <p className="mt-4 text-center text-sm font-medium text-slate-600 dark:text-slate-300">{progress}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
