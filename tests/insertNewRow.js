const {getLastRow} = require('../src/Api'); 
const moment = require('moment'); 
const api = require('../src/Api');  
const spreadsheet = require('../src/loadSpreadSheet');

    describe('Inserting row to Google Spreadsheet', ()=>{
        before(async()=>{
            const doc = await spreadsheet.loadInfo(); 
            await api.setStats(doc, "FL", 1861459331);
        });
        it('the last row should return todays date', async()=>{
            const doc = await spreadsheet.loadInfo(); 
            const LastRow = await getLastRow(doc, 1861459331); 
            const today = moment().format("MM/DD/YYYY");
                LastRow.Date.should.be.equal(today);
        }); 
    });