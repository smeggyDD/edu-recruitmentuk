import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Users, BookOpen, Trophy, 
  Monitor, Brain, Target
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <Users className="h-8 w-8" />,
    title: "Expert Teachers",
    description: "Learn from industry professionals with years of experience",
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: "Diverse Courses",
    description: "Wide range of courses to suit your learning needs",
  },
  {
    icon: <Trophy className="h-8 w-8" />,
    title: "High Success Rate",
    description: "95% of our students achieve their learning goals",
  },
  {
    icon: <Monitor className="h-8 w-8" />,
    title: "Online Learning",
    description: "Access your courses anytime, anywhere",
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "Personalized Learning",
    description: "Adaptive learning paths tailored to your pace",
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Career Support",
    description: "Get guidance for your career development",
  },
];

export function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Why Choose Our Platform
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide the best educational experience with features that set us apart
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 text-primary">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
