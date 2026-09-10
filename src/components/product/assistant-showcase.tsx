import { useState } from "react";
import { enquiryLink } from "@/lib/contact";
import { ArrowUpRight, Check, CornerDownLeft, FileText, Plus } from "lucide-react";
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
          <p>Invoices are generated from each tenant’s balance and delivered as PDFs in chat. Tenants can ask for another copy. Owners can send one to a tenant or request it for themselves.</p>
          <a href={enquiryLink("The property assistant")} className="text-link">Explore your assistant with Rohit <ArrowUpRight size={17} /></a>
        </div>
        <div className="assistant-console">
          <div className="console-switch" role="group" aria-label="Choose an assistant example">
            <button type="button" aria-pressed={audience === "owner"} onClick={() => { setAudience("owner"); setSelected(0); }}>For the owner</button>
            <button type="button" aria-pressed={audience === "tenant"} onClick={() => { setAudience("tenant"); setSelected(0); }}>For the tenant</button>
          </div>
          <div className="console-conversation" aria-live="polite">
            <div className="console-question"><span>{audience === "owner" ? "YOU" : "TENANT"}</span><h3>{active.question}</h3></div>
            <div className="console-answer" key={audience + selected}><div className="assistant-monogram">F</div><div><strong>FrontDesk</strong><p>{active.answer}</p>{active.invoice && <div className="invoice-attachment"><FileText size={23} strokeWidth={1.4} /><div><strong>Invoice · B-203</strong><span>PDF · Balance due ₹24,500</span></div></div>}<span className="answer-source"><Check size={12} /> {active.source}</span></div></div>
          </div>
          <div className="console-prompts">{choices.map((p, i) => <button type="button" key={p.question} aria-pressed={i === selected} onClick={() => setSelected(i)}>{p.question}<CornerDownLeft size={13} /></button>)}</div>
          <span className="console-disclaimer">Interactive example · Sample data</span>
        </div>
      </div>
      <div className="frame assistant-footnote"><span><Plus size={14} /> Owner-directed actions are reviewed before sending.</span><span>Tenant answers stay within their own account.</span></div>
    </section>
  );
}
