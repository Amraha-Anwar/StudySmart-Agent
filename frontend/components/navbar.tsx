"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { motion } from "framer-motion"

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 p-4 backdrop-blur-xl bg-gradient-to-b from-black/40 via-black/30 to-transparent border-b border-neon-cyan/20"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="group relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-neon-cyan rounded-full glow-cyan" />
            <span className="text-xl font-bold bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-cyan bg-clip-text text-transparent">
              StudySmart
            </span>
            <span className="text-xs font-semibold text-neon-purple/80 tracking-wider">AGENT</span>
          </motion.div>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-blue group-hover:w-full transition-all duration-300" />
        </Link>

        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            <Button
              asChild
              className="relative group bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40 hover:border-neon-cyan/60 rounded-lg px-4 md:px-6 py-2 transition-all duration-300 font-semibold text-sm md:text-base overflow-hidden glow-cyan hover:glow-cyan"
            >
              <Link href="/upload">
                <span className="relative z-10">PDF Summarizer</span>
                <span className="absolute inset-0 bg-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            <Button
              asChild
              className="relative group bg-neon-purple/10 hover:bg-neon-purple/20 text-neon-purple border border-neon-purple/40 hover:border-neon-purple/60 rounded-lg px-4 md:px-6 py-2 transition-all duration-300 font-semibold text-sm md:text-base overflow-hidden glow-purple hover:glow-purple"
            >
              <Link href="/quiz">
                <span className="relative z-10">Quiz Generator</span>
                <span className="absolute inset-0 bg-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
