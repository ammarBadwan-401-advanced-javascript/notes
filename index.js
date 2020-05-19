'use strict';
const Input = require('./lib/input');
const Note = require('./lib/notes');
const result = new Input;
if (result.payload){
  new Note(result);
}

console.log(result);
