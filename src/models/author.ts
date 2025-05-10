import { Schema, model, Document } from "mongoose";
import Counter from "./counter";

export interface IAuthor extends Document {
  id: number;
  name: string;
  biography?: string;
  nationality?: string;
  books?: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

const authorSchema = new Schema<IAuthor>(
  {
    id: { type: Number, unique: true },
    name: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true
    },
    biography: {
      type: String,
      maxlength: 2000
    },
    nationality: {
      type: String,
      maxlength: 100
    },
    books: [{
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }],
    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.__v;
        delete ret._id;
        delete ret.deletedAt;
      }
    }
  }
);

// Auto-increment ID middleware
authorSchema.pre('save', async function(next) {
  if (!this.isNew) return next();
  
  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'authorId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
    next();
  } catch (err: any) {
    next(err);
  }
});

export default model<IAuthor>('Author', authorSchema);