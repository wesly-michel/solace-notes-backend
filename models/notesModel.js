const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  id: { 
    type: String,
    required: true,
    unique: true  
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, { collection: 'notes' });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
