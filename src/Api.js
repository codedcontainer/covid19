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
    return getRowCount(doc,sheetId).then(rowcount => {
       return rows[rowcount-2]
    });
}

async function filterTodaysRecord(jsonObj){
    return new Promise((resolve,reject)=>{
        const jsonFilter = jsonObj.filter((value, index, array)=>{
            const dateFormat = moment.unix(value.seconds_since_Epoch).format('MM/DD/YYYY'); 
            const today = moment().format('MM/DD/YYYY'); 
            if(dateFormat === today){
                delete array[index].seconds_since_Epoch; 
                return array;  
            }            
        });

        const result = jsonFilter.length > 1 ?
            jsonFilter[jsonFilter.length -1] :
            jsonFilter[0]; 
        
        if(jsonFilter.length > 0) resolve(result); 
        else reject("No records match today's date")
    }); 
}

async function getTodaysRecord(state){
    return new Promise((resolve, reject)=>{
        fetch('http://coronavirusapi.com/getTimeSeries/'+state)
            .then(res => res.text())
            .then(body=> csvToJson(body).then((json) =>{
             filterTodaysRecord(json).then((record)=>{
                resolve(record);
            }).catch((err)=> {reject(err)});
        }));
    }); 
    
}

async function setStats(doc, state, sheetId)
{
    let record = await getTodaysRecord(state); 
    const sheet = doc.sheetsById[sheetId]; 
        if(record != null){  
        sheet.addRow({
            "Date": moment().format('MM/DD/YYYY'),
            "Cases": record.positive,
            "Deaths": record.deaths,
            "Tested": record.tested
        }); 
    } 
}

async function csvToJson(text){
    return csv().fromString(text).then((jsonObj)=>{
       return jsonObj; 
    });
}

module.exports ={
    setStats, 
    getLastRow,
    getRowCount, 
    getTodaysRecord
}


