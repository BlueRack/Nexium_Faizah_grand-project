'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-black via-indigo-950 to-blue-950 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/10 backdrop-blur-sm">
        <h2 className="text-xl font-bold text-white">Resume Tailor</h2>
        <Link href="/login">
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md hover:opacity-90">
            Login
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="text-center py-24 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
          Tailor Your Dream Resume
        </h1>
        <p className="text-lg text-zinc-300 mb-8 max-w-xl mx-auto">
          An AI-powered tool that crafts your CV perfectly for any job you’re applying for.
        </p>
        <Link href="/login">
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:opacity-90">
            Login to Get Started
          </Button>
        </Link>
      </motion.section>

      {/* How it Works */}
      <section className="py-16 px-8 grid gap-6 md:grid-cols-3 text-center max-w-6xl mx-auto">
        {[
          {
            title: "Upload Your Resume",
            desc: "Drop your current CV so we can tailor it accordingly.",
          },
          {
            title: "Paste Job Description",
            desc: "Provide the job details you want your resume matched with.",
          },
          {
            title: "Tailor Instantly",
            desc: "Get a perfect, AI-tuned resume ready to download!",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <h3 className="text-xl font-semibold text-purple-300 mb-2">{item.title}</h3>
            <p className="text-zinc-300">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Final CTA */}
      <motion.section
      className="text-center mt-auto mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-zinc-400">Ready to impress? Start tailoring now.</p>
    </motion.section>
    </main>
  )
}
