"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        layout: true,
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <main className="min-h-screen flex items-center justify-center gradient-dark px-4 py-12 relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/10 via-transparent to-neon-cyan/5 pointer-events-none" />

      <motion.div
        className="w-full max-w-2xl text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="glass-lg p-8 md:p-12 glow-cyan">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple bg-clip-text text-transparent text-balance"
            variants={itemVariants}
          >
            Study Smarter, Not Harder.
          </motion.h1>

          {/* Subheading */}
          <motion.p className="text-base md:text-lg text-foreground/80 mb-8 leading-relaxed" variants={itemVariants}>
            Upload your notes → Get clean summaries → Generate smart quizzes.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="w-full sm:w-auto px-8 py-3 text-base bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 rounded-lg hover:bg-neon-cyan/30 hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all duration-300 font-semibold glow-cyan"
              >
                <Link href="/upload">Upload PDF</Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="w-full sm:w-auto px-8 py-3 text-base bg-neon-purple/20 text-neon-purple border border-neon-purple/50 rounded-lg hover:bg-neon-purple/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 font-semibold glow-purple"
              >
                <Link href="/quiz">Generate Quiz</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}
