const csv = require('csvtojson'); 
const fetch = require('node-fetch'); 
const moment = require('moment');


async function getRows(doc, sheetId){
    const sheet = doc.sheetsById[sheetId]; 
    const rows = await sheet.getRows(); 
    return rows; 
}

async function getRowCount(doc, sheetId){
    const rows = await getRows(doc,sheetId); 
    return rows.length + 1; 
}

async function getLastRow(doc, sheetId){
    const rows = await getRows(doc,sheetId); 
    const rowCount = await getRowCount(doc,sheetId);
    return rows[rowCount - 2];
}

async function setStats(doc, state, sheetId)
{
    let sheet = doc.sheetsById[sheetId];
    console.log('setStat')
    fetch('http://coronavirusapi.com/getTimeSeries/'+state)
    .then(res => res.text())
    .then(body=> csvToJson(body).then((json) =>{
        const jsonToday = today(json);
        if(jsonToday != null){  
        sheet.addRow({
            "Date": moment().format('MM/DD/YYYY'),
            "Cases": jsonToday.positive,
            "Deaths": jsonToday.deaths,
            "Tested": jsonToday.tested
        }); 
    }      
    }));
}

function today(jsonObj){
    const jsonFilter = jsonObj.filter((value, index, array)=>{
        const dateFormat = moment.unix(value.seconds_since_Epoch).format('MM/DD/YYYY'); 
        const today = moment().format('MM/DD/YYYY'); 
        if(dateFormat === today){
            delete array[index].seconds_since_Epoch; 
            return array;  
        }            
    });

    if(jsonFilter.length > 1) return jsonFilter[jsonFilter.length-1]; 
    return jsonFilter[0]; 
}


async function csvToJson(text){
    return csv().fromString(text).then((jsonObj)=>{
       return jsonObj; 
    });
}


module.exports ={
    setStats, 
    getLastRow,
    getRowCount
}


