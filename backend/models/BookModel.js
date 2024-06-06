import mongoose from 'mongoose';

const BookSchema = mongoose.Schema(
  {
    BookTitle: {
      type: String,
      required: true,
    },
    BookAuthor: {
      type: String,
      required: true,
    },
    BookImg_Url: {
        type: String,
        required: true,
      },
      BookDescription: {
        type: String,
        required: true,
      },
      LearningTime: {
        type: String,
        required: true,
      },
    
    word: {
      type: String,
      required: true,
    },
    sentences: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model('Book', BookSchema);
