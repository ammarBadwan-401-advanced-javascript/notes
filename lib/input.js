'use strict';
const minimist = require('minimist');

function Input(){
  const args = minimist(process.argv.slice(2));
  this.payload;
  //   this.action = this.findAction(Object.keys(args)[1], args.add || args.a);
  this.action = this.actionType(args);
}

Input.prototype.actionType = function(args = '') {
  if (args.add || args.a ){
    this.argument = args.add || args.a;
    return 'add';
  } else {
    return 'Invalid action';
  }
};

// Input.prototype.findAction = function(theAction = '',passedArgument){
//   if (theAction === 'add' || theAction === 'a'){
//     if (passedArgument){
//       this.payload = passedArgument;
//       return 'add';
//     } else {console.error('No data after flag, Please enter data');}
//   }else {
//     console.error('Please provide a valid command');
//     return 'Invalid action';
//   }
// };

module.exports = Input;