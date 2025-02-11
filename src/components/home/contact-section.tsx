import React from 'react';
import { motion } from 'framer-motion';
import { SiTiktok, SiFacebook, SiInstagram } from 'react-icons/si';
import { Card, CardContent } from '@/components/ui/card';

export const ContactSection = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold tracking-tighter mb-4">Contact Us</h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            Have questions? We're here to help! Reach out to us through any of these channels.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="aspect-video w-full rounded-lg overflow-hidden mb-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=your-map-embed-url"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="flex justify-center gap-6 mt-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://tiktok.com/@eduplatform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-primary transition-colors"
                  >
                    <SiTiktok />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://facebook.com/eduplatform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-primary transition-colors"
                  >
                    <SiFacebook />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://instagram.com/eduplatform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-primary transition-colors"
                  >
                    <SiInstagram />
                  </motion.a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">Email:</span>
                    <a href="mailto:contact@eduplatform.com" className="text-primary hover:underline">
                      contact@eduplatform.com
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">Phone:</span>
                    <a href="tel:+1234567890" className="text-primary hover:underline">
                      +1 (234) 567-890
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">Address:</span>
                    <span>123 Education Street, Learning City, ED 12345</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};