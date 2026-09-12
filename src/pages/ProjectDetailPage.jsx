import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, CheckCircle2, Wrench, ArrowRight, ExternalLink } from "lucide-react";
import { fetchProjectById, fetchProjects } from "../services/api";
import { MagneticButton } from "../components/common/MagneticButton";
import { Footer } from "../components/footer/Footer";

export const ProjectDetailPage = ({ soundState }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playSynthSound } = soundState;

  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const load = async () => {
      setLoading(true);
      try {
        const [proj, list] = await Promise.all([
          fetchProjectById(id),
          fetchProjects()
        ]);
        setProject(proj);
        setAllProjects(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center font-mono text-sm text-purple-mist">
        <span className="w-8 h-8 rounded-full border-2 border-purple-glow border-t-transparent animate-spin mb-3" />
        <span>Loading Case Study Experience...</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-heading font-bold text-2xl text-white-pure mb-2">Project Not Found</h2>
        <p className="font-mono text-xs text-white-muted mb-6">The requested case study could not be located.</p>
        <Link to="/" className="px-5 py-2.5 rounded bg-purple-deep text-white-pure font-bold text-xs">
          Return to Portfolio
        </Link>
      </div>
    );
  }

  const nextProject = allProjects.find(p => p.id !== project.id && p.slug !== project.slug) || allProjects[0];

  return (
    <div className="min-h-screen bg-dark-950 text-white-crisp pt-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        
        {/* Back Link */}
        <Link
          to="/"
          onClick={() => playSynthSound("click")}
          className="inline-flex items-center gap-2 font-mono text-xs text-purple-soft hover:text-cyan-neon mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Works</span>
        </Link>

        {/* Title & Metadata */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-[3px] bg-purple-deep/30 border border-purple-glow/40 text-purple-soft font-mono text-xs font-bold">
              {project.category}
            </span>
            <span className="font-mono text-xs text-white-muted">
              Client: <strong className="text-white-crisp">{project.client}</strong>
            </span>
            <span className="text-white-muted">•</span>
            <span className="font-mono text-xs text-white-muted">Year: {project.year}</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white-pure tracking-tight leading-tight mb-6">
            {project.title}
          </h1>

          <p className="text-white-dim text-lg leading-relaxed max-w-3xl">
            {project.fullDescription}
          </p>
        </div>

        {/* Main Cover Image */}
        <div className="aspect-video rounded-[5px] overflow-hidden border border-white/15 bg-black shadow-2xl mb-12 relative">
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-white-crisp">
            <span className="bg-dark-950/80 px-3 py-1 rounded-[3px] border border-white/10">
              Role: {project.role}
            </span>
            <span className="bg-cyan-deep/80 text-cyan-ice px-3 py-1 rounded-[3px] font-bold">
              High-Impact Production
            </span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-purple-mist font-bold block mb-4">
            // QUANTIFIABLE BUSINESS IMPACT
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {project.metrics?.map((metric, i) => (
              <div key={i} className="glass-panel p-5 rounded-[5px] border border-cyan-neon/30 bg-dark-900/90 text-center">
                <span className="font-heading font-black text-2xl sm:text-3xl text-gradient-purple-cyan block mb-1">
                  {metric.value}
                </span>
                <span className="font-mono text-xs text-white-muted uppercase">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables & Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="glass-panel p-6 rounded-[5px] border border-white/15 bg-dark-900/90">
            <span className="font-mono text-xs uppercase tracking-widest text-cute-pink font-bold block mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cute-pink" />
              Key Deliverables
            </span>
            <div className="space-y-2.5">
              {project.deliverables?.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-white-crisp">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-glow" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-[5px] border border-white/15 bg-dark-900/90">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-neon font-bold block mb-4 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-cyan-neon" />
              Tools & Software
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tools?.map((tool, i) => (
                <span key={i} className="px-3 py-1.5 rounded-[4px] bg-dark-800 border border-white/15 text-xs font-mono text-white-crisp">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Next Project & Inquiry CTA */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => {
              navigate(`/project/${nextProject.slug || nextProject.id}`);
              playSynthSound("click");
            }}
            className="group flex items-center gap-3 text-left p-4 rounded-[5px] bg-dark-900 border border-white/15 hover:border-purple-glow transition-all"
          >
            <div>
              <span className="font-mono text-[10px] text-purple-soft uppercase block">NEXT CASE STUDY</span>
              <span className="font-heading font-bold text-sm text-white-pure group-hover:text-cyan-neon transition-colors">
                {nextProject.title}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-purple-glow group-hover:translate-x-1 transition-transform" />
          </button>

          <MagneticButton
            href="/#contact"
            onClick={() => playSynthSound("click")}
            variant="primary"
            className="text-xs px-6 py-3.5 w-full sm:w-auto"
          >
            <span>Inquire About Similar Scope</span>
          </MagneticButton>
        </div>

      </div>

      <Footer soundState={soundState} />
    </div>
  );
};
