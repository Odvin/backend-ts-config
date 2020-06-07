import Course, { CourseModel } from '../models/courses';

export default class CourseRepo {
  public static async create(course: Course): Promise<Course> {
    const now = new Date();
    course.createdAt = course.updatedAt = now;

    return CourseModel.create(course);
  }
}
