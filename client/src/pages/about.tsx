import { motion } from "framer-motion";
import { PageTransition } from "@/components/layout/page-transition";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, Award, Target } from "lucide-react";
import { useInView } from "react-intersection-observer";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px',
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const imageVariants = {
    hidden: { 
      scale: 1.2,
      opacity: 0,
      y: 20
    },
    visible: { 
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.6, 0.01, -0.05, 0.95],
        opacity: { duration: 0.8 }
      }
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
                  About EduRecruitment
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Transforming education through expert recruitment and professional development
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    At EduRecruitment, we're dedicated to connecting exceptional educators
                    with institutions that value quality education. Our mission is to elevate
                    the standard of education by ensuring schools have access to the most
                    qualified and passionate teaching professionals.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We believe that great teachers are the foundation of excellent education,
                    and we work tirelessly to support both educators and institutions in
                    achieving their goals.
                  </p>
                </motion.div>

                <motion.div
                  ref={ref}
                  variants={containerVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="relative overflow-hidden rounded-lg shadow-xl"
                >
                  <motion.div
                    variants={imageVariants}
                    className="relative aspect-[4/3]"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655"
                      alt="Education"
                      className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                {[
                  {
                    icon: <Users className="h-10 w-10 text-primary" />,
                    title: "Expert Team",
                    description: "Experienced recruitment specialists with education sector expertise"
                  },
                  {
                    icon: <GraduationCap className="h-10 w-10 text-primary" />,
                    title: "Quality Focus",
                    description: "Rigorous screening process to ensure the highest teaching standards"
                  },
                  {
                    icon: <Target className="h-10 w-10 text-primary" />,
                    title: "Tailored Matching",
                    description: "Precise matching of educators with compatible institutions"
                  },
                  {
                    icon: <Award className="h-10 w-10 text-primary" />,
                    title: "Continuous Support",
                    description: "Ongoing professional development and career guidance"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 text-center">
                        <div className="mb-4 flex justify-center">{item.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold mb-6">Our Values</h2>
                <div className="max-w-3xl mx-auto">
                  <p className="text-muted-foreground leading-relaxed">
                    We uphold the highest standards of professionalism, integrity, and
                    dedication in every aspect of our work. Our commitment to excellence
                    drives us to continuously innovate and improve our services, ensuring
                    we remain at the forefront of educational recruitment.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
}