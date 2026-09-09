import { ArrowRight } from "lucide-react";

export function Problem() {
  return (
    <section id="problem" className="problem-section">
      <div className="page-width problem-layout reveal">
        <div>
          <span className="eyebrow">A LITTLE LESS ADMIN. A LOT MORE ROOM.</span>
          <h2>None of it is hard.<br /><span>All of it is constant.</span></h2>
        </div>
        <div className="problem-comparison">
          {[
            ["Screenshots to sort", "Payments ready to review"],
            ["Balances to calculate", "One live ledger"],
            ["Tenants to chase", "Reminders on schedule"],
          ].map(([before, after]) => (
            <div className="comparison-row" key={before}>
              <span>{before}</span><ArrowRight size={16} /><strong>{after}</strong>
            </div>
          ))}
          <p>The same responsibilities. Less of your day.</p>
        </div>
      </div>
    </section>
  );
}
