import { FileText, Link2, Code2 } from 'lucide-react'
import { motion } from 'framer-motion'

const resources = [
  {
    title: 'DLL Documents',
    description: 'Official documentation library with specifications, white papers, and implementation guides.',
    icon: FileText,
    items: ['API Specifications', 'Architecture Guide', 'Data Dictionary', 'Compliance Matrix'],
    color: 'bg-primary/5',
    iconColor: 'text-primary'
  },
  {
    title: 'API Resources',
    description: 'Complete API documentation including endpoints, examples, and error handling.',
    icon: Code2,
    items: ['REST Endpoints', 'Authentication', 'Rate Limiting', 'Error Codes'],
    color: 'bg-secondary/5',
    iconColor: 'text-secondary'
  },
  {
    title: 'Integration Tools',
    description: 'Pre-built tools and utilities for common integration scenarios.',
    icon: Link2,
    items: ['SDKs', 'Libraries', 'CLI Tools', 'Testing Tools'],
    color: 'bg-accent/5',
    iconColor: 'text-accent'
  }
]

export default function ResourceSections() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black dark:to-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {resources.map((resource, idx) => {
            const Icon = resource.icon
            return (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className={`p-8 rounded-xl border border-border hover:shadow-lg transition ${resource.color}`}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-12 h-12 ${resource.color} rounded-lg flex items-center justify-center mb-4 border border-border`}>
                  <Icon className={resource.iconColor} size={24} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {resource.title}
                </h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  {resource.description}
                </p>
                <div className="space-y-2">
                  {resource.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-center gap-2 text-foreground/80">
                      <span className={`w-1.5 h-1.5 rounded-full ${resource.iconColor}`}></span>
                      {item}
                    </div>
                  ))}
                </div>
                <button className="mt-6 text-primary font-semibold hover:text-primary/80 transition flex items-center gap-2 w-full justify-center py-2 border border-border rounded-lg hover:bg-primary/5">
                  Explore
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    →
                  </motion.span>
                </button>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
