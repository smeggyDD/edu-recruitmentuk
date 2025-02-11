import React from 'react';
import { motion } from 'framer-motion';
import { SiTiktok, SiFacebook, SiInstagram } from 'react-icons/si';

export const HeroSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, var(--primary)/10% 0%, transparent 70%)',
          animation: 'pulse 4s ease-in-out infinite'
        }}
      />

      <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center gap-6 relative z-10">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
            Welcome to Our Educational Platform
          </h1>
          <p className="text-muted-foreground max-w-[600px] text-lg">
            Transform your learning journey with our innovative educational solutions.
          </p>
          <div className="flex gap-4 pt-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex gap-6"
            >
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://tiktok.com/@eduplatform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary transition-all duration-300"
              >
                <SiTiktok />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://facebook.com/eduplatform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary transition-all duration-300"
              >
                <SiFacebook />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://instagram.com/eduplatform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary transition-all duration-300"
              >
                <SiInstagram />
              </motion.a>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative"
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
              src="/hero-image.jpg" 
              alt="Educational Platform"
              className="w-full h-auto rounded-lg shadow-2xl transition-transform duration-700 hover:scale-105"
            />
          </motion.div>
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
            className="relative rounded-lg overflow-hidden image-glow mt-4"
          >
            <img
              src="/second-hero-image.jpg"  
              alt="Second Image"
              className="w-full h-auto rounded-lg shadow-2xl transition-transform duration-700 hover:scale-105"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};