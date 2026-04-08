"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/pages/contact-us/Hero";
import ContactForm from "@/components/pages/contact-us/ContactForm";
import ContactInfo from "@/components/pages/contact-us/ContactInfo";

export default function ContactPage() {
  return (
    <div
      style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: "20px" }}
      className="
        min-h-screen 
        bg-gray-50 dark:bg-gray-900 
        text-gray-900 dark:text-gray-100 
        transition-colors duration-300
      "
    >
      {/* Hero Section */}
      <motion.div
        className="bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
      </motion.div>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-6 pb-20 pt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT - FORM */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-colors duration-300"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ContactForm />
        </motion.div>

        {/* RIGHT - INFO */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
            whileHover={{ scale: 1.03 }}
          >
            <ContactInfo />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
