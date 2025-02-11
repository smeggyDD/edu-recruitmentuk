import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/layout/page-transition";

const courses = [
  {
    title: "Teaching Certification Program",
    category: "Education",
    duration: "12 weeks",
    level: "Professional",
    description: "Comprehensive teacher training program designed for aspiring educators.",
    price: "£1,499",
  },
  {
    title: "School Leadership Development",
    category: "Management",
    duration: "16 weeks",
    level: "Advanced",
    description: "Advanced program for educators moving into leadership positions.",
    price: "£2,299",
  },
  {
    title: "Special Education Training",
    category: "Specialized",
    duration: "10 weeks",
    level: "Intermediate",
    description: "Specialized training for teaching students with diverse learning needs.",
    price: "£1,799",
  },
  {
    title: "Early Years Education",
    category: "Education",
    duration: "8 weeks",
    level: "Beginner",
    description: "Foundation course for early childhood education professionals.",
    price: "£999",
  },
  {
    title: "Educational Technology Integration",
    category: "Technology",
    duration: "6 weeks",
    level: "Intermediate",
    description: "Learn to effectively integrate technology in classroom teaching.",
    price: "£899",
  },
  {
    title: "Curriculum Development",
    category: "Education",
    duration: "14 weeks",
    level: "Advanced",
    description: "Master the art of curriculum design and development.",
    price: "£1,999",
  },
];

export default function Courses() {
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
                  Our Courses
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Discover our comprehensive range of educational courses designed to enhance your teaching career
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                          <p className="text-muted-foreground">{course.description}</p>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div>Category: {course.category}</div>
                          <div>Duration: {course.duration}</div>
                          <div>Level: {course.level}</div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-lg font-semibold text-primary">{course.price}</span>
                          <Button size="sm">Learn More</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
}