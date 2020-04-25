const state = require('../src/Api'); 
const _ = require('lodash'); 
const should = require('should'); 
const spreadsheet = require('../src/loadSpreadSheet'); 

describe('Add list of past records', ()=>{
    it('filter list of duplicate records by latest date', async()=>{
        const records = await state.getAllRecords("FL"); 
        const filtered = await state.filterRecords(records); 
        filtered.should.not.be.empty(); 
    }); 
  
    it('loop through each filted list and insert', async()=>{
        const doc = await spreadsheet.loadInfo(); 
        await state.insertMultiple(doc, "AR", 163775774);  
    });

});