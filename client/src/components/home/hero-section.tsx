import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { TypeAnimation } from "react-type-animation";
import { SiTiktok, SiFacebook, SiInstagram } from "react-icons/si";

export function HeroSection() {
  const [, setLocation] = useLocation();

  const handleExplore = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLocation("/courses");
  };

  return (
    <section className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="gpu-accelerated"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              <TypeAnimation
                sequence={[
                  "Top Courses",
                  2000,
                  "Premium Education",
                  2000,
                  "Quality Learning",
                  2000,
                ]}
                wrapper="span"
                speed={35}
                className="block text-primary"
                repeat={Infinity}
                deletionSpeed={25}
              />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="block text-foreground mt-2"
              >
                Expert Teachers,
              </motion.span>
              <span className="block text-primary mt-2">
                Endless Possibilities.
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="text-muted-foreground text-lg mb-8"
            >
              Embark on a journey of knowledge with our world-class educational
              platform. Transform your future with expert-led courses and
              innovative learning.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="gpu-accelerated"
              >
                <Button size="lg" className="group" onClick={handleExplore}>
                  Explore Courses
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="flex gap-6 items-center"
              >
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  href="https://tiktok.com/@edurecruitment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-primary transition-all duration-200 gpu-accelerated"
                >
                  <SiTiktok />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  href="https://facebook.com/edurecruitment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-primary transition-all duration-200 gpu-accelerated"
                >
                  <SiFacebook />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  href="https://instagram.com/edurecruitment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-primary transition-all duration-200 gpu-accelerated"
                >
                  <SiInstagram />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="relative group gpu-accelerated"
          >
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/40 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300"
              style={{
                opacity: 0.75,
                willChange: "opacity, filter",
                transform: "translateZ(0)",
              }}
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.75, 0.85, 0.75],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            />
            <motion.div
              className="relative rounded-lg overflow-hidden float-animation"
              style={{
                willChange: "transform",
                transform: "translateZ(0)",
              }}
              whileHover={{
                scale: 1.02,
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                },
              }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3"
                alt="Students learning"
                className="w-full h-auto rounded-lg shadow-2xl relative z-10"
                style={{
                  WebkitBackfaceVisibility: "hidden",
                  MozBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                  willChange: "transform, filter",
                  transform: "translateZ(0)",
                }}
                initial={{ filter: "brightness(0.9)" }}
                animate={{
                  filter: [
                    "brightness(0.9)",
                    "brightness(1.05)",
                    "brightness(0.9)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
