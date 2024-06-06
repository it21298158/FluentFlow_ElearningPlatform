import express from "express";
import Vocab from "../models/vocab.model.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { vocabulary, definition, synonym, antonym } = req.body;
    const newVocab = new Vocab({
      vocabulary,
      definition,
      synonym,
      antonym,
    });
    await newVocab.save();
    res.json({ message: "Vocabulary Added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const vocabs = await Vocab.find();
    res.json(vocabs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const vocabId = req.params.id;
    const { vocabulary, definition, synonym, antonym } = req.body;

    const updatevocab = {
      vocabulary,
      definition,
      synonym,
      antonym,
    };

    const update = await Vocab.findByIdAndUpdate(vocabId, updatevocab);
    res.status(200).json({ status: "Vocab updated", vocab: update });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Error with updating data" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const vocabId = req.params.id;
    await Vocab.findByIdAndDelete(vocabId);
    res.status(200).json({ status: "Vocab deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Error with deleting vocab" });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const vocabId = req.params.id;
    const vocab = await Vocab.findById(vocabId);
    res.status(200).json({ status: "Vocab fetched", vocab: vocab });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Error with fetching vocab" });
  }
});

export default router;
