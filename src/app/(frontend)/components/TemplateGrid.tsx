'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TemplateCard from './TemplateCard'
import CategoryFilter from './CategoryFilter'
import type { Template, Category } from '@/payload-types'

interface TemplateGridProps {
  templates: Template[]
  categories: Category[]
}

export default function TemplateGrid({
  templates,
  categories,
}: TemplateGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesCategory =
        selectedCategory === null ||
        (template.categories &&
          Array.isArray(template.categories) &&
          template.categories.some((cat) => {
            const categorySlug =
              typeof cat === 'object' ? cat.slug : null
            return categorySlug === selectedCategory
          }))

      const matchesSearch =
        searchQuery === '' ||
        template.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description?.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [templates, selectedCategory, searchQuery])

  return (
    <section id="templates" className="templates-section">
      <div className="section-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="search-container"
        >
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="search-icon"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </motion.div>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory || 'all'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="templates-grid"
        >
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template, index) => (
              <TemplateCard key={template.id} template={template} index={index} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="no-templates"
            >
              <p>No templates found matching your criteria.</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

