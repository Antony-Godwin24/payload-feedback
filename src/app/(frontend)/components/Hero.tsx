'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="hero">
      <div className="hero-background">
        <motion.div
          className="hero-gradient"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        />
      </div>
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-title"
          >
            Premium Templates
            <br />
            <span className="gradient-text">For Your Next Project</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-description"
          >
            Discover beautifully crafted templates designed to help you build
            stunning websites faster. Professional quality, ready to use.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-cta"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-primary"
              onClick={() => {
                const templatesSection = document.getElementById('templates')
                templatesSection?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Browse Templates
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-secondary"
              onClick={() => {
                const templatesSection = document.getElementById('templates')
                templatesSection?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View Categories
            </motion.button>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hero-visual"
        >
          <div className="floating-card card-1">
            <div className="card-content" />
          </div>
          <div className="floating-card card-2">
            <div className="card-content" />
          </div>
          <div className="floating-card card-3">
            <div className="card-content" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

