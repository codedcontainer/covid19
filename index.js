const IN = require('./src/IN');
const US = require('./src/US');
const api = require('./src/Api'); 
const sheets = require('./src/sheets.json'); 
const spreadsheet = require('./src/loadSpreadSheet'); 

(async () => {
   spreadsheet.loadInfo().then((doc)=>{
    // US.setStats(doc, 0); 
    // IN.setStats(doc, 953330401);

    for(const sheet of sheets){
        api.insertMultiple(doc, sheet.state, sheet.sheetId); 
    }

    }); 
})();