'use strict';

const mongoose = require('mongoose');
const MONGOOSE_URI = 'mongodb://localhost:27017/notes';
const Input = require('./lib/input');
const Note = require('./lib/notes');


mongoose.connect(MONGOOSE_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
});
  
const result = new Input;

async function start() {
  let noteAddition = new Note();
  await noteAddition.execute(result);
  mongoose.disconnect();
}

start();