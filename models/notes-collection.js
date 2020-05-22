'use strict';

const schema = require('./notes-schema');

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
    let saving = await notes.save();
    console.log('note saved ' + notes.text);
    return saving;
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
      return list;

    } else {
      let list = await schema.find({});
      list.forEach((value)=>{
        console.log(value.text);
        console.log(`Category: ${value.category}     ID: ${value._id}`);
        console.log('--------------------------------------');
      });
      return list;
    }
  }

  async update(obj){
    if (obj.fail){
      console.log('Please provide more information');
      return 'None';
    } else {
      let list = await schema.findByIdAndUpdate(obj.updateId,{text: obj.updateMessage},{new:true})
        .catch(err=>{
          console.log('Could not find the items ID');
          return null;
        });
      if (list === null){
        return list;
      } else {
        console.log('This is the new updated note: '+ list.text);
        return list;
      }
    }
  }

  async delete(obj){
    if (obj.deleteId){
      let list = await schema.findOneAndRemove({_id:obj.deleteId});
      console.log('Deleted Note ' + obj.deleteId);
      return list;
    } else {
      console.log('No ID was provided,please provide an ID');
      return null;
    }
  }
}

module.exports = Note;