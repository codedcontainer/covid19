const csv = require('csvtojson'); 
const fetch = require('node-fetch'); 
const moment = require('moment');

async function setStats(doc, state, sheetId)
{
    let sheet = doc.sheetsById[sheetId];

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

module.exports.setStats = setStats; 


