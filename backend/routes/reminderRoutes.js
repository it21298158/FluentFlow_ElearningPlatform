import express from 'express';
import Reminder from '../models/reminderModel.js';

const router = express.Router();

// Route to save calendar date, time, and title
router.post('/add', async (req, res) => {
    try {
        const { title, date, time } = req.body;
        const newReminder = new Reminder({ title, date, time });
        await newReminder.save();
        res.status(201).json({ message: 'Reminder added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for getting all reminders
router.get('/list', async (req, res) => {
    try {
        const reminders = await Reminder.find().sort({ createdAt: -1 });
        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for Delete reminders
router.delete('/delete/:id', async (req, res) => {
    try {
      const reminder = await Reminder.findById(req.params.id);
      if (!reminder) {
        return res.status(404).json({ message: 'Reminder not found' });
      }
      await reminder.deleteOne();
      res.json({ message: 'Reminder deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Route to periodically check for matching reminders
// router.get('/check', async (req, res) => {
//   try {
//       const currentDate = new Date();
//       const reminders = await Reminder.find({
//           date: { $eq: currentDate.toISOString().split('T')[0] }, // Match date
//           time: currentDate.getHours() + ':' + currentDate.getMinutes() // Match time
//       });

//       res.status(200).json(reminders);
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// });  

// router.get('/check', async (req, res) => {
//   try {
//     const currentDate = new Date();
//     const currentHour = currentDate.getHours().toString().padStart(2, '0'); // Ensure two digits for hours
//     const currentMinute = currentDate.getMinutes().toString().padStart(2, '0'); // Ensure two digits for minutes
//     const formattedTime = `${currentHour}:${currentMinute}`;

//     const reminders = await Reminder.find({
//       date: { $eq: currentDate.toISOString().split('T')[0] }, // Match date
//       time: formattedTime, // Match time in HH:MM format
//     });

//     res.status(200).json(reminders);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

export default router;