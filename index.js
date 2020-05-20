'use strict';
const Input = require('./lib/input');
const Note = require('./lib/notes');
const result = new Input;
// if (result.payload || result.deleteId || result.action === 'delete'){
//   new Note(result);
// }
new Note(result);

// console.log(result);
