import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail } from "./email";
import { insertCourseSchema, insertInstructorSchema, insertCourseCategorySchema, insertCourseEnrollmentSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  // Courses API
  app.get("/api/courses", async (_req, res) => {
    const courses = await storage.listCourses();
    res.json(courses);
  });

  app.get("/api/courses/:id", async (req, res) => {
    const course = await storage.getCourse(Number(req.params.id));
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  });

  app.post("/api/courses", async (req, res) => {
    const parsed = insertCourseSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid course data" });
    }
    const course = await storage.createCourse(parsed.data);
    res.status(201).json(course);
  });

  // Categories API
  app.get("/api/categories", async (_req, res) => {
    const categories = await storage.listCourseCategories();
    res.json(categories);
  });

  app.post("/api/categories", async (req, res) => {
    const parsed = insertCourseCategorySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid category data" });
    }
    const category = await storage.createCourseCategory(parsed.data);
    res.status(201).json(category);
  });

  // Instructors API
  app.get("/api/instructors", async (_req, res) => {
    const instructors = await storage.listInstructors();
    res.json(instructors);
  });

  app.post("/api/instructors", async (req, res) => {
    const parsed = insertInstructorSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid instructor data" });
    }
    const instructor = await storage.createInstructor(parsed.data);
    res.status(201).json(instructor);
  });

  // Enrollments API
  app.post("/api/enrollments", async (req, res) => {
    const parsed = insertCourseEnrollmentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid enrollment data" });
    }
    const enrollment = await storage.createEnrollment(parsed.data);
    res.status(201).json(enrollment);
  });

  app.get("/api/courses/:courseId/enrollments", async (req, res) => {
    const enrollments = await storage.listEnrollmentsByCourse(Number(req.params.courseId));
    res.json(enrollments);
  });

  // Contact Form API
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Log request for debugging
      console.log('Attempting to send email with data:', { name, email, subject });

      await sendContactEmail(name, email, subject, message);
      console.log('Email sent successfully');
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error('Email sending error:', error);
      res.status(500).json({ 
        message: "Failed to send email", 
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}