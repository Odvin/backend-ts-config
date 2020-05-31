import { EntityRepository, Repository } from 'typeorm';
import { Courses } from '../entities/courses.entity';

@EntityRepository(Courses)
export class CoursesRepository extends Repository<Courses> {}
