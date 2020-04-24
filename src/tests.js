const {getLastRow, getRowCount} = require('./Api'); 
const { GoogleSpreadsheet } = require('google-spreadsheet');
const assert = require('assert');
const should = require('should');  

// getDoc().then((doc)=>{
//     console.log(doc); 
// }); 

// async function getDoc(){
//     const doc = new GoogleSpreadsheet('1Idoh2NG5IfyvWA8gMGLcpxfG9sUbeiEo6ltPUPVt4Gw');
//     await doc.useServiceAccountAuth(require('./credentials.json'));
//     await doc.loadInfo();
    
//     return doc;
// }       

    describe('A Google spreasheet', ()=>{
        it('should return more than one row', async ()=>{
            const doc = new GoogleSpreadsheet('1Idoh2NG5IfyvWA8gMGLcpxfG9sUbeiEo6ltPUPVt4Gw');
            await doc.useServiceAccountAuth(require('./credentials.json')); 
            await doc.loadInfo();
            const rowCount = await getRowCount(doc,913962604); 
                rowCount.should.be.above(1, "There is more than one row");
        });
      
    });



