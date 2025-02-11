import { motion } from "framer-motion";
import { PageTransition } from "@/components/layout/page-transition";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  GraduationCap,
  BookOpen,
  UserCheck,
  Building2,
  Award,
} from "lucide-react";

const services = [
  {
    icon: <Users className="h-12 w-12 text-primary" />,
    title: "Teacher Recruitment",
    description:
      "We connect qualified teachers with educational institutions, ensuring the perfect match for both parties.",
  },
  {
    icon: <GraduationCap className="h-12 w-12 text-primary" />,
    title: "Educational Consulting",
    description:
      "Expert guidance on curriculum development, school management, and educational best practices.",
  },
  {
    icon: <BookOpen className="h-12 w-12 text-primary" />,
    title: "Training Programs",
    description:
      "Professional development courses for educators to enhance their teaching skills and knowledge.",
  },
  {
    icon: <UserCheck className="h-12 w-12 text-primary" />,
    title: "Staff Development",
    description:
      "Comprehensive programs to develop and upskill educational staff at all levels.",
  },
  {
    icon: <Building2 className="h-12 w-12 text-primary" />,
    title: "Institution Partnership",
    description:
      "Building strong partnerships between educational institutions for collaborative growth.",
  },
  {
    icon: <Award className="h-12 w-12 text-primary" />,
    title: "Quality Assurance",
    description:
      "Ensuring high standards in educational delivery through regular assessments and feedback.",
  },
];

export default function Services() {
  return (
    <PageTransition>
    <div className="min-h-screen flex flex-col">
      <Header />
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
                Our Services
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Comprehensive educational recruitment and development services
                tailored to your needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="mb-6">{service.icon}</div>
                      <h3 className="text-xl font-semibold mb-4">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
    </PageTransition>
  );
}
