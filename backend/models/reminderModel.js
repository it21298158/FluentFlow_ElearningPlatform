import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

export default Reminder;
