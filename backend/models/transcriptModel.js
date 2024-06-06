import mongoose from "mongoose";

const transcriptSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
      },
      stoppedTime: {
        type: String,
        required: true
      },
      speakingTime: {
        type: Number,
        required: true
      }
    });

//const Transcript = mongoose.model('Transcript', transcriptSchema);

//export default Transcript;

export const Transcript = mongoose.model('Transcript', transcriptSchema);