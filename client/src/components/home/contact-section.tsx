import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState, useRef } from "react";
import { SiTiktok, SiFacebook, SiInstagram } from 'react-icons/si';

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        if (formRef.current) {
          formRef.current.reset();
        }
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. We'll get back to you soon!",
          className: "bg-green-500 text-white border-none",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions? We're here to help! Reach out through any of our channels.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-6">
                <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <Input name="name" placeholder="Your Name" required />
                  </div>
                  <div>
                    <Input name="email" type="email" placeholder="Your Email" required />
                  </div>
                  <div>
                    <Input name="subject" placeholder="Subject" required />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      className="min-h-[150px]"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">◌</span>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg mb-8">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.7440789533695!2d0.07773121562831924!3d51.55862397964502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a64b290867c3%3A0x31f1c5a5b9c33a71!2s316E%20Ilford%20Ln%2C%20Ilford%20IG1%202LT%2C%20UK!5e0!3m2!1sen!2sus!4v1645561234567!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  ></iframe>
                </div>

                <div className="space-y-6 flex-grow">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href="mailto:info@edurecruitment.org" className="text-primary hover:underline">
                      info@edurecruitment.org
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div className="space-y-1">
                      <a href="tel:2039300985" className="block text-primary hover:underline">203 9300 985</a>
                      <a href="tel:07732793920" className="block text-primary hover:underline">07732 793920</a>
                      <a href="tel:07506915782" className="block text-primary hover:underline">07506 915782</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>316E Ilford Lane, Ilford IG1 2LT, UK</span>
                  </div>
                </div>

                <div className="flex justify-center gap-6 mt-8">
                  <motion.a
                    whileHover={{ scale: 1.2, y: -4 }}
                    href="https://tiktok.com/@edurecruitment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-primary transition-all duration-300"
                  >
                    <SiTiktok />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.2, y: -4 }}
                    href="https://facebook.com/edurecruitment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-primary transition-all duration-300"
                  >
                    <SiFacebook />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.2, y: -4 }}
                    href="https://instagram.com/edurecruitment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-primary transition-all duration-300"
                  >
                    <SiInstagram />
                  </motion.a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}