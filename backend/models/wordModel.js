import mongoose from "mongoose";

 const wordSchema = mongoose.Schema(
    {
        word: {
            type: String,
            required: true,
        },
        synonyms: {
            type: [String], //synonyms as an array of strings
            required: true,
        }
    },
    {
        timestamps: true
    }
 );

export const Word = mongoose.model('Word', wordSchema);