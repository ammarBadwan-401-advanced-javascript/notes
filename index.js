'use strict';
const Input = require('./lib/input');
const Note = require('./lib/notes');
const result = new Input;
console.log(result);
if (result.payload){
  new Note(result);
}
