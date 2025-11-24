"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-neon-cyan">
        <p>No result data found.</p>
        <Button onClick={() => router.push("/")} className="mt-4 bg-neon-purple hover:bg-neon-cyan text-white">
          Go Home
        </Button>
      </div>
    );
  }

  const percentage = (Number(score) / Number(total)) * 100;
  let message = "";
  let messageColor = "text-white";

  if (percentage >= 90) {
    message = "Outstanding Performance! 🌟";
    messageColor = "text-neon-cyan";
  } else if (percentage >= 70) {
    message = "Great Job! Keep it up! 👍";
    messageColor = "text-green-400";
  } else if (percentage >= 50) {
    message = "Good Effort! You're getting there! 💪";
    messageColor = "text-yellow-400";
  } else {
    message = "Keep Practicing! Don't give up! 🔥";
    messageColor = "text-orange-400";
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="glassmorphic-card text-center border-neon-purple shadow-[0_0_20px_rgba(169,102,255,0.2)] bg-black/40 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-neon-cyan mb-2 drop-shadow-[0_0_10px_rgba(0,245,255,0.5)]">
            Quiz Completed!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="py-6 relative">
            <div className="absolute inset-0 bg-neon-purple/10 blur-3xl rounded-full transform scale-150"></div>
            <p className="text-gray-300 text-lg relative z-10">Your Score</p>
            <h1 className="text-7xl font-extrabold text-neon-purple drop-shadow-[0_0_15px_rgba(169,102,255,0.8)] mt-2 relative z-10">
              {score} <span className="text-3xl text-gray-500 font-normal">/ {total}</span>
            </h1>
          </div>

          <div className="space-y-4">
            <h3 className={`text-2xl font-bold ${messageColor} drop-shadow-md`}>{message}</h3>
            <blockquote className="text-gray-300 italic border-l-4 border-neon-cyan pl-4 py-2 mx-4 bg-white/5 rounded-r-lg">
              "{quote}"
            </blockquote>
          </div>

          <div className="flex gap-4 justify-center mt-8">
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all duration-300 font-semibold"
            >
              Home
            </Button>
            <Button
              onClick={() => router.push("/upload")}
              className="bg-neon-purple hover:bg-neon-cyan text-white hover:text-black transition-all duration-300 font-semibold shadow-[0_0_15px_rgba(169,102,255,0.4)] hover:shadow-[0_0_20px_rgba(0,245,255,0.6)]"
            >
              Upload New PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ResultPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4">
      <Suspense fallback={<div className="text-neon-cyan">Loading result...</div>}>
        <ResultContent />
      </Suspense>
    </div>
  );
}
