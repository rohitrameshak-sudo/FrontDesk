import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { BUSINESS_EMAIL, enquiryLink } from "@/lib/contact";
const faqs = [
  ["Do I have to approve every payment?", "No. In the integrated collection flow, confirmed payments are matched to the tenant and recorded automatically. Confirmation applies to actions you instruct the assistant to take, such as sending a message. Payments recorded outside the integration follow a separate review flow."],
  ["How does it know which tenant paid?", "The payment request or assigned transfer account is linked to a tenant. The connected collection service confirms the payment, and FrontDesk uses that reference to update the corresponding ledger."],
  ["Can I use it without a collection integration?", "Yes. The ledger, invoicing and assistants can support your existing process. Payment screenshots and forwarded bank alerts can be read and prepared for review, while cash payments can be recorded separately."],
  ["What can my tenants ask the assistant?", "They can check their balance, ask for a PDF invoice to be resent in chat, and report maintenance issues. FrontDesk coordinates with the contractor and updates the owner. Tenants can call the voice assistant in their regional language to explain the issue and arrange a time within the same maintenance workflow. Answers are limited to their account. Questions the assistant cannot answer confidently come to you."],
];
export function PageEnd() {
  const [topic, setTopic] = useState("A FrontDesk walkthrough");
  const [copyStatus, setCopyStatus] = useState("");
  return (
    <>
      <section id="faq" className="questions-section frame"><h2>A few practical questions.</h2><div>{faqs.map(([q,a]) => <details key={q}><summary>{q}<Plus size={18} /></summary><p>{a}</p></details>)}</div></section>
      <section id="contact" className="closing-section">
        <div className="frame">
          <div className="closing-top"><span>LET’S PUT IT TO WORK.</span><span>FrontDesk</span></div>
          <h2>Let the payments<br /><em>do the paperwork.</em></h2>
          <div className="closing-bottom"><div className="contact-intro"><h3>See what FrontDesk could take off your plate.</h3><p>Tell Rohit about your properties and the work that takes up your day. Start with a walkthrough or a specific question.</p><a href={enquiryLink()}>{BUSINESS_EMAIL}</a></div><div className="contact-card"><p className="contact-label">What would you like to explore?</p><div className="contact-topics" role="group" aria-label="Enquiry topic">{["A FrontDesk walkthrough", "Automatic rent collection", "The property assistant"].map(t=><button key={t} type="button" aria-pressed={topic===t} onClick={()=>setTopic(t)}>{t}</button>)}</div><a className="primary-action contact-send" href={enquiryLink(topic)}>Email Rohit <ArrowUpRight size={17}/></a><p className="contact-note">Opens a ready-to-edit email in your mail app.</p><button className="contact-copy" type="button" onClick={async()=>{try{await navigator.clipboard.writeText(BUSINESS_EMAIL);setCopyStatus("Email address copied.");}catch{setCopyStatus(`Copy this address: ${BUSINESS_EMAIL}`);}}}>Copy email address</button><span className="contact-status" role="status">{copyStatus}</span></div></div>
          <footer className="page-footer"><span>© {new Date().getFullYear()} FrontDesk</span><nav aria-label="Footer"><a href="#collections">Collections</a><a href="#assistant">Assistant</a><a href="#how">Setup</a></nav><span>Product examples use sample data.</span></footer>
        </div>
      </section>
    </>
  );
}
