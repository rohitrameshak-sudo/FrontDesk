import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, CheckCheck } from "lucide-react";
import { enquiryLink } from "@/lib/contact";
const GLSLHills = lazy(() => import("@/components/ui/glsl-hills").then(m => ({ default: m.GLSLHills })));

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [atTop, setAtTop] = useState(true);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      const host = stageRef.current;
      if (!host) return;
      const distance = host.offsetHeight - window.innerHeight;
      const progress = reduced.matches ? 0 : Math.min(1, Math.max(0, -host.getBoundingClientRect().top / Math.max(distance, 1)));
      host.style.setProperty("--journey", String(progress));
      setAtTop(progress < 0.06);
    };
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return (
    <div id="top" className="hero-scroll-stage" ref={stageRef}><section className="fd-hero">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-terrain" aria-hidden="true">
        <Suspense fallback={null}><GLSLHills width="100%" height="100%" speed={0.25} /></Suspense>
      </div>
      <div className="hero-content frame">
        <a href="#collections" className="hero-receipt fd-rise" aria-label="See how a tenant payment updates the ledger">
          <img src="/frontdesk-logo.png" alt="" width="40" height="40" />
          <span><span className="receipt-heading">Payment received <span>Just now</span></span><strong>₹42,000 <span>· Priya Menon, A-104</span></strong><span className="receipt-status"><CheckCheck size={14} /> Matched. Ledger updated.</span></span>
        </a>
        <h1 className="hero-title fd-rise"><span className="hero-title-soft">Rent paid.</span><br />Books done.</h1>
        <div className="hero-support">
          <p className="hero-description fd-rise">Automatic rent collection and reconciliation.<br className="hidden sm:block" /> An assistant for everything else.</p>
          <div className="hero-actions">
            <a href={enquiryLink()} className="primary-action">Get a personal walkthrough <ArrowUpRight size={16} /></a>
            <a href="#collections" className="secondary-action">See it happen <ArrowDown size={16} /></a>
          </div>
        </div>
      </div>
      <a href="#collections" className={`hero-scroll ${atTop ? "" : "is-hidden"}`} aria-label="Scroll to the collection demo" tabIndex={atTop ? 0 : -1}>
        <span>EXPLORE FRONTDESK</span><span className="fd-cue-line" />
      </a>
    </section></div>
  );
}
