"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, Suspense } from "react";

const quotes = [
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "Education is the most powerful weapon which you can use to change the world.",
  "It always seems impossible until it's done.",
  "Don't watch the clock; do what it does. Keep going.",
  "The future belongs to those who believe in the beauty of their dreams."
];

// A teacher's red-pen loop around the score
function PenCircle() {
  const reduceMotion = useReducedMotion();
  return (
    <svg viewBox="0 0 260 150" className="pointer-events-none absolute inset-0 h-full w-full drop-shadow-[0_0_6px_rgba(194,54,68,0.55)]" aria-hidden="true">
      <motion.path
        d="M196 22C160 6 82 8 42 34C8 57 12 108 64 128C116 148 206 140 238 102C262 72 246 34 204 20C180 12 150 10 124 14"
        fill="none"
        className="stroke-margin"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const score = searchParams.get("score");
  const total = searchParams.get("total");
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  if (!score || !total) {
    return (
      <div className="lift rounded-xl bg-sheet p-6 text-ink sm:p-8">
        <h1 className="text-2xl font-bold tracking-[-0.02em]">No score to show</h1>
        <p className="mt-2 text-ink-soft">Finish a quiz and your score will appear here.</p>
        <Button onClick={() => router.push("/")} className="mt-6">
          Back to home
        </Button>
      </div>
    );
  }

  const percentage = (Number(score) / Number(total)) * 100;
  let message = "";

  if (percentage >= 90) {
    message = "Excellent. You know this material well.";
  } else if (percentage >= 70) {
    message = "Good work. Go back over the questions you missed.";
  } else if (percentage >= 50) {
    message = "You're getting there. Read the summary again, then retake the quiz.";
  } else {
    message = "Worth another pass. Start with the summary, then try a new quiz.";
  }

  return (
    <div className="lift rounded-xl bg-sheet p-6 text-ink sm:p-10">
      <h1 className="text-sm font-semibold text-ink-soft">Your score</h1>

      <div className="relative mt-2 flex h-[150px] w-[260px] max-w-full items-center justify-center">
        <PenCircle />
        <p className="relative font-extrabold tracking-[-0.04em]">
          <span className="text-7xl tabular-nums">{score}</span>
          <span className="ml-1 text-3xl text-ink-soft tabular-nums">/{total}</span>
        </p>
      </div>

      <div className="result-rise">
        <p className="mt-6 text-2xl font-bold leading-snug tracking-[-0.02em]">{message}</p>
        <p className="mt-1 text-ink-soft tabular-nums">{Math.round(percentage)}% correct</p>

        {quote && (
          <blockquote className="mt-8 border-l-[3px] border-pink pl-4 font-serif text-lg italic leading-relaxed text-ink">
            {quote}
          </blockquote>
        )}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => router.push("/quiz")} size="lg">
            Make another quiz
          </Button>
          <Button onClick={() => router.push("/upload")} size="lg" variant="outline">
            Upload a new PDF
          </Button>
          <Button onClick={() => router.push("/")} size="lg" variant="ghost">
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-12 sm:px-6 sm:pt-16">
      <Suspense fallback={<p className="text-on-page-soft">Loading your score…</p>}>
        <ResultContent />
      </Suspense>
    </div>
  );
}
