'use strict';

const Input = require('../lib/input');

describe('Input Module',()=>{
  it('Checking actionType() method if the entered flag was wrong',()=>{
    let inputTest = new Input();
    expect(inputTest.actionType({'y':'note'})).toEqual('Invalid action');
  });

  it('Checking noteCheck() method if the entered flag was right but no value was passed',()=>{
    let inputTest = new Input();
    expect(inputTest.noteCheck({'add': undefined})).toEqual('No Note Added');
  });

  it('Checking actionType() method if the entered flag was right',()=>{
    let inputTest = new Input();
    expect(inputTest.actionType({'add':'note'})).toEqual('add');
  });

  it('Checking noteCheck() method if the entered flag was right and there was a note',()=>{
    let inputTest = new Input();
    inputTest.action = 'add';
    expect(inputTest.noteCheck({'add':'note'})).toEqual({'action':'add','payload':'note'});
  });
});