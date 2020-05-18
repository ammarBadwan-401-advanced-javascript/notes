'use strict';

class Note{
  constructor(obj){
    this.execute(obj);
  }

  execute(obj){
    if(obj.action === 'add'){
      this.add(obj);
    } else {
      console.log('Sorry,please use a valid action');
    }
  }
  add(obj){
    console.log(`Adding Note: ${obj.payload}`);
    this.id = 1;
    this.note = obj.payload;
  }

}

module.exports = Note;