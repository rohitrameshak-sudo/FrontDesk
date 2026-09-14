import { useState } from "react";
import { enquiryLink } from "@/lib/contact";
import { ArrowUpRight, Check, CornerDownLeft, FileText, Plus, MessageSquare, Building2 } from "lucide-react";
const prompts = [
  { question: "Who still owes rent?", answer: "R. Nair in B-203 has ₹24,500 outstanding. Priya’s payment has cleared A-104. Kadam & Sons is also paid up.", source: "Tenant ledger · September", invoice: false },
  { question: "Kadam & Sons paid ₹38,000 by cheque.", answer: "₹38,000 has been added to Kadam & Sons’ ledger for Shop 02, dated 9 September 2026. The payment method is recorded as cheque.", source: "Shop 02 · Ledger updated", invoice: false },
  { question: "Send Nair his invoice.", answer: "R. Nair’s invoice is ready to send to him, with ₹24,500 outstanding. Here’s the PDF for your review.", source: "B-203 · Send to tenant", invoice: true },
  { question: "Send me Nair’s invoice.", answer: "Here’s R. Nair’s invoice for B-203. The balance due is ₹24,500.", source: "B-203 · Requested by owner", invoice: true },
];
const tenantPrompts = [
  { question: "What’s my balance?", answer: "Your outstanding balance is ₹24,500 for B-203. Your invoice includes the charges and payments recorded in your ledger.", source: "B-203 · Your account", invoice: false },
  { question: "When is my next rent increment?", answer: "Hi Priya, your next rent increment is scheduled for 1 January 2027. It is a 5% increase, taking your monthly rent from ₹42,000 to ₹44,100.", source: "A-104 · Rent schedule", invoice: false },
  { question: "Can you resend my invoice?", answer: "Of course. Here’s your invoice again, with ₹24,500 outstanding. You can find the PDF right here in our chat.", source: "B-203 · Invoice resent", invoice: true },
  { question: "The kitchen tap is leaking.", answer: "I’ve recorded the issue for B-203. I’ll contact the plumber and coordinate a visit, then pass the details to your owner.", source: "B-203 · Maintenance coordination", invoice: false },
];
export function AssistantShowcase() {
  const [audience, setAudience] = useState<"owner" | "tenant">("owner");
  const [selected, setSelected] = useState(0);
  const choices = audience === "owner" ? prompts : tenantPrompts;
  const active = choices[selected];
  return (
    <section id="assistant" className="assistant-section">
      <div className="frame assistant-composition">
        <div className="assistant-copy">
          <span className="section-note">THE PERSONAL ASSISTANT</span>
          <h2>Your books.<br /><em>Just ask.</em></h2>
          <p>Ask about a balance. Record a cheque. Resend an invoice.<br />Your assistant already knows the books.</p>
          <a href={enquiryLink()} className="text-link">Explore your assistant with Rohit <ArrowUpRight size={17} /></a>
        </div>
        <div className="assistant-landscape">
        <div className="assistant-window">
          <aside className="assistant-sidebar">
            <div className="window-controls" aria-hidden="true"><i /><i /><i /></div>
            <div className="workspace-label"><Building2 size={19} /><div>Green Court<span>Property workspace</span></div></div>
            <span className="sidebar-heading">CONVERSATIONS</span>
            <button type="button" className={audience === "owner" ? "sidebar-active" : ""} onClick={() => { setAudience("owner"); setSelected(0); }}><MessageSquare size={17} /><span>The owner’s desk<small>Balances, payments & invoices</small></span></button>
            <button type="button" className={audience === "tenant" ? "sidebar-active" : ""} onClick={() => { setAudience("tenant"); setSelected(0); }}><MessageSquare size={17} /><span>The tenant’s desk<small>Rent, requests & repairs</small></span></button>
            <div className="sidebar-account"><img src="/frontdesk-logo.png" alt="" width="32" height="32" /><span>FrontDesk<small>Your property assistant</small></span></div>
          </aside>
        <div className="assistant-console">
          <div className="console-title"><span>{audience === "owner" ? "The owner’s desk" : "The tenant’s desk"}</span><span>Interactive preview</span></div>
          <div className="console-switch" role="group" aria-label="Choose an assistant example">
            <button type="button" aria-pressed={audience === "owner"} onClick={() => { setAudience("owner"); setSelected(0); }}>For the owner</button>
            <button type="button" aria-pressed={audience === "tenant"} onClick={() => { setAudience("tenant"); setSelected(0); }}>For the tenant</button>
          </div>
          <div className="console-conversation" aria-live="polite">
            <div className="console-question"><span>{audience === "owner" ? "YOU" : "TENANT"}</span><h3>{active.question}</h3></div>
            <div className="console-answer" key={audience + selected}><img className="assistant-monogram" src="/frontdesk-logo.png" alt="" width="32" height="32" /><div><strong>FrontDesk</strong><p>{active.answer}</p>{active.invoice && <div className="invoice-attachment"><FileText size={23} strokeWidth={1.4} /><div><strong>Invoice · B-203</strong><span>PDF · Balance due ₹24,500</span></div></div>}<span className="answer-source"><Check size={12} /> {active.source}</span></div></div>
          </div>
          <div className="console-prompts"><span className="prompt-label">Try asking</span>{choices.map((p, i) => <button type="button" key={p.question} aria-pressed={i === selected} onClick={() => setSelected(i)}>{p.question}<CornerDownLeft size={14} /></button>)}</div>
          <span className="console-disclaimer">Sample conversations · No real account data</span>
        </div>
        </div>
        </div>
      </div>
      <div className="frame assistant-footnote"><span><Plus size={14} /> Owner-directed actions are reviewed before sending.</span><span>Tenant answers stay within their own account.</span></div>
    </section>
  );
}
