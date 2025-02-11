var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  courseCategories: () => courseCategories,
  courseEnrollments: () => courseEnrollments,
  courses: () => courses,
  coursesRelations: () => coursesRelations,
  insertCourseCategorySchema: () => insertCourseCategorySchema,
  insertCourseEnrollmentSchema: () => insertCourseEnrollmentSchema,
  insertCourseSchema: () => insertCourseSchema,
  insertInstructorSchema: () => insertInstructorSchema,
  insertUserSchema: () => insertUserSchema,
  instructors: () => instructors,
  users: () => users
});
import { pgTable, text, serial, integer, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var instructors = pgTable("instructors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  bio: text("bio"),
  expertise: text("expertise").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow()
});
var courseCategories = pgTable("course_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  slug: text("slug").notNull().unique()
});
var courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  categoryId: integer("category_id").references(() => courseCategories.id),
  instructorId: integer("instructor_id").references(() => instructors.id),
  price: doublePrecision("price").notNull(),
  duration: text("duration").notNull(),
  level: text("level").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow()
});
var courseEnrollments = pgTable("course_enrollments", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id),
  studentEmail: text("student_email").notNull(),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  status: text("status").notNull()
});
var coursesRelations = relations(courses, ({ one }) => ({
  category: one(courseCategories, {
    fields: [courses.categoryId],
    references: [courseCategories.id]
  }),
  instructor: one(instructors, {
    fields: [courses.instructorId],
    references: [instructors.id]
  })
}));
var insertInstructorSchema = createInsertSchema(instructors).omit({
  id: true,
  createdAt: true
});
var insertCourseCategorySchema = createInsertSchema(courseCategories).omit({
  id: true
});
var insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true
});
var insertCourseEnrollmentSchema = createInsertSchema(courseEnrollments).omit({
  id: true,
  enrolledAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq } from "drizzle-orm";
import MemoryStore from "memorystore";
import session from "express-session";
var MemoryStoreSession = MemoryStore(session);
var DatabaseStorage = class {
  sessionStore = new MemoryStoreSession({
    checkPeriod: 864e5
    // prune expired entries every 24h
  });
  // Users
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  async createUser(user) {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }
  // Instructors
  async getInstructor(id) {
    const [instructor] = await db.select().from(instructors).where(eq(instructors.id, id));
    return instructor;
  }
  async listInstructors() {
    return await db.select().from(instructors);
  }
  async createInstructor(instructor) {
    const [newInstructor] = await db.insert(instructors).values(instructor).returning();
    return newInstructor;
  }
  // Course Categories
  async getCourseCategory(id) {
    const [category] = await db.select().from(courseCategories).where(eq(courseCategories.id, id));
    return category;
  }
  async listCourseCategories() {
    return await db.select().from(courseCategories);
  }
  async createCourseCategory(category) {
    const [newCategory] = await db.insert(courseCategories).values(category).returning();
    return newCategory;
  }
  // Courses
  async getCourse(id) {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }
  async listCourses() {
    return await db.select().from(courses);
  }
  async getCoursesByCategory(categoryId) {
    return await db.select().from(courses).where(eq(courses.categoryId, categoryId));
  }
  async getCoursesByInstructor(instructorId) {
    return await db.select().from(courses).where(eq(courses.instructorId, instructorId));
  }
  async createCourse(course) {
    const [newCourse] = await db.insert(courses).values(course).returning();
    return newCourse;
  }
  // Course Enrollments
  async createEnrollment(enrollment) {
    const [newEnrollment] = await db.insert(courseEnrollments).values(enrollment).returning();
    return newEnrollment;
  }
  async getEnrollment(id) {
    const [enrollment] = await db.select().from(courseEnrollments).where(eq(courseEnrollments.id, id));
    return enrollment;
  }
  async listEnrollmentsByCourse(courseId) {
    return await db.select().from(courseEnrollments).where(eq(courseEnrollments.courseId, courseId));
  }
};
var storage = new DatabaseStorage();

// server/email.ts
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
async function verifyEmailConfig() {
  try {
    await transporter.verify();
    console.log("Email server connection verified");
    return true;
  } catch (error) {
    console.error("Email server connection failed:", error);
    return false;
  }
}
async function sendContactEmail(name, email, subject, message) {
  const isEmailConfigValid = await verifyEmailConfig();
  if (!isEmailConfigValid) {
    throw new Error("Email service is not properly configured");
  }
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "info@edurecruitment.org",
    subject: `Contact Form: ${subject}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}

// server/routes.ts
function registerRoutes(app2) {
  app2.get("/api/courses", async (_req, res) => {
    const courses2 = await storage.listCourses();
    res.json(courses2);
  });
  app2.get("/api/courses/:id", async (req, res) => {
    const course = await storage.getCourse(Number(req.params.id));
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  });
  app2.post("/api/courses", async (req, res) => {
    const parsed = insertCourseSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid course data" });
    }
    const course = await storage.createCourse(parsed.data);
    res.status(201).json(course);
  });
  app2.get("/api/categories", async (_req, res) => {
    const categories = await storage.listCourseCategories();
    res.json(categories);
  });
  app2.post("/api/categories", async (req, res) => {
    const parsed = insertCourseCategorySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid category data" });
    }
    const category = await storage.createCourseCategory(parsed.data);
    res.status(201).json(category);
  });
  app2.get("/api/instructors", async (_req, res) => {
    const instructors2 = await storage.listInstructors();
    res.json(instructors2);
  });
  app2.post("/api/instructors", async (req, res) => {
    const parsed = insertInstructorSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid instructor data" });
    }
    const instructor = await storage.createInstructor(parsed.data);
    res.status(201).json(instructor);
  });
  app2.post("/api/enrollments", async (req, res) => {
    const parsed = insertCourseEnrollmentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid enrollment data" });
    }
    const enrollment = await storage.createEnrollment(parsed.data);
    res.status(201).json(enrollment);
  });
  app2.get("/api/courses/:courseId/enrollments", async (req, res) => {
    const enrollments = await storage.listEnrollmentsByCourse(Number(req.params.courseId));
    res.json(enrollments);
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      console.log("Attempting to send email with data:", { name, email, subject });
      await sendContactEmail(name, email, subject, message);
      console.log("Email sent successfully");
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Email sending error:", error);
      res.status(500).json({
        message: "Failed to send email",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [react(), runtimeErrorOverlay(), themePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "client/src/index.html")
      // Ensure this path matches your project structure
    }
  },
  server: {
    open: true,
    port: 3e3
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename = fileURLToPath(import.meta.url);
var __dirname2 = dirname(__filename);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const PORT = 5e3;
  server.listen(PORT, "0.0.0.0", () => {
    log(`Server running at http://0.0.0.0:${PORT}`);
  });
})();
