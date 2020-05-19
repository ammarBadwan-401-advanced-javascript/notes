'use strict';
const minimist = require('minimist');

class Input {
  constructor(){
    const args = minimist(process.argv.slice(2));
    this.action = this.actionType(args);
  }

  actionType(args = ''){
    if (args.add || args.a ){
      this.noteCheck(args);
      return 'add';
    } else {
      return 'Invalid action';
    }
  }

  noteCheck(args){
    if(typeof args.add === 'string' || typeof args.a === 'string'){
      this.payload = args.add || args.a;
      return this;
    } else {
      return 'No Note Added';
    }
  }
}
module.exports = Input;