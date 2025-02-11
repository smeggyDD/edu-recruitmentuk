import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { 
              opacity: 1, 
              scale: [0.9, 1],
            } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.9, 1, 0.9],
                boxShadow: [
                  "0 0 0 0 rgba(var(--primary)/0.1)",
                  "0 0 20px 10px rgba(var(--primary)/0.2)",
                  "0 0 0 0 rgba(var(--primary)/0.1)"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative rounded-lg overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7"
                alt="About Us"
                className="rounded-lg shadow-xl transition-all duration-300 hover:scale-105"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
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
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Expert Instructors</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}