import { motion } from "framer-motion";
import { PageTransition } from "@/components/layout/page-transition";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState, useRef } from "react";

export default function Contact() {
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
        try {
          if (formRef.current) {
            formRef.current.reset();
          } else {
            form.reset();
          }

          toast({
            title: "Message Sent!",
            description: "Thank you for your message. We'll get back to you soon!",
            className: "bg-green-500 text-white border-none",
          });
        } catch (resetError) {
          console.error('Form reset error:', resetError);
          toast({
            title: "Message Sent!",
            description: "Thank you for your message. We'll get back to you soon! Please refresh the page.",
            className: "bg-green-500 text-white border-none",
          });
        }
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageTransition>
        <main className="flex-grow pt-16">
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Contact Us
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  We're here to help. Reach out to us with any questions about our educational services.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
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
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="space-y-8">
                    <div className="w-full h-[300px] rounded-lg overflow-hidden shadow-lg mb-8">
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
                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                        <p className="text-muted-foreground">203 9300 985</p>
                        <p className="text-muted-foreground">07732793920</p>
                        <p className="text-muted-foreground">07506 915782</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                        <p className="text-muted-foreground">info@edurecruitment.org</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
                        <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p className="text-muted-foreground">Saturday: By Appointment</p>
                        <p className="text-muted-foreground">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
}