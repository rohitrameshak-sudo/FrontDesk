import { useEffect, useRef } from "react";
import { Mail, MessageCircle, X, ArrowUpRight } from "lucide-react";
import { MAIL_LINK, WHATSAPP_LINK } from "@/lib/contact";

export function ContactChoices() {
  return <div className="contact-choices"><a href={MAIL_LINK}><Mail size={22}/><span>Mail</span><ArrowUpRight size={17}/></a><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"><MessageCircle size={22}/><span>WhatsApp</span><ArrowUpRight size={17}/></a></div>;
}
export function ContactOptions() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const open = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a[href="#contact-options"]') : null;
      if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      trigger.current = link as HTMLElement;
      dialog.current?.showModal();
    };
    document.addEventListener("click", open);
    return () => document.removeEventListener("click", open);
  }, []);
  return <dialog id="contact-options" ref={dialog} className="contact-dialog" aria-labelledby="contact-title" onClose={()=>trigger.current?.focus()} onClick={event=>{if(event.target===event.currentTarget)dialog.current?.close();}}><div className="contact-dialog-inner"><button type="button" className="contact-close" aria-label="Close contact options" onClick={()=>dialog.current?.close()}><X size={20}/></button><h2 id="contact-title">Let’s talk.</h2><p>Choose how you’d like to reach Rohit.</p><ContactChoices/></div></dialog>;
}
