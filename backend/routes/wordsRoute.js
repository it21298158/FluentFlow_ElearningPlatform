import express from 'express';
import { Word } from '../models/wordModel.js';

const router = express.Router();

//Route for save a new word with its synonyms
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.word ||
            !request.body.synonyms
        ) {
            return response.status(400).send({
                message: 'Send all required fields: word, synonyms',
            });
        }
        const newWord = {
            word: request.body.word,
            synonyms: request.body.synonyms,
        };

      const word = await Word.create(newWord); 
      
      return response.status(201).send(word);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for get all words and their synonyms from the database
router.get('/', async (request, response) => {
    try {
        const words = await Word.find({});

        return response.status(200).json({
            count: words.length,
            data: words
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Route for get synonyms of a word from the database by word
router.get('/:word', async (request, response) => {
    try {
        const { word } = request.params;

        // Find the word in the database
        const foundWord = await Word.findOne({ word });

        if (!foundWord) {
            return response.status(404).json({ message: 'Word not found' });
        }

        // Return the synonyms for the word
        return response.status(200).json(foundWord.synonyms);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});



//Route for get one word with its synonyms from the database by id
// router.get('/:id', async (request, response) => {
//     try {

//         const { id } = request.params;

//         const word = await Word.findById(id);

//         return response.status(200).json(word);
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });

export default router;