import { BookOpen, Code, Users, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

const deepDives = [
  {
    icon: BookOpen,
    title: 'API Integration',
    description: 'Complete API reference with authentication, rate limits, and advanced query patterns.',
    tags: ['REST', 'GraphQL', 'Webhooks']
  },
  {
    icon: Code,
    title: 'SDK Reference',
    description: 'Native SDKs for Python, JavaScript, Java with full documentation and examples.',
    tags: ['Python', 'JavaScript', 'Java']
  },
  {
    icon: Shield,
    title: 'Security Protocols',
    description: 'Deep dive into encryption, compliance, and security best practices.',
    tags: ['HIPAA', 'Encryption', 'Audit Logs']
  },
  {
    icon: Users,
    title: 'User Management',
    description: 'Role-based access control, user provisioning, and team collaboration features.',
    tags: ['RBAC', 'SSO', 'Teams']
  }
]

export default function TechnicalDeepDives() {
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
        <motion.div className="mb-12" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Technical Deep Dives
          </h2>
          <p className="text-lg text-foreground/60">
            Comprehensive guides for advanced implementations
          </p>
        </motion.div>
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {deepDives.map((dive, idx) => {
            const Icon = dive.icon
            return (
              <motion.div key={idx} variants={itemVariants} className="p-6 bg-white rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition dark:bg-black dark:to-white" whileHover={{ y: -5 }}>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-primary" size={20} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {dive.title}
                </h3>
                <p className="text-foreground/70 text-sm mb-4 leading-relaxed">
                  {dive.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {dive.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
