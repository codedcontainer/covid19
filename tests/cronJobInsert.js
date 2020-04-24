const loadInfo = require('../src/loadSpreadSheet').loadInfo(); 
const {getLastRow, getRowCount} = require('../src/Api'); 
const should = require('should'); 
const moment = require('moment'); 
 
 describe('A Google spreasheet insert by cron job', ()=>{
        it('should return more than one row', async()=>{
            const doc = await loadInfo(); 
            const rowCount = await getRowCount(doc,913962604); //IN
                rowCount.should.be.above(1, "There is more than one row");
        });
        it('the last row should return yesterday\'s date', async() =>{
            const doc = await loadInfo(); 
            const LastRow = await getLastRow(doc, 913962604); 
            const yesterday = moment().subtract(1, 'days').format("MM/DD/YYYY");
                LastRow.Date.should.equal(yesterday);
        });
    });