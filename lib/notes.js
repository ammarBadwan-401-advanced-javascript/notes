'use strict';

const NotesCollection = require('../models/notes-collection');
const notesCollection = new NotesCollection;

class Note{
  constructor(){

  }

  async execute(obj){
    if(obj.action === 'add'){
      this.note = obj.payload;
      await notesCollection.create(obj);
    } else if (obj.action === 'delete'){
      await notesCollection.delete(obj);
    } else if (obj.action === 'list'){
      await notesCollection.get(obj);
    } else if (obj.action === 'update'){
      await notesCollection.update(obj);
    }
  }
}

module.exports = Note;