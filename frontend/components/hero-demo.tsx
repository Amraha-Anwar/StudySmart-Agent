import { Check, FileText } from "lucide-react"

const options = [
  { letter: "A", text: "In the stroma" },
  { letter: "B", text: "In the thylakoid membranes", correct: true },
  { letter: "C", text: "In the mitochondria" },
  { letter: "D", text: "In the cell wall" },
]

// A page of lecture notes gets highlighted, then turns into a quiz question.
// Purely illustrative, so it is hidden from assistive tech.
export function HeroDemo() {
  return (
    <div aria-hidden="true" className="relative isolate">
      <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-parrot/20 blur-3xl" />
      <div className="lift rounded-xl bg-sheet p-6 pb-20 text-ink sm:p-8 sm:pb-20">
        <div className="mb-5 flex items-center justify-between gap-3 border-b border-rule pb-4 text-[0.8125rem] text-ink-soft">
          <span className="flex min-w-0 items-center gap-2">
            <FileText className="size-4 shrink-0" />
            <span className="truncate">bio-101-lecture-6.pdf</span>
          </span>
          <span className="shrink-0 tabular-nums">Page 2 of 14</span>
        </div>

        <h3 className="mb-3 font-sans text-base font-bold tracking-[-0.01em]">The two stages of photosynthesis</h3>
        <p className="font-serif text-[0.9375rem] leading-[1.8] text-ink">
          Photosynthesis happens in two linked stages.{" "}
          <span className="hl demo-hl" style={{ "--d": "0.5s" } as React.CSSProperties}>
            The light-dependent reactions take place in the thylakoid membranes
          </span>
          , where light energy splits water and releases oxygen. The energy captured is stored as ATP and
          NADPH.{" "}
          <span className="hl hl-pink demo-hl" style={{ "--d": "1.1s" } as React.CSSProperties}>
            The Calvin cycle then uses that ATP and NADPH in the stroma
          </span>{" "}
          to fix carbon dioxide into sugar. Because it does not use light directly, the cycle is sometimes
          called the light-independent stage.{" "}
          <span className="hl demo-hl" style={{ "--d": "1.7s" } as React.CSSProperties}>
            Nearly all the oxygen in the atmosphere comes from this process.
          </span>
        </p>
      </div>

      <div className="demo-card relative -mt-14 ml-4 mr-[-0.5rem] rounded-xl border border-parrot/40 bg-sheet p-5 text-ink shadow-[0_0_40px_-6px_rgba(92,196,52,0.55),0_24px_48px_-16px_rgba(0,0,0,0.6)] sm:ml-auto sm:mr-[-1.5rem] sm:w-[22rem] lg:mr-[-2.5rem]">
        <p className="text-[0.8125rem] font-semibold text-pen">Question 1 of 10</p>
        <p className="mt-1 font-serif text-[0.9375rem] leading-snug">
          Where do the light-dependent reactions take place?
        </p>
        <ul className="mt-3 grid gap-1.5">
          {options.map((o) => (
            <li
              key={o.letter}
              className={`flex items-center gap-2.5 rounded-md border border-rule px-2.5 py-1.5 text-[0.8125rem] ${o.correct ? "demo-pick" : ""}`}
            >
              <span
                className={`grid size-5 shrink-0 place-items-center rounded-[4px] border border-rule text-[0.6875rem] font-semibold ${o.correct ? "demo-pick-badge" : ""}`}
              >
                {o.letter}
              </span>
              <span className="flex-1">{o.text}</span>
              {o.correct && <Check className="demo-pick-check size-4 text-correct" strokeWidth={2.5} />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
