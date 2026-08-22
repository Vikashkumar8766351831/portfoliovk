import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, MoonStar, SunMedium, X } from 'lucide-react';
import { portfolioData } from '../data/data';

// NAV_ITEMS must exactly match the section IDs in the DOM
const NAV_ITEMS = [
  { label: 'Home',      id: 'home' },
  { label: 'About',     id: 'about' },
  { label: 'Skills',    id: 'skills' },
  { label: 'Projects',  id: 'projects' },
  { label: 'Education', id: 'education' },
  { label: 'Services',  id: 'services' },
  { label: 'Contact',   id: 'contact' },
];

// IDs to observe — every section that exists in the DOM
const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

function Navbar({ theme, toggleTheme }) {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [displayedName, setDisplayedName] = useState('');
  const [isDeletingName, setIsDeletingName] = useState(false);

  // one ref per desktop nav button to measure its position
  const btnRefs = useRef({});
  const navRef  = useRef(null);

  // indicator { left, width } relative to the nav container
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // Type and erase the name continuously without affecting the navbar motion.
  useEffect(() => {
    const name = portfolioData.personal.name;
    const isComplete = displayedName === name;
    const isEmpty = displayedName === '';
    const delay = isComplete && !isDeletingName ? 1800 : isEmpty && isDeletingName ? 650 : isDeletingName ? 120 : 180;

    const timeout = window.setTimeout(() => {
      if (isComplete && !isDeletingName) {
        setIsDeletingName(true);
      } else if (isEmpty && isDeletingName) {
        setIsDeletingName(false);
      } else {
        setDisplayedName((current) => (
          isDeletingName ? current.slice(0, -1) : name.slice(0, current.length + 1)
        ));
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [displayedName, isDeletingName]);

  // ─── IntersectionObserver — owned here, not in App ───────────────────────
  useEffect(() => {
    // Map of sectionId → intersectionRatio, updated on every callback
    const ratioMap = {};

    const observer = new IntersectionObserver(
      (entries) => {
        // Update the ratio map for every entry that fired
        entries.forEach((entry) => {
          ratioMap[entry.target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        });

        // Pick the section with the highest visible ratio
        const best = Object.entries(ratioMap).sort((a, b) => b[1] - a[1])[0];
        if (best && best[1] > 0) {
          setActiveSection(best[0]);
        }
      },
      {
        root: null,
        // Top offset accounts for fixed navbar (~80px); -50% bottom means the
        // section must cross the upper-middle of the viewport to become active.
        rootMargin: '-80px 0px -45% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        ratioMap[id] = 0;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  // ─── Indicator position — recalculate when activeSection or resize ────────
  useEffect(() => {
    function update() {
      const btn = btnRefs.current[activeSection];
      const nav = navRef.current;
      if (!btn || !nav) return;

      const bRect = btn.getBoundingClientRect();
      const nRect = nav.getBoundingClientRect();
      setIndicator({ left: bRect.left - nRect.left, width: bRect.width });
    }

    // Small rAF so the DOM has settled after any re-render
    const raf = requestAnimationFrame(update);
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', update);
    };
  }, [activeSection]);

  // ─── Click handler ────────────────────────────────────────────────────────
  const handleNavigate = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);   // immediate visual feedback
    setMobileOpen(false);
  };

  const isActive = (id) => activeSection === id;

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`flex items-center justify-between rounded-full border px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 ${
            activeSection !== 'home'
              ? 'border-white/50 bg-white/65 dark:border-white/10 dark:bg-slate-900/60'
              : 'border-white/40 bg-white/20 dark:border-white/10 dark:bg-slate-900/20'
          }`}
        >
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className="flex shrink-0 items-center gap-3 text-left md:w-56"
            aria-label="Go to home"
          >
            <div className="flex items-center gap-3">
              <p className="my-name text-2xl font-bold">
                {displayedName}
                </p>
                </div>
                </button>

          {/* ── Desktop nav ── */}
          <nav ref={navRef} className="relative hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map(({ label, id }) => (
              <button
                key={id}
                ref={(el) => { btnRefs.current[id] = el; }}
                type="button"
                onClick={() => handleNavigate(id)}
                className={`relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  isActive(id)
                    ? 'text-blue-600 dark:text-blue-300'
                    : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}

            {/* Single animated underline — slides between nav items */}
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-0.5 h-[1.5px] rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
              animate={{ left: indicator.left, width: indicator.width }}
              transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.7 }}
            />
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {theme === 'dark' ? <SunMedium size={18} /> : <MoonStar size={18} />}
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 md:hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="mx-4 mt-2 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-xl md:hidden dark:border-slate-700 dark:bg-slate-900/95"
          >
            <div className="space-y-1">
              {NAV_ITEMS.map(({ label, id }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleNavigate(id)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                    isActive(id)
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{label}</span>
                  {isActive(id) ? (
                    <span className="h-1.5 w-4 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                  ) : (
                    <ArrowRight size={15} className="text-slate-400" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-3 border-t border-slate-100 pt-3 dark:border-slate-800">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
              >
                {theme === 'dark' ? <SunMedium size={16} /> : <MoonStar size={16} />}
                {theme === 'dark' ? 'Light' : 'Dark'} mode
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
