import mongoose from "mongoose";

const vocabSchema = new mongoose.Schema({
  vocabulary: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
    required: true,
  },
  synonym: {
    type: String,
  },
  antonym: {
    type: String,
  },
});

const Vocab = mongoose.model("Vocab", vocabSchema);

export default Vocab;
