import { useState } from "react";
import type { ReactNode } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import {
  AssistantMock,
  InvoiceMock,
  LedgerMock,
  RepairsMock,
  ScreenshotMock,
} from "@/components/site/mocks";
import { cn } from "@/lib/utils";

// --- Data for the feature accordion ---
type AccordionEntry = {
  id: number;
  title: string;
  headline: string;
  body: string;
  gradient: string;
  visual: ReactNode;
};

const accordionItems: AccordionEntry[] = [
  {
    id: 1,
    title: "Payment screenshots",
    headline: "It reads the screenshot for you",
    body: "A transfer screenshot arrives. FrontDesk reads the amount, date and reference, ready for you to review and post. Bank alerts and cheque photos work too.",
    gradient: "from-[#14332a] via-[#0f2620] to-[#0b1a16]",
    visual: <ScreenshotMock />,
  },
  {
    id: 2,
    title: "A ledger that holds",
    headline: "One running account per tenant",
    body: "Every charge. Every payment. One clear balance. Payments settle the oldest rent first, with an audit trail behind every entry.",
    gradient: "from-[#1d1b16] via-[#141210] to-[#0b0a09]",
    visual: <LedgerMock />,
  },
  {
    id: 3,
    title: "Invoices & reminders",
    headline: "The month goes out on schedule",
    body: "PDF invoices go out on your schedule, with arrears included. Reminders follow, and rent revisions are tracked automatically.",
    gradient: "from-[#241f18] via-[#171310] to-[#0b0a09]",
    visual: <InvoiceMock />,
  },
  {
    id: 4,
    title: "Ask your books",
    headline: "Answers from the real ledger",
    body: "Who owes what? What came in last month? Ask in plain language and get answers from your actual books.",
    gradient: "from-[#132b2f] via-[#0f1f22] to-[#0a1416]",
    visual: <AssistantMock />,
  },
  {
    id: 5,
    title: "Repairs, handled",
    headline: "From complaint to confirmed slot",
    body: "A tenant reports a fault. FrontDesk logs it, finds the right contractor and coordinates a slot after your approval.",
    gradient: "from-[#2a201a] via-[#191410] to-[#0b0a09]",
    visual: <RepairsMock />,
  },
];

// A single responsive accordion: hover, click, or use the keyboard.
export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = accordionItems[activeIndex];

  return (
    <section className="feature-section">
      <div className="page-width">
        <div className="section-intro reveal">
          <div>
            <span className="eyebrow">01 / THE EVERYDAY, TAKEN CARE OF</span>
            <h2>Less keeping up.<br /><span>More moving on.</span></h2>
          </div>
          <p>From the first invoice to the last payment.<br className="hidden sm:block" /> One place for everything in between.</p>
        </div>
        <div className="feature-accordion reveal" aria-label="Explore FrontDesk features">
          {accordionItems.map((item, index) => {
            const selected = index === activeIndex;
            return (
              <article key={item.id} className={cn("feature-panel", selected && "active")}
                onMouseEnter={() => {
                  if (window.matchMedia("(hover: hover)").matches) setActiveIndex(index);
                }}>
                <div className={cn("feature-surface absolute inset-0 bg-gradient-to-br", item.gradient)} />
                <button type="button" className="feature-trigger"
                  id={`feature-trigger-${item.id}`}
                  aria-expanded={selected} aria-controls={`feature-panel-${item.id}`}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => {
                    if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
                    event.preventDefault();
                    const next = event.key === "Home" ? 0 : event.key === "End" ? 4 :
                      (index + (["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : 4)) % 5;
                    setActiveIndex(next);
                    document.getElementById(`feature-trigger-${next + 1}`)?.focus();
                  }}>
                  <span className="feature-number">0{item.id}</span>
                  <span className="feature-name">{item.title}</span>
                  <span className="feature-toggle">{selected ? <ArrowUpRight size={18} /> : <Plus size={18} />}</span>
                </button>
                <div id={`feature-panel-${item.id}`} role="region" aria-labelledby={`feature-trigger-${item.id}`}
                  aria-hidden={!selected} inert={!selected} className="feature-preview">
                  <div className="feature-preview-inner">{item.visual}</div>
                  <span className="feature-example-label">ILLUSTRATIVE PRODUCT PREVIEW</span>
                </div>
              </article>
            );
          })}
        </div>
        <div className="feature-caption" aria-live="polite" aria-atomic="true">
          <h3>{active.headline}</h3>
          <p>{active.body}</p>
          <span className="feature-count" aria-label="Illustrative feature preview">0{activeIndex + 1} / 05</span>
        </div>
      </div>
    </section>
  );
}
