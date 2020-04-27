const IN = require('./src/IN');
const US = require('./src/US');
const api = require('./src/Api');
const sheets = require('./src/sheets.json');
const spreadsheet = require('./src/loadSpreadSheet');
const async = require('async');


(async () => {
    const doc = await spreadsheet.loadInfo(); 
    const limitSeconds = sheets.length * 1000; 
        //US.setStats(doc, 0); 
        //IN.setStats(doc, 953330401);

        for(var a = 0; a<=sheets.length -1; a++){
            await api.insertMultiple(doc, sheets[a].state, sheets[a].sheetId,limitSeconds); 
            console.log(sheets[a].state); 
        }  
  
})();