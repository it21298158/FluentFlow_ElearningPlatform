import express from 'express';
import { Book } from '../models/BookModel.js';

const router = express.Router();

// Route for Save a new Book
router.post('/', async (request, response) => {
    try {
      if (
        !request.body.BookTitle ||
        !request.body.BookAuthor ||
        !request.body. BookImg_Url ||
        !request.body.BookDescription||
        !request.body.LearningTime ||
        !request.body.word ||
        !request.body.sentences
      ) {
        return response.status(400).send({
          message: 'Send all required fields: BookTitle, BookAuthor, BookImg_Url, BookDescription, LearningTime , word , sentences'
        });
      }
      const newBook = {
        BookTitle: request.body.BookTitle,
        BookAuthor: request.body.BookAuthor,
        BookImg_Url: request.body.BookImg_Url,
        BookDescription: request.body.BookDescription,
        LearningTime: request.body.LearningTime,
        word : request.body.word,
        sentences: request.body.sentences,
      };
      const book = await Book.create(newBook);

      return response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  // Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await Book.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Book not found' });
      }
  
      return response.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  // Route for Update a Book
router.put('/:id', async (request, response) => {
    try {
      if (
        !request.body.BookTitle ||
        !request.body.BookAuthor ||
        !request.body. BookImg_Url ||
        !request.body.BookDescription||
        !request.body.LearningTime ||
        !request.body.word ||
        !request.body.sentences
      ){
        return response.status(400).send({
          message: 'Send all required fields: BookTitle, BookAuthor, BookImg_Url, BookDescription,LearningTime , word , sentences'
        });
      }
  
      const { id } = request.params;
  
      const result = await Book.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Book not found' });
      }
  
      return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  
export default router;