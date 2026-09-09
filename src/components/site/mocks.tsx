import type { ReactNode } from "react";
import {
  Check,
  CheckCheck,
  Clock,
  FileText,
  Image as ImageIcon,
  Sparkles,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Single place to change the currency shown in the illustrative product mock-ups. */
export const CUR = "₹";

/* ------------------------------------------------------------------ */
/* Shared chrome                                                       */
/* ------------------------------------------------------------------ */

export function MockCard({
  children,
  className,
  title,
  icon,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-black/5 bg-white shadow-[0_18px_40px_-24px_rgba(12,10,8,0.45)]",
        className,
      )}
    >
      {title && (
        <div className="flex items-center gap-2 border-b border-black/5 px-3.5 py-2.5">
          {icon}
          <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
            {title}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

export function Bubble({
  side = "in",
  children,
  meta,
  className,
}: {
  side?: "in" | "out";
  children: ReactNode;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex", side === "out" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug",
          side === "out"
            ? "rounded-br-md bg-ink text-white/95 ring-1 ring-white/10"
            : "rounded-bl-md border border-black/5 bg-white text-foreground",
          className,
        )}
      >
        {children}
        {meta && (
          <div
            className={cn(
              "mt-1.5 flex items-center gap-1 text-[10px]",
              side === "out" ? "text-white/45" : "text-muted-foreground",
            )}
          >
            {meta}
          </div>
        )}
      </div>
    </div>
  );
}

export function Amount({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("font-mono tabular-nums", className)}>
      {CUR}
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 1 — Payment screenshots read automatically                          */
/* ------------------------------------------------------------------ */

export function ScreenshotMock() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <Bubble>
        <div className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
          <ImageIcon className="h-3 w-3" /> Screenshot from A-104 · Priya Menon
        </div>
        <div className="w-[190px] rounded-lg bg-gradient-to-b from-[#1b3a2c] to-[#0f2a1f] p-3 text-white">
          <div className="text-[10px] tracking-wide text-white/55 uppercase">Payment successful</div>
          <div className="mt-1 font-mono text-2xl tabular-nums">{CUR}42,000</div>
          <div className="mt-2 space-y-0.5 font-mono text-[10px] text-white/55">
            <div>UTR 431862094771</div>
            <div>03 Feb · 09:14 AM</div>
          </div>
        </div>
      </Bubble>

      <MockCard className="p-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold tracking-wide text-accent uppercase">
            Read automatically
          </span>
          <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[10px] text-accent">
            98% match
          </span>
        </div>
        <dl className="mt-2.5 grid grid-cols-2 gap-y-1.5 text-[11px]">
          <dt className="text-muted-foreground">Amount</dt>
          <dd className="text-right font-mono font-medium">{CUR}42,000</dd>
          <dt className="text-muted-foreground">Reference</dt>
          <dd className="text-right font-mono">431862094771</dd>
          <dt className="text-muted-foreground">Applies to</dt>
          <dd className="text-right">Jan rent · A-104</dd>
        </dl>
        <div
          
          className="mt-3 w-full rounded-lg bg-ink py-2 text-center text-[12px] font-semibold text-white"
        >
          Post to ledger
        </div>
      </MockCard>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2 — The ledger                                                      */
/* ------------------------------------------------------------------ */

const ledgerRows = [
  { date: "01 Dec", desc: "Rent — December", charge: "38,000", paid: "", bal: "38,000" },
  { date: "06 Dec", desc: "Payment received", charge: "", paid: "38,000", bal: "0" },
  { date: "01 Jan", desc: "Rent — January", charge: "38,000", paid: "", bal: "38,000" },
  { date: "01 Feb", desc: "Rent — February", charge: "38,000", paid: "", bal: "76,000" },
];

export function LedgerMock() {
  return (
    <div className="flex h-full flex-col justify-center">
      <MockCard title="Shop 2 · Kadam & Sons" icon={<FileText className="h-3.5 w-3.5 text-muted-foreground" />}>
        <table className="w-full text-[11px]">
          <thead>
            <tr className="text-[9.5px] tracking-wide text-muted-foreground uppercase">
              <th className="px-3.5 py-2 text-left font-semibold">Date</th>
              <th className="py-2 text-left font-semibold">Entry</th>
              <th className="py-2 text-right font-semibold">Charge</th>
              <th className="px-3.5 py-2 text-right font-semibold">Balance</th>
            </tr>
          </thead>
          <tbody>
            {ledgerRows.map((r) => (
              <tr key={r.date + r.desc} className="border-t border-black/5">
                <td className="px-3.5 py-2 font-mono whitespace-nowrap text-muted-foreground">{r.date}</td>
                <td className="py-2 pr-2">{r.desc}</td>
                <td className={cn("py-2 text-right font-mono", r.paid && "text-accent")}>
                  {r.paid ? `−${r.paid}` : r.charge}
                </td>
                <td className="px-3.5 py-2 text-right font-mono font-medium">{r.bal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-black/5 bg-warn-soft px-3.5 py-2.5">
          <span className="text-[11px] font-medium text-warn">Oldest unpaid charge</span>
          <span className="font-mono text-[11px] font-semibold text-warn">January · 45 days</span>
        </div>
      </MockCard>
      <p className="mt-3 px-1 text-[11px] leading-relaxed text-white/45">
        Payments clear the oldest charge first, so “45 days overdue” means the oldest unpaid month —
        not the newest bill.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3 — Invoices & reminders                                            */
/* ------------------------------------------------------------------ */

export function InvoiceMock() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <MockCard className="p-3.5">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[16px] leading-none font-semibold tracking-tight">Invoice</div>
            <div className="mt-1 font-mono text-[10px] text-muted-foreground">INV-2026-0141</div>
          </div>
          <div className="rounded-md bg-muted px-2 py-1 font-mono text-[10px]">01 Feb</div>
        </div>
        <div className="mt-3 space-y-1.5 border-t border-black/5 pt-3 text-[11px]">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Rent — February</span>
            <span className="font-mono">38,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Arrears — January</span>
            <span className="font-mono text-warn">38,000</span>
          </div>
          <div className="mt-1.5 flex justify-between border-t border-black/5 pt-2 text-[13px] font-semibold">
            <span>Total due</span>
            <Amount>76,000</Amount>
          </div>
        </div>
      </MockCard>
      <Bubble side="out" meta={<><CheckCheck className="h-3 w-3" /> Delivered · Read 09:02</>}>
        Your February invoice is attached. Total due including January arrears is {CUR}76,000.
      </Bubble>
      <div className="flex items-center gap-1.5 self-end rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/60">
        <Clock className="h-3 w-3" /> Reminder queued for 07 Feb
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4 — Ask the ledger anything                                         */
/* ------------------------------------------------------------------ */

export function AssistantMock() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5">
      <Bubble side="out">Who hasn’t paid?</Bubble>
      <MockCard className="p-3">
        <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-accent uppercase">
          <Sparkles className="h-3 w-3" /> From your ledger
        </div>
        <ul className="space-y-2 text-[11.5px]">
          {[
            ["Kadam & Sons · Shop 2", "76,000", "45 days"],
            ["R. Nair · Unit 3B", "24,500", "12 days"],
            ["Maple Steel · Shop 7", "1,10,000", "8 days"],
          ].map(([who, amt, age]) => (
            <li key={who} className="flex items-center justify-between gap-2">
              <span className="truncate">{who}</span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="font-mono font-medium">{amt}</span>
                <span className="rounded-full bg-warn-soft px-1.5 py-0.5 font-mono text-[9.5px] text-warn">
                  {age}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-2.5 border-t border-black/5 pt-2 text-[11px] text-muted-foreground">
          Outstanding across 3 tenants ·{" "}
          <span className="font-mono font-medium text-foreground">{CUR}2,10,500</span>
        </div>
      </MockCard>
      <Bubble side="out">Send Kadam a reminder</Bubble>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5 — Repairs, handled                                                */
/* ------------------------------------------------------------------ */

export function RepairsMock() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5">
      <Bubble>
        <span className="mb-1 block text-[10px] font-medium text-muted-foreground">
          Unit 3B · R. Nair
        </span>
        No water in the bathroom since morning.
      </Bubble>
      <MockCard className="p-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-warn-soft">
            <Wrench className="h-3.5 w-3.5 text-warn" />
          </span>
          <div className="text-[11.5px] font-semibold">Plumbing · Unit 3B</div>
          <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[9.5px] font-medium">
            Logged
          </span>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Suresh (plumber · covers Green Court) is your contact for this trade. Should I message him?
        </p>
        <div className="mt-2.5 flex gap-2">
          <div  className="flex-1 rounded-lg bg-ink py-1.5 text-center text-[11px] font-semibold text-white">
            Yes, ask him
          </div>
          <div  className="rounded-lg border border-black/10 px-3 py-1.5 text-[11px] font-medium">
            Not now
          </div>
        </div>
      </MockCard>
      <Bubble side="in" meta={<><Check className="h-3 w-3" /> Confirmed with contractor</>}>
        Suresh can come at 9:00 pm today. Shall I confirm?
      </Bubble>
    </div>
  );
}
