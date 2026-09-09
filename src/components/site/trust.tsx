import { BadgeCheck, Eye, Fingerprint, HandHeart, History, SendHorizontal } from "lucide-react";

const safeguards = [
  {
    icon: SendHorizontal,
    title: "Owner instructions stay in your hands",
    body: "When you ask it to take an action, it shows the recipient, wording and amount for your confirmation.",
  },
  {
    icon: Fingerprint,
    title: "Identity comes from the number",
    body: "A tenant is recognised by the number they message from, never by what the message claims. Nobody can talk their way into someone else’s account.",
  },
  {
    icon: HandHeart,
    title: "Unsure means a human",
    body: "Anything it isn’t confident about is handed to you instead of being guessed at. It would rather be quiet than wrong in front of your tenant.",
  },
  {
    icon: History,
    title: "Nothing is quietly destroyed",
    body: "Deleted entries are retained, not erased. The ledger keeps an audit trail, so a number can always be traced back to where it came from.",
  },
  {
    icon: Eye,
    title: "You can prove it arrived",
    body: "Every message records whether it was sent, delivered, read or failed — so “did that reminder actually reach them?” is a question with an answer.",
  },
  {
    icon: BadgeCheck,
    title: "An official account, not a bot",
    body: "You run on a verified business account with approved message templates. Your tenants see your business name, with approved templates for scheduled messages.",
  },
];

export function Trust() {
  return (
    <section id="trust" className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="reveal max-w-2xl">
          <span className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Safeguards
          </span>
          <h2 className="mt-5 text-4xl leading-[1.02] font-semibold tracking-tighter md:text-5xl">
            It speaks to your tenants.
            <br />
            <span className="text-[0.92em] font-extralight italic">You stay in control.</span>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
            Clear permissions, traceable numbers and a human handoff when it matters.
          </p>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {safeguards.map((s) => (
            <div key={s.title} className="reveal border-t border-border pt-6">
              <s.icon className="h-5 w-5 text-accent" />
              <h3 className="mt-4 text-[17px] font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
