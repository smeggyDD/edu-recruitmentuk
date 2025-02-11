import { 
  instructors, courses, courseCategories, courseEnrollments, users,
  type Instructor, type InsertInstructor,
  type Course, type InsertCourse,
  type CourseCategory, type InsertCourseCategory,
  type CourseEnrollment, type InsertCourseEnrollment,
  type User, type InsertUser
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import MemoryStore from "memorystore";
import session from "express-session";

const MemoryStoreSession = MemoryStore(session);

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Instructors
  getInstructor(id: number): Promise<Instructor | undefined>;
  listInstructors(): Promise<Instructor[]>;
  createInstructor(instructor: InsertInstructor): Promise<Instructor>;

  // Course Categories
  getCourseCategory(id: number): Promise<CourseCategory | undefined>;
  listCourseCategories(): Promise<CourseCategory[]>;
  createCourseCategory(category: InsertCourseCategory): Promise<CourseCategory>;

  // Courses
  getCourse(id: number): Promise<Course | undefined>;
  listCourses(): Promise<Course[]>;
  getCoursesByCategory(categoryId: number): Promise<Course[]>;
  getCoursesByInstructor(instructorId: number): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;

  // Course Enrollments
  createEnrollment(enrollment: InsertCourseEnrollment): Promise<CourseEnrollment>;
  getEnrollment(id: number): Promise<CourseEnrollment | undefined>;
  listEnrollmentsByCourse(courseId: number): Promise<CourseEnrollment[]>;

  // Session store
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore = new MemoryStoreSession({
    checkPeriod: 86400000 // prune expired entries every 24h
  });

  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  // Instructors
  async getInstructor(id: number): Promise<Instructor | undefined> {
    const [instructor] = await db.select().from(instructors).where(eq(instructors.id, id));
    return instructor;
  }

  async listInstructors(): Promise<Instructor[]> {
    return await db.select().from(instructors);
  }

  async createInstructor(instructor: InsertInstructor): Promise<Instructor> {
    const [newInstructor] = await db.insert(instructors).values(instructor).returning();
    return newInstructor;
  }

  // Course Categories
  async getCourseCategory(id: number): Promise<CourseCategory | undefined> {
    const [category] = await db.select().from(courseCategories).where(eq(courseCategories.id, id));
    return category;
  }

  async listCourseCategories(): Promise<CourseCategory[]> {
    return await db.select().from(courseCategories);
  }

  async createCourseCategory(category: InsertCourseCategory): Promise<CourseCategory> {
    const [newCategory] = await db.insert(courseCategories).values(category).returning();
    return newCategory;
  }

  // Courses
  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async listCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async getCoursesByCategory(categoryId: number): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.categoryId, categoryId));
  }

  async getCoursesByInstructor(instructorId: number): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.instructorId, instructorId));
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db.insert(courses).values(course).returning();
    return newCourse;
  }

  // Course Enrollments
  async createEnrollment(enrollment: InsertCourseEnrollment): Promise<CourseEnrollment> {
    const [newEnrollment] = await db.insert(courseEnrollments).values(enrollment).returning();
    return newEnrollment;
  }

  async getEnrollment(id: number): Promise<CourseEnrollment | undefined> {
    const [enrollment] = await db.select().from(courseEnrollments).where(eq(courseEnrollments.id, id));
    return enrollment;
  }

  async listEnrollmentsByCourse(courseId: number): Promise<CourseEnrollment[]> {
    return await db.select().from(courseEnrollments).where(eq(courseEnrollments.courseId, courseId));
  }
}

export const storage = new DatabaseStorage();