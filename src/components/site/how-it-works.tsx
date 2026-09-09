import { FileSpreadsheet, MessageSquareText, PanelsTopLeft, Receipt, Sparkles } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "We set up the business number",
    body: "We handle business verification, your display name and approved message templates. Branding and a logo are available if you need them.",
  },
  {
    n: "02",
    title: "Your tenancies come across",
    body: "Bring your tenants, rents, deposits and existing arrears. The ledger starts with the balances you already have.",
  },
  {
    n: "03",
    title: "The month starts running itself",
    body: "Choose your invoice date, review the workflow and start running the month from your thread.",
  },
];

const surfaces = [
  {
    icon: MessageSquareText,
    label: "For your tenants",
    items: [
      "An immediate, correct answer about their own account — balance, last payment, deposit held, next increment, how to pay",
      "Their invoice as a proper PDF, by message or email — the same document either way",
      "A way to report a fault that actually reaches you",
    ],
  },
  {
    icon: PanelsTopLeft,
    label: "For you",
    items: [
      "A dashboard with outstanding, collected, defaulters, recent payments and upcoming increments",
      "The full ledger per tenant, properties and occupancy, open issues and your contractor directory",
      "Exports to CSV, Excel and PDF over any date range — hand it straight to your accountant",
    ],
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-t border-border bg-muted/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="reveal max-w-2xl">
          <span className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            How it starts
          </span>
          <h2 className="mt-5 text-4xl leading-[1.02] font-semibold tracking-tighter md:text-5xl">
            <span className="text-[0.92em] font-extralight italic">Your business.</span> Our setup.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
            From business number to opening balances, we help you get ready.
          </p>
        </div>

        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="reveal border-t border-foreground/15 pt-6">
              <div className="font-mono text-[13px] text-accent">{s.n}</div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-20 grid gap-5 md:grid-cols-2">
          {surfaces.map((s) => (
            <div key={s.label} className="reveal rounded-2xl border border-border bg-card p-7">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                  <s.icon className="h-4 w-4" />
                </span>
                <h3 className="text-[15px] font-semibold tracking-tight">{s.label}</h3>
              </div>
              <ul className="mt-5 space-y-3.5">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[13.5px] text-muted-foreground">
          <span className="flex items-center gap-2">
            <Receipt className="h-4 w-4" /> Invoices as PDFs, by message or email
          </span>
          <span className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" /> CSV, Excel and PDF exports
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> Branding and logo, if you need one
          </span>
        </div>
      </div>
    </section>
  );
}
