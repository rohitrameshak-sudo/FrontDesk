import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Do my tenants have to install anything?",
    a: "No. They message the same way they already message you, from the number they already use. There is no app, no login and nothing for them to learn — which is the only reason this works with tenants who would never open a portal.",
  },
  {
    q: "Is this only for residential?",
    a: "No. Commercial shops and offices are handled the same way as flats — often better, since commercial tenancies carry longer arrears and scheduled increments, and those are exactly what the ledger is built to track.",
  },
  {
    q: "What happens when a tenant asks something it can’t answer?",
    a: "It hands the conversation to you rather than guessing. It answers confidently about the things it knows from the ledger — balance, last payment, deposit, rent, next increment, agreement dates, how to pay — and stays quiet everywhere else.",
  },
  {
    q: "I already keep a notebook or a spreadsheet. Do I lose that history?",
    a: "You bring across the balances that matter — rents, deposits, agreement dates, scheduled increments and whatever arrears stand today — so the ledger starts correct on day one. Your old records stay yours; nothing is overwritten.",
  },
  {
    q: "Is there a screen, or is it only chat?",
    a: "Both. The chat thread is how you run the month; the web dashboard is where you look at everything at once — outstanding, collected, defaulters, occupancy, per-tenant ledgers, conversation history, issues and contractors — with exports to CSV, Excel and PDF over any date range.",
  },
  {
    q: "What if a tenant pays partly, or pays late, or pays in cash?",
    a: "Partial payments are allocated to the oldest charge first, so the ageing you see is the real ageing. Cash you collect yourself gets recorded the moment you tell it, and the balance updates everywhere at once.",
  },
  {
    q: "Who is this not for?",
    a: "Large institutional portfolios and anyone who already employs a finance team. The advantage here is that it removes the need for staff, not that it coordinates them. Somewhere between ten and sixty tenancies is where it earns its keep.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-t border-border bg-muted/40 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="reveal">
          <span className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Questions
          </span>
          <h2 className="mt-5 text-4xl leading-[1.02] font-semibold tracking-tighter md:text-5xl">
            The ones owners
            <br />
            <span className="text-[0.92em] font-extralight italic">actually ask.</span>
          </h2>
        </div>

        <div className="reveal border-t border-border">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-border py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[17px] font-medium tracking-tight">
                {f.q}
                <Plus className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="mt-3 max-w-2xl pr-10 text-[15.5px] leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
