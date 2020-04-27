const IN = require('./src/IN');
const US = require('./src/US');
const api = require('./src/Api');
const sheets = require('./src/sheets.json');
const spreadsheet = require('./src/loadSpreadSheet');
const async = require('async');

(async () => {
    spreadsheet.loadInfo().then((doc) => {
        //US.setStats(doc, 0); 
        //IN.setStats(doc, 953330401);

        var i = 0;
        function myLoop() {
            setTimeout(() => {
                api.insertMultiple(doc, sheets[i].state, sheets[i].sheetId).then(()=>{
                    console.log(sheets[i].state); 
                    i++
                    if (i <= sheets.length -1) myLoop();
                }); 
               
            }, 10000);
        }
        myLoop();
    });
})();