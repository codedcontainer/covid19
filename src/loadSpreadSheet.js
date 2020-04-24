const { GoogleSpreadsheet } = require('google-spreadsheet');

async function loadInfo(){
    const doc = new GoogleSpreadsheet('1Idoh2NG5IfyvWA8gMGLcpxfG9sUbeiEo6ltPUPVt4Gw');
    await doc.useServiceAccountAuth(require('./credentials.json'));
    await doc.loadInfo();
    return doc;
}     
module.exports.loadInfo = loadInfo; 