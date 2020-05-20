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
    this.note = obj.payload;
    this.addToDB(obj);
  }





  // Database Functions
  async addToDB(obj){
    if (obj.default){obj.category = 'default';}
    let savedNote = {
      text: obj.payload,
      category: obj.category,
    };
    let notes = new Notes(savedNote);
    await notes.save();
    console.log('note saved ' + notes.text);
    await mongoose.disconnect();
  }

  async listDB(obj){
    if (obj.listQuery){
      let list = await Notes.find({category: obj.listQuery});
      list[0] ? console.log('These are the results') : console.log('No notes found in this category');
      list.forEach((value)=>{
        console.log(value.text);
        console.log(`Category: ${value.category}     ID: ${value._id}`);
        console.log('--------------------------------------');
      });
      await mongoose.disconnect();

    } else {
      let list = await Notes.find({});
      list.forEach((value)=>{
        console.log(value.text);
        console.log(`Category: ${value.category}     ID: ${value._id}`);
        console.log('--------------------------------------');
      });
      await mongoose.disconnect();
    }
  }

  async deleteDB(obj){
    if (obj.deleteId){
      await Notes.findOneAndRemove({_id:obj.deleteId});
      console.log('Deleted Note ' + obj.deleteId);
      await mongoose.disconnect();
    } else {
      console.log('No ID was provided,please provide an ID');
      await mongoose.disconnect();
    }
  }

}

module.exports = Note;