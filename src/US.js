const moment = require('moment');
const fetch = require('node-fetch');

async function getLastObject(obj)
{
    return new Promise((resolve, reject) =>
    {
        if (obj == null) return reject('Object is null');
        return resolve(obj[obj.length - 1].Cases);
    });
}

async function apiRequest(url, type){
    return fetch(url + type)
    .then(res=> res.json())
    .then(body => body).catch(err => 'Cannot fetch US data'); 
}

async function getStats()
{  
    const baseUrl = "https://api.covid19api.com/total/country/united-states/status/"; 
    let totalPositiveCases = await apiRequest(baseUrl, 'confirmed');
    totalPositiveCases = await getLastObject(totalPositiveCases);  
    console.log(totalPositiveCases);
    let totalDeaths = await apiRequest(baseUrl,'deaths');
    totalDeaths = await getLastObject(totalDeaths); 

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
