import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;


export const instructors = pgTable("instructors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  bio: text("bio"),
  expertise: text("expertise").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const courseCategories = pgTable("course_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  slug: text("slug").notNull().unique(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  categoryId: integer("category_id").references(() => courseCategories.id),
  instructorId: integer("instructor_id").references(() => instructors.id),
  price: doublePrecision("price").notNull(),
  duration: text("duration").notNull(),
  level: text("level").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const courseEnrollments = pgTable("course_enrollments", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id),
  studentEmail: text("student_email").notNull(),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  status: text("status").notNull(),
});

// Relations
export const coursesRelations = relations(courses, ({ one }) => ({
  category: one(courseCategories, {
    fields: [courses.categoryId],
    references: [courseCategories.id],
  }),
  instructor: one(instructors, {
    fields: [courses.instructorId],
    references: [instructors.id],
  }),
}));

// Insert Schemas
export const insertInstructorSchema = createInsertSchema(instructors).omit({
  id: true,
  createdAt: true,
});

export const insertCourseCategorySchema = createInsertSchema(courseCategories).omit({
  id: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
});

export const insertCourseEnrollmentSchema = createInsertSchema(courseEnrollments).omit({
  id: true,
  enrolledAt: true,
});

// Types
export type Instructor = typeof instructors.$inferSelect;
export type InsertInstructor = z.infer<typeof insertInstructorSchema>;

export type CourseCategory = typeof courseCategories.$inferSelect;
export type InsertCourseCategory = z.infer<typeof insertCourseCategorySchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type CourseEnrollment = typeof courseEnrollments.$inferSelect;
export type InsertCourseEnrollment = z.infer<typeof insertCourseEnrollmentSchema>;