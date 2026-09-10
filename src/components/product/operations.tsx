import { Plus } from "lucide-react";
import { enquiryLink } from "@/lib/contact";
export function Operations() {
  return (
    <section className="operations-section" id="operations">
      <div className="frame operations-layout">
        <div><span className="section-note">THE REST OF THE MONTH</span><h2>Still your business.<br /><em>Less of your admin.</em></h2></div>
        <div className="operations-list">
          <details open><summary><span>01</span>Invoices, delivered<Plus size={18} /></summary><p>FrontDesk generates a PDF invoice from the tenant’s balance, including arrears, and sends it in chat. A simple request brings it back—whether the tenant needs another copy or you need an invoice sent to them or to you.</p></details>
          <details><summary><span>02</span>Repairs, coordinated<Plus size={18} /></summary><p>A tenant reports an issue in chat. FrontDesk contacts the contractor, coordinates a visit and passes the arrangements to the owner. Regional-language voice support is part of this same workflow, so tenants can call to explain the issue and work out a suitable time.</p></details>
          <details><summary><span>03</span>Payments outside the integration<Plus size={18} /></summary><p>Prefer your existing collection process? Use screenshot reading, forwarded bank alerts or recorded cash payments instead. Those entries follow a review flow before they reach the ledger.</p></details>
        </div>
      </div>
      <div className="frame maintenance-journey">
        <div className="maintenance-heading"><span className="section-note">ONE CONNECTED REPAIR WORKFLOW</span><h3>Reported. Arranged.<br /><em>Kept in the loop.</em></h3><p>From the first message to a time that works, FrontDesk keeps the conversation moving.</p><span className="voice-status">Regional-language voice support · Available now</span></div>
        <ol><li><span>01</span><div><h4>The tenant reports the issue</h4><p>A message starts the request. Tenants can also call and explain it in their regional language.</p></div></li><li><span>02</span><div><h4>FrontDesk coordinates the visit</h4><p>The assistant contacts the contractor and works out a suitable time. Call details feed into the same request.</p></div></li><li><span>03</span><div><h4>The owner gets the details</h4><p>The issue, contractor and proposed time come together in one update.</p></div></li></ol>
      </div>
    </section>
  );
}
export function Setup() {
  return (
    <section id="how" className="setup-section frame">
      <div className="setup-heading"><span className="section-note">IMPLEMENTED FOR YOUR BUSINESS</span><h2>Your properties.<br /><em>Your collection setup.</em></h2></div>
      <div className="setup-copy"><p>We bring across your opening balances, connect a suitable payment provider, and set up the owner and tenant assistants around your workflow.</p><p className="setup-secondary">Provider availability and account eligibility are confirmed during setup. Already collecting elsewhere? Start with the ledger and assistant.</p><a href={enquiryLink()} className="text-link">Plan your setup with Rohit <span aria-hidden="true">↗</span></a></div>
    </section>
  );
}
