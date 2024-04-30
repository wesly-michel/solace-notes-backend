import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Note from './models/notesModel.js';
import cors from 'cors'
import { config } from 'dotenv';


config();

const app = express();
app.use(cors());
 

const port = 3000; 

app.use(bodyParser.json()); 

// Connect to MongoDB Atlas
const connectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/notesapp";



mongoose.connect(connectionString, {})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/notes', async (req, res) => {
    try {
      const note = new Note(req.body);
      const savedNote = await note.save();
      res.status(201).json(savedNote); 
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  app.delete('/api/notes/:id', async (req, res) => {
    try {
      const deletedNote = await Note.findOneAndDelete({ id: req.params.id });
  
      if (!deletedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
  
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.put('/api/notes/:id', async (req, res) => {
    try {
      const updatedNote = await Note.findOneAndUpdate(
        { id: req.params.id },
        { $set: { title: req.body.title, body: req.body.body } },
        { new: true }
      );
    
      if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
    
      res.json(updatedNote);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });