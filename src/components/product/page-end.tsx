import { Plus } from "lucide-react";
import { ContactChoices } from "@/components/product/contact-options";
const faqs = [
  ["Do I have to approve every payment?", "No. In the integrated collection flow, confirmed payments are matched to the tenant and recorded automatically. Confirmation applies to actions you instruct the assistant to take, such as sending a message. Payments recorded outside the integration follow a separate review flow."],
  ["How does it know which tenant paid?", "The payment request or assigned transfer account is linked to a tenant. The connected collection service confirms the payment, and FrontDesk uses that reference to update the corresponding ledger."],
  ["Can I use it without a collection integration?", "Yes. The ledger, invoicing and assistants can support your existing process. Payment screenshots and forwarded bank alerts can be read and prepared for review, while cash payments can be recorded separately."],
  ["What can my tenants ask the assistant?", "They can check their balance, ask for a PDF invoice to be resent in chat, and report maintenance issues. FrontDesk coordinates with the contractor and updates the owner. Tenants can call the voice assistant in their regional language to explain the issue and arrange a time within the same maintenance workflow. Answers are limited to their account. Questions the assistant cannot answer confidently come to you."],
];
export function PageEnd() {
  return (
    <>
      <section id="faq" className="questions-section frame"><h2>A few practical questions.</h2><div>{faqs.map(([q,a]) => <details key={q}><summary>{q}<Plus size={18} /></summary><p>{a}</p></details>)}</div></section>
      <section id="contact" className="closing-section">
        <div className="frame">
          <div className="closing-top"><span>LET’S PUT IT TO WORK.</span><span>FrontDesk</span></div>
          <h2>Let the payments<br /><em>do the paperwork.</em></h2>
          <div className="closing-bottom"><div className="contact-intro"><h3>Let’s talk about your properties.</h3><p>Reach Rohit by mail or WhatsApp.</p></div><ContactChoices /></div>
          <footer className="page-footer"><span>© {new Date().getFullYear()} FrontDesk</span><nav aria-label="Footer"><a href="#collections">Collections</a><a href="#assistant">Assistant</a><a href="#how">Setup</a></nav><span>Product examples use sample data.</span></footer>
        </div>
      </section>
    </>
  );
}
