import React from 'react';
import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Mission & Vision
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At EduPro, we believe in the transformative power of education. Our
              mission is to make quality education accessible to everyone,
              everywhere. We strive to create an engaging learning environment that
              inspires curiosity and fosters growth.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With a commitment to excellence and innovation, we empower learners
              to achieve their full potential and prepare them for success in
              their chosen fields. Our platform combines cutting-edge technology
              with expert instruction to deliver an unparalleled educational
              experience.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-muted-foreground">Students Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(var(--primary)/0.1)",
                  "0 0 20px 10px rgba(var(--primary)/0.2)",
                  "0 0 0 0 rgba(var(--primary)/0.1)"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative rounded-lg overflow-hidden image-glow"
            >
              <img
                src="/mission-image.jpg"
                alt="Our Mission"
                className="w-full h-auto rounded-lg shadow-xl transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;