'use strict';

const mongoose = require('mongoose');

const Notes = require('../models/notes-schema');
const MONGOOSE_URI = 'mongodb://localhost:27017/notes';

mongoose.connect(MONGOOSE_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
});


class Note{
  constructor(obj){
    this.execute(obj);
  }

  execute(obj){
    if(obj.action === 'add'){
      this.add(obj);
    } else if (obj.action === 'delete'){
      this.deleteDB(obj);
    } else if (obj.action === 'list'){
      this.listDB(obj);
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
    await mongoose.disconnect();
  }

  async listDB(obj){
    if (obj.listQuery){
      let list = await Notes.find({category: obj.listQuery});
      console.log('this is the list'+list);

    } else {
      let list = await Notes.find({});
      console.log('this is the list'+list);
    }
  }

  async deleteDB(obj){
    if (obj.deleteId){
      await Notes.findOneAndRemove({_id:obj.deleteId});
      console.log('deletion!');
    } else {
      console.log('No ID was provided,please provide an ID');
    }
  }

}

module.exports = Note;