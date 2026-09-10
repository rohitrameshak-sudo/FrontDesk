import { useEffect, useRef, useState } from "react";
import { ArrowDownLeft, ArrowRight, Check, CheckCheck, ChevronRight, CircleCheck, LayoutDashboard, RotateCcw } from "lucide-react";

const money = (n: number) => `₹${n.toLocaleString("en-IN")}`;
export function Collections() {
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const run = () => {
    if (stage !== 0) return;
    setStage(1);
    timer.current = setTimeout(() => setStage(2), 1000);
  };
  const done = stage === 2;
  return (
    <section id="collections" className="collection-section">
      <div className="frame">
        <div className="collection-intro">
          <h2>The payment is<br /><em>the update.</em></h2>
          <p>Automated rent collection software for property owners in India. FrontDesk sends what’s owed, matches the tenant’s payment through a connected collection service, and updates the ledger automatically.</p>
        </div>
        <div className="demo-toolbar"><span><span className="live-dot" /> Explore the collection flow</span><span>Interactive demo · Sample data</span></div>
        <div className="collection-stage">
        <ol className="collection-progress" aria-label="Collection flow">
          <li className="step-complete"><span>01</span> Payment requested <Check size={13} /></li>
          <li className={done ? "step-complete" : ""}><span>02</span> {stage === 1 ? "Matching tenant…" : "Tenant identified"} {done && <Check size={13} />}</li>
          <li className={done ? "step-complete" : ""}><span>03</span> Ledger updated {done && <Check size={13} />}</li>
        </ol>
        <div className="collection-demo">
          <div className="tenant-request">
            <div className="request-heading"><span>01</span> THE TENANT’S SIDE</div>
            <div className="payment-request">
              <div className="property-initial">GC</div>
              <p className="request-property">Green Court</p>
              <span className="request-unit">A-104 · Priya Menon</span>
              <div className="request-divider" />
              <span className="request-label">September rent</span>
              <strong className="request-amount">₹42,000</strong>
              <div className="request-detail"><span>Payment reference</span><span>GC-A104</span></div>
              <div className="request-detail"><span>Account assigned to</span><span>Priya Menon</span></div>
              <button type="button" className="demo-pay" onClick={run} disabled={stage !== 0}>
                {done ? <><Check size={16} /> Payment complete</> : stage === 1 ? "Confirming payment…" : <>Make a sample payment <ArrowRight size={16} /></>}
              </button>
              <span className="demo-disclaimer">A simulation. No money moves.</span>
            </div>
            <p className="request-explainer">A payment link or unique transfer account connects the payment to the right tenant.</p>
          </div>
          <div className="demo-connection" aria-hidden="true"><ArrowRight size={22} /></div>
          <div className="owner-ledger">
            <div className="ledger-topbar"><span><LayoutDashboard size={16} /> FrontDesk <ChevronRight size={13} /> Collections</span><span>SEPTEMBER</span></div>
            <div className="ledger-body">
              <div className="ledger-title"><h3>Your rent roll</h3><span>Green Court</span></div>
              <div className="ledger-totals">
                <div><span>Collected this month</span><strong>{money(done ? 240000 : 198000)}</strong></div>
                <div><span>Outstanding</span><strong>{money(done ? 24500 : 66500)}</strong></div>
              </div>
              <div className="ledger-table-wrap">
                <table className="collection-table">
                  <thead><tr><th>Tenant</th><th>Balance</th><th>Status</th></tr></thead>
                  <tbody>
                    <tr className={done ? "settled-row" : ""}><td><strong>Priya Menon</strong><span>A-104</span></td><td>{money(done ? 0 : 42000)}</td><td><span className={done ? "status-paid" : "status-due"}>{done ? <><Check size={12} /> Paid</> : "Due"}</span></td></tr>
                    <tr><td><strong>R. Nair</strong><span>B-203</span></td><td>₹24,500</td><td><span className="status-due">Due</span></td></tr>
                    <tr><td><strong>Kadam & Sons</strong><span>Shop 02</span></td><td>₹0</td><td><span className="status-paid"><Check size={12} /> Paid</span></td></tr>
                  </tbody>
                </table>
              </div>
              <div className="reconciliation-event" aria-live="polite" aria-atomic="true">
                <span className={done ? "event-icon done" : "event-icon"}>{done ? <CheckCheck size={19} /> : <ArrowDownLeft size={19} />}</span>
                <div><strong>{done ? "₹42,000 received. A-104 reconciled." : stage === 1 ? "Payment received. Matching tenant…" : "Waiting for the tenant’s payment"}</strong><p>{done ? "Priya’s balance is ₹0. No owner action needed." : stage === 1 ? "Using the assigned payment reference." : "Try the sample payment to see the ledger update."}</p></div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="collection-result"><span><CircleCheck size={17} /> Matched to the tenant. Recorded in the books.</span><button type="button" onClick={() => { if(timer.current) clearTimeout(timer.current); setStage(0); }} disabled={stage === 0}><RotateCcw size={14} /> Reset demo</button></div>
        <div className="provider-note"><span>COLLECTION SETUP</span><p>We implement the collection flow with a provider such as Razorpay or Cashfree, chosen for your business and market.</p></div>
      </div>
    </section>
  );
}
