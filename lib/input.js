'use strict';
const minimist = require('minimist');

function Input(){
  const args = minimist(process.argv.slice(2));
  this.action = this.actionType(args);
}

Input.prototype.actionType = function(args = '') {
  if (args.add || args.a ){
    this.payload = args.add || args.a;
    return 'add';
  } else {
    console.log('Sorry, Flag was not accepted');
    return 'Invalid action';
  }
};
module.exports = Input;