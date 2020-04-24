const { GoogleSpreadsheet } = require('google-spreadsheet');
const IN = require('./src/IN');
const US = require('./src/US');
const api = require('./src/Api'); 
const sheets = require('./src/sheets.json'); 

(async () => {
    const doc = new GoogleSpreadsheet('1Idoh2NG5IfyvWA8gMGLcpxfG9sUbeiEo6ltPUPVt4Gw');
    await doc.useServiceAccountAuth(require('./credentials.json'));
    await doc.loadInfo();

    await US.setStats(doc, 0); 
    await IN.setStats(doc, 953330401);
    
    sheets.forEach(sheet => {
        await api.setStats(doc, sheet.state, sheet.sheetId); 
    });  
})();