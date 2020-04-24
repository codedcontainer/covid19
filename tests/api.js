const api = require('../src/Api'); 
const should = require('should');

describe('Request the current days statistics', ()=>{
    it('should return a result that matches today\'s date', async()=>{
        const todaysRecord = await api.getTodaysRecord("NY");
        should.exist(todaysRecord, "No records match");
    }); 
});