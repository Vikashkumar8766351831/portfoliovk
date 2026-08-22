import { motion } from 'framer-motion';
import { GitBranch, Globe, Star, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { portfolioData } from '../data/data';

function GitHubStats() {
  const [stats, setStats] = useState({
    followers: portfolioData.github.fallback.followers,
    publicRepos: portfolioData.github.fallback.publicRepos,
    stars: portfolioData.github.fallback.stars,
    contributions: portfolioData.github.fallback.contributions,
  });

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${portfolioData.github.username}`);
        if (!response.ok) return;

        const data = await response.json();
        setStats({
          followers: data.followers || portfolioData.github.fallback.followers,
          publicRepos: data.public_repos || portfolioData.github.fallback.publicRepos,
          stars: portfolioData.github.fallback.stars,
          contributions: data.bio ? 'Active' : portfolioData.github.fallback.contributions,
        });
      } catch (error) {
        console.error('GitHub API failed, using fallback data', error);
      }
    };

    fetchGitHub();
  }, []);

  const cards = [
    { label: 'Followers', value: stats.followers, icon: Users },
    { label: 'Public repos', value: stats.publicRepos, icon: GitBranch },
    { label: 'Stars', value: stats.stars, icon: Star },
    { label: 'Activity', value: stats.contributions, icon: Globe },
  ];

  return (
    <section id="github" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-12 text-center"
      >
        <h2 className="mt-4 text-3xl font-black tracking-[-0.06em] text-slate-900 dark:text-white sm:text-5xl">Developer activity and public work.</h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.04)] dark:border-slate-700 dark:bg-slate-900/80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 text-blue-600 dark:text-blue-300">
                <Icon size={22} />
              </div>
              <p className="mt-5 text-3xl font-black tracking-[-0.08em] text-slate-900 dark:text-white">{card.value}</p>
              <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">{card.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default GitHubStats;
