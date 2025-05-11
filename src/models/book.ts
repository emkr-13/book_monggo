import { Schema, model, Document } from "mongoose";
import Counter from "./counter";

export interface IAuthorRef {
  id: number;
  name?: string;
  nationality?: string;
}

export interface IBook extends Document {
  id: number;
  title: string;
  author: number | IAuthorRef; // Reference to Author's id (number)
  isbn?: string;
  publishedYear: number;
  genre?: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

const bookSchema = new Schema<IBook>(
  {
    id: { type: Number, unique: true },
    title: {
      type: String,
      required: true,
      maxlength: 200,
      trim: true,
    },
    author: {
      type: Number,
      ref: "Author",
      required: true,
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true,
      match: [
        /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)/,
        "Please provide a valid ISBN",
      ],
    },
    publishedYear: {
      type: Number,
      min: 1000,
      max: new Date().getFullYear(),
    },
    genre: [
      {
        type: String,
        enum: [
          "Fiction",
          "Non-Fiction",
          "Science",
          "History",
          "Biography",
          "Fantasy",
          "Romance",
        ],
      },
    ],
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret._id;
        delete ret.deletedAt;
      },
    },
  }
);

// Auto-increment ID middleware
bookSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "bookId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
    next();
  } catch (err: any) {
    next(err);
  }
});

export default model<IBook>("Book", bookSchema);
