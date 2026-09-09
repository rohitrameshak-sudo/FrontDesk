import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
const links = [
  { href: "#collections", label: "Collections" },
  { href: "#assistant", label: "The assistant" },
  { href: "#how", label: "Setup" },
];
export function Wordmark({ className = "" }: { className?: string }) {
  return <span className={`wordmark ${className}`}>FrontDesk<span className="wordmark-period">.</span></span>;
}
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKey = (event: KeyboardEvent) => { if(event.key === "Escape") setOpen(false); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);
  return (
    <header className={`site-nav ${scrolled || open ? "scrolled" : ""}`}>
      <div className="nav-inner frame">
        <a href="#top" aria-label="FrontDesk home" onClick={() => setOpen(false)}><Wordmark /></a>
        <nav className="desktop-links" aria-label="Main navigation">{links.map(l=><a key={l.href} href={l.href}>{l.label}</a>)}</nav>
        <div className="nav-actions"><a className="nav-contact" href="#contact">Let’s talk <ArrowUpRight size={14} /></a><button className="menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{open ? <X size={18} /> : <Menu size={18} />}</button></div>
      </div>
      {open && <nav id="mobile-navigation" aria-label="Mobile navigation">{links.map(l=><a key={l.href} href={l.href} onClick={()=>setOpen(false)}>{l.label}<ArrowUpRight size={15} /></a>)}<a href="#contact" onClick={()=>setOpen(false)}>Discuss your setup<ArrowUpRight size={15} /></a></nav>}
    </header>
  );
}
