const {getLastRow, getRowCount} = require('./Api'); 
const { GoogleSpreadsheet } = require('google-spreadsheet');
const should = require('should'); 
const moment = require('moment');  

async function loadInfo(){
    const doc = new GoogleSpreadsheet('1Idoh2NG5IfyvWA8gMGLcpxfG9sUbeiEo6ltPUPVt4Gw');
    await doc.useServiceAccountAuth(require('./credentials.json'));
    await doc.loadInfo();
    return doc;
}       

    describe('A Google spreasheet', ()=>{
        it('should return more than one row', async()=>{
            const doc = await loadInfo(); 
            const rowCount = await getRowCount(doc,913962604); 
                rowCount.should.be.above(1, "There is more than one row");
        });
        it('the last row should return yesterday\'s date', async() =>{
            const doc = await loadInfo(); 
            const LastRow = await getLastRow(doc, 913962604); 
            const yesterday = moment().subtract(1, 'days').format("MM/DD/YYYY");
                LastRow.Date.should.equal(yesterday);
        });
    });



