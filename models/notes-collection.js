'use strict';

const mongoose = require('mongoose');
const MONGOOSE_URI = 'mongodb://localhost:27017/notes';
const schema = require('./notes-schema');

mongoose.connect(MONGOOSE_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
});


class Note {
  
  constructor(){
    
  }

  async create(obj){
    if (obj.default){obj.category = 'default';}
    let savedNote = {
      text: obj.payload,
      category: obj.category,
    };
    let notes = new schema(savedNote);
    await notes.save();
    console.log('note saved ' + notes.text);
    await mongoose.disconnect();
  }

  
  async get(obj){
    if (obj.listQuery){
      let list = await schema.find({category: obj.listQuery});
      list[0] ? console.log('These are the results') : console.log('No notes found in this category');
      list.forEach((value)=>{
        console.log(value.text);
        console.log(`Category: ${value.category}     ID: ${value._id}`);
        console.log('--------------------------------------');
      });
      await mongoose.disconnect();

    } else {
      let list = await schema.find({});
      list.forEach((value)=>{
        console.log(value.text);
        console.log(`Category: ${value.category}     ID: ${value._id}`);
        console.log('--------------------------------------');
      });
      await mongoose.disconnect();
    }
  }

  async update(obj){
    if (obj.fail){
      console.log('Please provide more information');
      mongoose.disconnect();
    } else {
      let list = await schema.findByIdAndUpdate(obj.updateId,{text: obj.updateMessage},{new:true})
        .catch(err=>{
          console.log('Could not find the items ID');
          return null;
        });
      if (list === null){
        mongoose.disconnect();
      } else {
        console.log('This is the new updated note: '+ list.text);
        mongoose.disconnect();
      }
    }
  }

  async delete(obj){
    if (obj.deleteId){
      await schema.findOneAndRemove({_id:obj.deleteId});
      console.log('Deleted Note ' + obj.deleteId);
      await mongoose.disconnect();
    } else {
      console.log('No ID was provided,please provide an ID');
      await mongoose.disconnect();
    }
  }
}

module.exports = Note;