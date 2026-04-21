import { TrendingUp, ExternalLink, Globe } from "lucide-react";

interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  kpis: string[];
  liveUrl?: string;
  featured: boolean;
}

// This runs on the server — fetches real data from MongoDB
async function getPortfolio(): Promise<PortfolioItem[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/portfolio`, { cache: "no-store" });
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

const gradients = [
  "from-blue-600/20 to-indigo-600/10",
  "from-orange-600/20 to-red-600/10",
  "from-green-600/20 to-teal-600/10",
  "from-slate-600/20 to-gray-600/10",
  "from-purple-600/20 to-pink-600/10",
  "from-cyan-600/20 to-blue-600/10",
];

export default async function PortfolioPage() {
  const projects = await getPortfolio();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="pt-16 mesh-bg">
      <section className="py-28 max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <span className="section-tag block mb-4">Our Work</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Case Studies &<br /><span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-slate-400 text-lg">Real projects. Real results. Every engagement is a story of collaboration, craft, and measurable impact.</p>
        </div>
      </section>

      <section className="pb-12 max-w-7xl mx-auto px-6">
        {projects.length === 0 ? (
          <div className="text-center py-20 glass rounded-2xl">
            <Globe size={48} className="text-brand-700 mx-auto mb-4" />
            <p className="text-slate-400 mb-2">No portfolio items yet.</p>
            <a href="/api/seed" className="text-brand-400 text-sm underline">Click here to seed sample data →</a>
          </div>
        ) : (
          <>
            {featured.length > 0 && (
              <>
                <h2 className="font-heading text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent inline-block" /> Featured Projects
                </h2>
                <div className="grid lg:grid-cols-3 gap-6 mb-12">
                  {featured.map((p, i) => (
                    <div key={p._id} className={`card bg-gradient-to-br ${gradients[i % gradients.length]} hover:scale-[1.02] transition-all duration-300 flex flex-col`}>
                      <div className="h-44 rounded-xl bg-brand-950/50 flex items-center justify-center mb-5 border border-brand-800/20">
                        <Globe size={44} className="text-brand-700" />
                      </div>
                      <span className="section-tag text-xs mb-1">{p.category}</span>
                      <h3 className="font-heading text-lg font-bold text-white mb-2">{p.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.tags.map((t) => <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-brand-900/50 text-brand-300 border border-brand-800/30">{t}</span>)}
                      </div>
                      <div className="border-t border-brand-900/30 pt-3 space-y-1">
                        {p.kpis.map((k) => <div key={k} className="flex items-center gap-2 text-green-400 text-xs"><TrendingUp size={11} /> {k}</div>)}
                      </div>
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-1.5 text-brand-400 text-xs hover:text-brand-300">
                          <ExternalLink size={12} /> View Live
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {rest.length > 0 && (
              <>
                <h2 className="font-heading text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-400 inline-block" /> More Projects
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {rest.map((p, i) => (
                    <div key={p._id} className={`card bg-gradient-to-br ${gradients[(i + 3) % gradients.length]} hover:scale-[1.01] transition-all flex flex-col`}>
                      <span className="section-tag text-xs mb-1">{p.category}</span>
                      <h3 className="font-heading text-lg font-bold text-white mb-2">{p.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {p.tags.map((t) => <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-brand-900/50 text-brand-300 border border-brand-800/30">{t}</span>)}
                      </div>
                      <div className="space-y-1">
                        {p.kpis.map((k) => <div key={k} className="flex items-center gap-2 text-green-400 text-xs"><TrendingUp size={11} /> {k}</div>)}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </section>

      <section className="py-20 max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-heading text-3xl font-bold text-white mb-4">Want Results Like These?</h2>
        <p className="text-slate-400 mb-8">Let&apos;s discuss your project and create a success story together.</p>
        <a href="/contact" className="btn-primary">Start Your Project <ExternalLink size={16} /></a>
      </section>
    </div>
  );
}
