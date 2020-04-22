const request = require('async-request');
const moment = require('moment');

async function toJson(string)
{
    return new Promise((resolve, reject) =>
    {
        if (string == null) return reject('type is not a string');
        return resolve(JSON.parse(string));
    });
}

async function getLastObject(obj)
{
    return new Promise((resolve, reject) =>
    {
        if (obj == null) return reject('Object is null');
        return resolve(obj[obj.length - 1].Cases);
    });
}

async function getStats()
{
    let confirmed = await request('https://api.covid19api.com/total/country/united-states/status/confirmed');
    let json = await toJson(confirmed.body);
    let totalPositiveCases = await getLastObject(json);
    let deaths = await request('https://api.covid19api.com/total/country/united-states/status/deaths');
    let json2 = await toJson(deaths.body);
    let totalDeaths = await getLastObject(json2);

    return {
        'US': {
            totalPositiveCases,
            totalDeaths
        }
    };
}

async function setStats(doc, sheetId)
{
    let sheet = doc.sheetsById[sheetId];

    await getStats().then((stats) =>
    {
        sheet.addRow({
            "Date": moment().format('MM/DD/YYYY'),
            "Cases": stats.US.totalPositiveCases,
            "Deaths": stats.US.totalDeaths
        });
    });
}

module.exports.setStats = setStats; 
