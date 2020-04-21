const { GoogleSpreadsheet } = require('google-spreadsheet');
const moment = require('moment');
const indiana = require('./IN');
const unitedStates = require('./US');

(async () => {
    const doc = new GoogleSpreadsheet('1Idoh2NG5IfyvWA8gMGLcpxfG9sUbeiEo6ltPUPVt4Gw');
    await doc.useServiceAccountAuth(require('./credentials.json'));
    await doc.loadInfo();
    //let sheet = doc.sheetsById[0];

    // unitedStates.getStats().then((stats) => {
    //     sheet.addRow(
    //         {
    //             Date: moment().format('MM/DD/YYYY'),
    //             Cases: stats.US.totalPositiveCases,
    //             Deaths: stats.US.totalDeaths
    //         });
    // });

    let sheet2 = doc.sheetsById[953330401];
    indiana.getStats().then((stats) => {
        sheet2.addRow(
            {
                Date: moment().format('MM/DD/YYYY'),
                Cases: stats.IN.totalPositiveCases,
                Deaths: stats.IN.totalDeaths
            });
    });
})();


