import { useState } from "react";
import type { ReactNode } from "react";
import { Clock3, Lock, ShieldCheck } from "lucide-react";
import { CUR } from "@/components/site/mocks";
import { cn } from "@/lib/utils";

type Exchange = {
  q: string;
  a: ReactNode;
};

const Row = ({
  label,
  value,
  tag,
}: {
  label: string;
  value: string;
  tag?: string;
}) => (
  <li className="flex items-center justify-between gap-3 border-b border-white/[0.07] py-1.5 last:border-b-0">
    <span className="truncate text-white/75">{label}</span>
    <span className="flex shrink-0 items-center gap-2">
      <span className="font-mono text-white">{value}</span>
      {tag && (
        <span className="rounded-full bg-warn/20 px-1.5 py-0.5 font-mono text-[10px] text-[#f0a878]">
          {tag}
        </span>
      )}
    </span>
  </li>
);

const exchanges: Exchange[] = [
  {
    q: "Who hasn’t paid?",
    a: (
      <>
        <p className="mb-2 text-white/60">Three tenants are past due right now.</p>
        <ul className="text-[13px]">
          <Row label="Kadam & Sons · Shop 2" value={`${CUR}76,000`} tag="45d" />
          <Row label="R. Nair · Unit 3B" value={`${CUR}24,500`} tag="12d" />
          <Row label="Maple Steel · Shop 7" value={`${CUR}1,10,000`} tag="8d" />
        </ul>
        <p className="mt-2.5 text-white/45">
          Total outstanding <span className="font-mono text-white">{CUR}2,10,500</span>.
        </p>
      </>
    ),
  },
  {
    q: "How late is Maple Steel?",
    a: (
      <p className="text-white/75">
        Maple Steel Traders (Shop 7) is <span className="font-mono text-white">8 days</span> past due
        on the February charge. Outstanding{" "}
        <span className="font-mono text-white">{CUR}1,10,000</span>. Their last payment was{" "}
        <span className="font-mono text-white">{CUR}1,10,000</span> on 6 January, which cleared
        January in full.
      </p>
    ),
  },
  {
    q: "How much came in last month?",
    a: (
      <>
        <p className="text-white/75">
          <span className="font-mono text-white">{CUR}6,84,000</span> collected in January, across
          21 payments from 19 tenants.
        </p>
        <p className="mt-2 text-white/45">
          Two of those cleared arrears from December rather than the current month.
        </p>
      </>
    ),
  },
  {
    q: "Break it down by property",
    a: (
      <ul className="text-[13px]">
        <Row label="Green Court · 12 units" value={`${CUR}3,96,000`} />
        <Row label="Sundar Complex · 9 shops" value={`${CUR}2,10,000`} />
        <Row label="Lake View · 6 units" value={`${CUR}78,000`} />
      </ul>
    ),
  },
  {
    q: "When did Kadam last pay?",
    a: (
      <p className="text-white/75">
        6 December — <span className="font-mono text-white">{CUR}38,000</span>, which cleared the
        December rent. Nothing has been received since; January and February are both open.
      </p>
    ),
  },
];

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Shown before it’s sent",
    body: "Review the recipient, wording and amount before confirming an action.",
  },
  {
    icon: Clock3,
    title: "Proposals expire",
    body: "Confirm within thirty minutes. FrontDesk carries out exactly what you reviewed.",
  },
  {
    icon: Lock,
    title: "Answers, not guesses",
    body: "Figures come from your ledger. Uncertain questions come to you.",
  },
];

export function Assistant() {
  const [i, setI] = useState(0);
  const active = exchanges[i];

  return (
    <section id="assistant" className="bg-background pt-10 pb-16 md:pt-14 md:pb-20">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20">
        <div className="reveal min-w-0">
          <span className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            The owner’s assistant
          </span>
          <h2 className="mt-5 text-4xl leading-[1.02] font-semibold tracking-tighter md:text-6xl">
            <span className="text-[0.92em] font-extralight italic">Ask your books</span>
            <br />
            a question.
          </h2>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted-foreground">
            Ask who’s overdue, what came in, or when a tenant last paid. Then tell FrontDesk
            what to do next. Your books, in a conversation.
          </p>

          <div className="mt-8 space-y-5">
            {guarantees.map((g) => (
              <div key={g.title} className="flex gap-3.5">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft">
                  <g.icon className="h-4 w-4 text-accent" />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold tracking-tight">{g.title}</h3>
                  <p className="mt-1 max-w-md text-[14.5px] leading-relaxed text-muted-foreground">
                    {g.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive thread */}
        <div className="reveal min-w-0 rounded-3xl border border-black/5 bg-ink p-5 shadow-[0_40px_80px_-40px_rgba(12,10,8,0.6)] sm:p-7">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-bright/15 font-mono text-[12px] text-accent-bright">
                FD
              </span>
              <div className="leading-tight">
                <div className="text-[13.5px] font-semibold text-white">FrontDesk</div>
                <div className="text-[11px] text-white/40">Interactive example · sample ledger</div>
              </div>
            </div>
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] tracking-wide text-white/40 uppercase">
              Owner
            </span>
          </div>

          <div className="min-h-[260px] space-y-3 py-5">
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-md bg-white px-4 py-2.5 text-[14px] text-ink">
                {active.q}
              </div>
            </div>
            <div key={active.q} className="fd-rise flex justify-start">
              <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.05] px-4 py-3 text-[14px] leading-relaxed">
                {active.a}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="mb-2.5 text-[10.5px] font-semibold tracking-[0.16em] text-white/30 uppercase">
              Try another question
            </div>
            <div className="flex flex-wrap gap-2">
              {exchanges.map((e, idx) => (
                <button
                  key={e.q}
                  type="button"
                  onClick={() => setI(idx)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors",
                    idx === i
                      ? "border-white bg-white text-ink"
                      : "border-white/15 text-white/60 hover:border-white/35 hover:text-white",
                  )}
                >
                  {e.q}
                </button>
              ))}
            </div>
          </div>

          {/* Confirmation example */}
          <div className="mt-6 rounded-2xl border border-accent-bright/25 bg-accent-bright/[0.07] p-4">
            <div className="flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.16em] text-accent-bright uppercase">
              <ShieldCheck className="h-3.5 w-3.5" /> Waiting for your confirmation
            </div>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/75">
              Send Kadam &amp; Sons (Shop 2) a reminder for{" "}
              <span className="font-mono text-white">{CUR}76,000</span>, covering January and
              February. I’ll use your approved reminder template.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-ink">
                Confirm
              </span>
              <span className="rounded-lg border border-white/15 px-3.5 py-1.5 text-[12.5px] text-white/60">
                Cancel
              </span>
              <span className="ml-auto font-mono text-[11px] text-white/30">expires in 30 min</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
