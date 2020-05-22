'use strict';
const minimist = require('minimist');

class Input {
  constructor(){
    const args = minimist(process.argv.slice(2));
    this.action = this.actionType(args);
  }

  actionType(args = ''){
    if (args.add || args.a ){
      if (args.category){
        this.addCheck(args);
        return 'add';
      } else {
        this.default = true;
        console.log('No Category Specified, switched to default category called "default" ');
        this.addCheck(args);
        return 'add';
      }

    } else if(args.delete){
      this.deleteCheck(args);
      return 'delete';
    } else if(args.list){
      this.listCheck(args);
      return 'list';
    } else if(args.update){
      this.updateCheck(args);
      return 'update';
    } else {
      console.log('Invalid action');
      return 'Invalid action';
    }
  }

  addCheck(args){
    if(typeof args.add === 'string' || typeof args.a === 'string'){
      this.payload = args.add || args.a;
      this.category = args.category;
      return this;
    } else {
      console.log('No Note Added');
      return 'No Note Added';
    }
  }

  deleteCheck(args){
    if(typeof args.delete === 'string'){
      this.deleteId = args.delete;
    } else {
      return 'No ID was provided for deletion';
    }
  }

  listCheck(args){
    if (typeof args.list === 'string'){
      this.listQuery = args.list;
    }
  }

  updateCheck(args){
    if (typeof args.update === 'string'){
      if(args.id && typeof args.id === 'string'){
        this.updateId = args.id;
        this.updateMessage = args.update;
      } else {
        this.fail = true;
        return 'No ID was provided';
      }
    } else {
      this.fail = true;
      return 'No message was provided for Update';
    }
  }


}
module.exports = Input;