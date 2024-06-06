// import express from "express";
// import {Transcript} from "../models/transcriptModel.js";

// const router = express.Router();

// // Route to save transcript data
// router.post('/', async (req, res) => {
//   try {
//     const { speakingTime, transcript } = req.body;
//     const newTranscript = new Transcript({ speakingTime, transcript });
//     await newTranscript.save();
//     res.status(201).json({ message: 'Transcript data saved successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to save transcript data', error: error.message });
//   }
// });



// export default router;

import express from 'express';
import { Transcript } from '../models/transcriptModel.js';

const router = express.Router();


// Route to save a new transcript
router.post('/add', async (req, res) => {
  try {
    const { date, stoppedTime, speakingTime } = req.body;
    const transcript = new Transcript({
      date,
      stoppedTime,
      speakingTime
    });
    const savedTranscript = await transcript.save();
    res.status(201).json(savedTranscript);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch all transcripts
router.get('/all', async (req, res) => {
  try {
    const transcripts = await Transcript.find();
    res.status(200).json(transcripts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get the last added transcript
router.get('/last', async (req, res) => {
  try {
    const lastTranscript = await Transcript.findOne().sort({ _id: -1 }).limit(1);
    res.status(200).json(lastTranscript);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get the sum of all total speak times
router.get('/total-speak-time', async (req, res) => {
  try {
    const totalSpeakTime = await Transcript.aggregate([
      { $group: { _id: null, totalSpeakTime: { $sum: '$speakingTime' } } }
    ]);

    res.status(200).json(totalSpeakTime[0]?.totalSpeakTime || 0);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;