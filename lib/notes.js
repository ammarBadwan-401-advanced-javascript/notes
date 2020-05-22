'use strict';

const NotesCollection = require('../models/notes-collection');
const notesCollection = new NotesCollection;

class Note{
  constructor(obj){
    this.execute(obj);
  }

  execute(obj){
    if(obj.action === 'add'){
      this.note = obj.payload;
      notesCollection.create(obj);
    } else if (obj.action === 'delete'){
      notesCollection.delete(obj);
    } else if (obj.action === 'list'){
      notesCollection.get(obj);
    } else if (obj.action === 'update'){
      notesCollection.update(obj);
    }
  }
}

module.exports = Note;