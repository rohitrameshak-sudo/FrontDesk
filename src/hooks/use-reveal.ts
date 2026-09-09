import { useEffect } from "react";

/**
 * Reveals every `.reveal` element once it reaches the fold, then forgets it.
 *
 * This sweeps positions on scroll rather than using IntersectionObserver: a fast
 * scroll (a trackpad fling, or jumping to an anchor) can skip observer callbacks
 * entirely, which would leave a block invisible for good. Anything at or above the
 * fold line is revealed, so content can never be stranded.
 *
 * Elements stay put for anyone who asked for reduced motion — the CSS only hides
 * them under `prefers-reduced-motion: no-preference`.
 */
export function useReveal() {
  useEffect(() => {
    let pending = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!pending.length) return;

    let frame = 0;

    const sweep = () => {
      frame = 0;
      const fold = window.innerHeight * 0.92;
      const stillHidden: HTMLElement[] = [];

      for (const el of pending) {
        // offsetParent is null while an element is display:none (the mobile-only
        // cards on a desktop viewport) — leave those for when they are laid out.
        if (el.offsetParent === null && el.getClientRects().length === 0) {
          stillHidden.push(el);
          continue;
        }
        if (el.getBoundingClientRect().top < fold) el.classList.add("is-in");
        else stillHidden.push(el);
      }

      pending = stillHidden;
      if (!pending.length) teardown();
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sweep);
    };

    const teardown = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    sweep();

    return teardown;
  }, []);
}
