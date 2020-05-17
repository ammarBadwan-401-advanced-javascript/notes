'use strict';
const minimist = require('minimist');

function Input(){
  const args = minimist(process.argv.slice(2));
  this.add = this.add(args.add);
}

Input.prototype.add = function(theAdd = ''){
  let validation = /add|a/i;
  return validation.test(theAdd) ? theAdd : 'This is wrong';
};

module.exports = Input;