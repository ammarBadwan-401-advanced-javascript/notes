'use strict';

const mongoose = require('mongoose');

const Notes = require('../models/notes-schema');
const MONGOOSE_URI = 'mongodb://localhost:27017/notes';

mongoose.connect(MONGOOSE_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
});


class Note{
  constructor(obj){
    this.execute(obj);
  }

  execute(obj){
    if(obj.action === 'add'){
      this.add(obj);
    }
  }

  add(obj){
    console.log(`Adding Note: ${obj.payload}`);
    this.note = obj.payload;
    this.addToDB(obj);
  }





  // Database Functions
  async addToDB(obj){
    let savedNote = {
      text: obj.payload,
      category: obj.category,
    };
    let notes = new Notes(savedNote);
    console.log(notes);
    await notes.save();
    let findNotes = await Notes.find({});
    console.log('THIS is THE saved NOTES >>>>>>>>' + findNotes);
    await mongoose.disconnect();
  }

}

module.exports = Note;