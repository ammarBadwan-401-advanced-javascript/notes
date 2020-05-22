'use strict';

require('@code-fellows/supergoose');

const NotesCollection = require('../models/notes-collection');

const notes = new NotesCollection;

describe('Notes Collection File Test',()=>{
  it('This will test the create() (add) function of the mongoose CRUD',()=>{
    let testObject = {action: 'add', payload: 'just a test', category: 'testing'};
    let optimal = {text: 'just a test',category: 'testing'};
    return notes.create(testObject)
      .then(record =>{
        Object.keys(optimal).forEach(key =>{
          expect(record[key]).toEqual(optimal[key]);
        });
      });
  });
});


