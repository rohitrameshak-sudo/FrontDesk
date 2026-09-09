import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Wordmark } from "@/components/site/nav";

// TODO: replace with the address you want enquiries to land in.
const CONTACT_EMAIL = "hello@frontdesk.app";

const unitOptions = ["Under 10", "10–30", "30–60", "60+"];

export function CTA() {
  const [units, setUnits] = useState("10–30");
  const [contact, setContact] = useState("");

  const mailto = () => {
    const subject = encodeURIComponent("FrontDesk — walkthrough request");
    const body = encodeURIComponent(
      `Portfolio size: ${units} units\nBest way to reach me: ${contact || "(add your email or number)"}\n\nWhat I currently use to track rent:\n`,
    );
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-ink pt-24 pb-20 text-white md:pt-28 md:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(62,207,142,0.10),transparent_70%)]" />
      <div className="reveal relative mx-auto max-w-3xl px-5 text-center">
        <h2 className="text-4xl leading-[1.02] font-semibold tracking-tight text-balance-pretty md:text-6xl">
          <span className="text-[0.92em] font-extralight italic text-white/70">
            Your time.
          </span>
          <br />
          Back to you.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-white/55">
          See how FrontDesk could run your next month. A short walkthrough, built around your portfolio.
        </p>

        <form
          className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = mailto();
          }}
        >
          <label htmlFor="contact-field">
            Your email or phone number
          </label>
          <input
            id="contact-field"
            required
            autoComplete="email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Email or phone number"
            className="flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-[15px] text-white placeholder:text-white/35 focus:border-white/40 focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            Book a walkthrough
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </form>
        <p className="contact-note">Opens an email draft. Your request is sent when you send the email.</p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-[12.5px] text-white/35">How many tenancies?</span>
          {unitOptions.map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUnits(u)}
              aria-pressed={units === u}
              className={`rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors ${
                units === u
                  ? "border-white bg-white text-ink"
                  : "border-white/15 text-white/55 hover:border-white/35 hover:text-white"
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink py-12 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Wordmark />
          <p className="mt-4 text-[14px] leading-relaxed text-white/45">
            The ledger, the invoicing, the chasing and the tenant questions — run from a chat thread.
            Built for owners and small agencies who do this themselves.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-14 gap-y-2 text-[14px] sm:grid-cols-3">
          {[
            ["Product", ["#features", "What it does", "#assistant", "The assistant", "#how", "How it starts"]],
            ["Detail", ["#trust", "Safeguards", "#faq", "FAQ", "#problem", "The manual month"]],
            ["Talk", ["#contact", "Book a walkthrough", `mailto:${CONTACT_EMAIL}`, "Email us"]],
          ].map(([title, entries]) => {
            const list = entries as string[];
            return (
              <div key={title as string}>
                <div className="mb-3 text-[11px] font-semibold tracking-[0.16em] text-white/30 uppercase">
                  {title as string}
                </div>
                <ul className="space-y-2">
                  {Array.from({ length: list.length / 2 }, (_, i) => (
                    <li key={list[i * 2]}>
                      <a href={list[i * 2]} className="text-white/55 transition-colors hover:text-white">
                        {list[i * 2 + 1]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-5 pt-6 text-[12.5px] text-white/30">
        © {new Date().getFullYear()} FrontDesk. Figures shown on this page are illustrative.
      </div>
    </footer>
  );
}
