import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroDemo } from "@/components/hero-demo"

const steps = [
  {
    title: "Upload a PDF",
    body: "Lecture slides, class notes or a reading. StudySmart pulls out the text.",
  },
  {
    title: "Read the summary",
    body: "The main ideas condensed into short notes, with key terms highlighted.",
  },
  {
    title: "Take the quiz",
    body: "Ten multiple-choice questions written from the full text, checked as you answer.",
  },
]

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center overflow-x-clip gap-14 px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1fr_minmax(0,32rem)] lg:gap-20 lg:px-8 lg:pb-28 lg:pt-24">
        <div>
          <h1 className="glow-text pb-1 text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[3.5rem] xl:text-[4rem]">
            Study smarter, <span className="sm:block">not harder.</span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-on-page-soft">
            Upload a PDF of your notes or readings. You get a summary you can review in a few minutes, then a
            quiz on the original text to check what stuck.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/upload">Upload a PDF</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/quiz">Make a quiz</Link>
            </Button>
          </div>
          <p className="mt-5 max-w-[34rem] text-sm text-on-page-soft">
            Works with PDFs that have selectable text. Scanned pages saved as images can&apos;t be read.
          </p>
        </div>

        <HeroDemo />
      </section>

      <section className="border-y border-white/10 bg-black/25 text-white backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-white">How it works</h2>
          <ol className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {steps.map((step, i) => (
              <li key={step.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-parrot/50">
                <span className="grid size-10 place-items-center rounded-full border border-parrot/70 text-sm font-bold tabular-nums text-parrot shadow-[0_0_24px_-2px_rgba(92,196,52,0.6)]">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-[-0.01em]">{step.title}</h3>
                <p className="mt-2 max-w-[30ch] leading-relaxed text-on-page-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer>
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-on-page-soft sm:px-6 lg:px-8">
          Summaries and quizzes are written by AI. Check anything important against your own notes.
        </div>
      </footer>
    </>
  )
}
