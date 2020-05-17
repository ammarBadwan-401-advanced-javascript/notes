'use strict';
function Note(obj) {
  this.execute(obj);
}

Note.prototype.execute = function(obj){
  if(obj.action === 'add'){
    this.add(obj);
  } else {
    console.log('Sorry,please use a valid action');
  }
};

Note.prototype.add = function(obj){ 
  console.log(`Adding Note: ${obj.payload}`);
  this.id = 1;
  this.note = obj.payload;
};

module.exports = Note;