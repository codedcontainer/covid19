const { GoogleSpreadsheet } = require('google-spreadsheet');
const IN = require('./IN');
const IL = require('./IL'); 
const US = require('./US');

(async () => {
    const doc = new GoogleSpreadsheet('1Idoh2NG5IfyvWA8gMGLcpxfG9sUbeiEo6ltPUPVt4Gw');
    await doc.useServiceAccountAuth(require('./credentials.json'));
    await doc.loadInfo();

    await US.setStats(doc, 0); 
    await IN.setStats(doc, 953330401); 
    await IL.setStats(doc, 913962604); 
})();