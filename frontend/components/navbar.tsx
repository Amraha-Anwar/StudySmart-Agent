"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { href: "/upload", label: "PDF Summarizer", color: "neon-cyan" },
    { href: "/quiz", label: "Quiz Generator", color: "neon-purple" },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 p-4 backdrop-blur-xl bg-gradient-to-b from-black/40 via-black/30 to-transparent border-b border-neon-cyan/20"
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-neon-cyan rounded-full glow-cyan" />
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-cyan bg-clip-text text-transparent">
                StudySmart
              </span>
              <span className="hidden sm:inline text-xs font-semibold text-neon-purple/80 tracking-wider">AGENT</span>
            </motion.div>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-blue group-hover:w-full transition-all duration-300" />
          </Link>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {menuItems.map((item) => (
              <motion.div key={item.href} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Button
                  asChild
                  className={`relative group ${
                    item.color === "neon-cyan"
                      ? "bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40 hover:border-neon-cyan/60 glow-cyan hover:glow-cyan"
                      : "bg-neon-purple/10 hover:bg-neon-purple/20 text-neon-purple border border-neon-purple/40 hover:border-neon-purple/60 glow-purple hover:glow-purple"
                  } rounded-lg px-6 py-2 transition-all duration-300 font-semibold text-base overflow-hidden`}
                >
                  <Link href={item.href}>
                    <span className="relative z-10">{item.label}</span>
                    <span
                      className={`absolute inset-0 ${item.color === "neon-cyan" ? "bg-neon-cyan/5" : "bg-neon-purple/5"} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40 transition-all duration-300 glow-cyan"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-16 left-0 right-0 z-40 md:hidden mx-4 rounded-xl backdrop-blur-xl bg-gradient-to-b from-black/60 via-black/50 to-black/40 border border-neon-cyan/20 shadow-lg"
            >
              <div className="flex flex-col gap-2 p-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      asChild
                      onClick={() => setIsOpen(false)}
                      className={`w-full justify-center ${
                        item.color === "neon-cyan"
                          ? "bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40 hover:border-neon-cyan/60"
                          : "bg-neon-purple/10 hover:bg-neon-purple/20 text-neon-purple border border-neon-purple/40 hover:border-neon-purple/60"
                      } rounded-lg px-4 py-2 transition-all duration-300 font-semibold`}
                    >
                      <Link href={item.href}>
                        <span>{item.label}</span>
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
