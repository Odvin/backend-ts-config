import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Course';
export const COLLECTION_NAME = 'courses';

export const enum CourseStatus {
  PUBLIC = 'PUBLIC',
  CIRCUMSCRIBED = 'CIRCUMSCRIBED',
  PROMOTION = 'PROMOTION'
}

export default interface Course extends Document {
  title: string;
  status?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true
    },
    status: {
      type: Schema.Types.String,
      required: true,
      enum: [
        CourseStatus.PUBLIC,
        CourseStatus.PROMOTION,
        CourseStatus.CIRCUMSCRIBED
      ]
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      required: true,
      select: false
    },
    updatedAt: {
      type: Date,
      required: true,
      select: false
    }
  },
  {
    versionKey: false
  }
);

export const CourseModel = model<Course>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
