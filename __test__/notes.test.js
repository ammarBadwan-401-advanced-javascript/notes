'use strict';

const Notes = require('../lib/notes');

jest.spyOn(global.console,'log');
// {"payload":"hello","action":"add"}
describe('Note module', ()=>{
  it('Nothing is logged on console if there was no command',()=>{
    new Notes({'action':'none'});
    expect(console.log).not.toHaveBeenCalled();
  });

  it('There is a logged message on the console if the action and data were right',()=>{
    new Notes({'payload':'hello','action':'add'});
    expect(console.log).toHaveBeenCalled();
  });
});
