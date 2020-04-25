const csv = require('csvtojson');
const fetch = require('node-fetch');
const moment = require('moment');
const _ = require('lodash');
const async = require('async'); 

async function getRows(doc, sheetId) {
    const sheet = doc.sheetsById[sheetId];
    const rows = await sheet.getRows();
    return rows;
}

async function getRowCount(doc, sheetId) {
    const rows = await getRows(doc, sheetId);
    return rows.length + 1;
}

async function getLastRow(doc, sheetId) {
    const rows = await getRows(doc, sheetId);
    return getRowCount(doc, sheetId).then(rowcount => {
        return rows[rowcount - 2]
    });
}

async function filterTodaysRecord(jsonObj) {
    return new Promise((resolve, reject) => {
        const jsonFilter = jsonObj.filter((value, index, array) => {
            const dateFormat = moment.unix(value.seconds_since_Epoch).format('MM/DD/YYYY');
            const today = moment().format('MM/DD/YYYY');
            if (dateFormat === today) {
                delete array[index].seconds_since_Epoch;
                return array;
            }
        });

        const result = jsonFilter.length > 1 ?
            jsonFilter[jsonFilter.length - 1] :
            jsonFilter[0];

        if (jsonFilter.length > 0) resolve(result);
        else reject("No records match today's date")
    });
}

async function getTodaysRecord(state) {
    return new Promise((resolve, reject) => {
        fetch('http://coronavirusapi.com/getTimeSeries/' + state)
            .then(res => res.text())
            .then(body => csvToJson(body).then((json) => {
                filterTodaysRecord(json).then((record) => {
                    resolve(record);
                }).catch((err) => { reject(err) });
            }));
    });
}

async function filterRecords(jsonArray) {
    return new Promise((resolve, reject) => {
        if (jsonArray.length > 1) {
            const reverse = _.reverse(jsonArray);
            let unique = _.uniqBy(reverse, "Date");
            unique = _.reverse(unique);
            resolve(unique);
        }
        else {
            reject("There are no records to filter");
        }
    });
}


async function formatRecords(jsonArray) {
    return jsonArray.map((value) => {
        return {
            Date: moment.unix(value.seconds_since_Epoch).format("MM/DD/YYYY"),
            Tested: value.tested,
            Positive: value.positive,
            Deaths: value.deaths
        }
    });
}


async function getAllRecords(state) {
    return new Promise((resolve, reject) => {
        fetch('http://coronavirusapi.com/getTimeSeries/' + state)
            .then(res => res.text())
            .then(body => csvToJson(body).then((json) => {
                formatRecords(json).then((records) => {
                    resolve(records);
                });
            }));
    });
}
function timeout(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve, ms); 
    }); 
}

async function getAllRows(doc, sheetId) {
    const sheet = doc.sheetsById[sheetId];
    const rows = await sheet.getRows();

    return rows.map((value) => {
        return {
            Date: value.Date,
            Tested: value.Tested,
            Cases: value.Cases,
            Deaths: value.Deaths
        }
    });
}

async function insertMultiple(doc, state, sheetId) {
    const records = await this.getAllRecords(state);
    const filtered = await this.filterRecords(records);
    const sheetRows = await this.getAllRows(doc, sheetId);
    const diff = _.differenceBy(filtered, sheetRows, "Date");
    const sheet = doc.sheetsById[sheetId];
    return new Promise((resolve, reject)=>{
        if(diff.length > 0){
                var i = 0; 
                function myLoop(){
                    setTimeout(() => {
                            sheet.addRow({
                                "Date": diff[i].Date,
                                "Cases": diff[i].Positive,
                                "Deaths": diff[i].Deaths,
                                "Tested": diff[i].Tested
                            });
                        i++; 
                        if(i <= diff.length-1) myLoop(); 
                    }, 30000);
                }
                myLoop();  
                resolve(); 
        }
        else{
            reject('No records to insert'); 
        }
    });
}


async function insertSingle(doc, state, sheetId) {
    let record = await getTodaysRecord(state);
    const sheet = doc.sheetsById[sheetId];
    return new Promise((resolve,reject)=>{
        if (record != null) {
            sheet.addRow({
                "Date": moment().format('MM/DD/YYYY'),
                "Cases": record.Positive,
                "Deaths": record.Deaths,
                "Tested": record.Tested
            });
            resolve(); 
        }
        else{
            reject("No record to insert");
        }
    });
    
}

async function csvToJson(text) {
    return csv().fromString(text).then((jsonObj) => {
        return jsonObj;
    });
}

module.exports = {
    insertSingle,
    insertMultiple,
    getLastRow,
    getRowCount,
    getTodaysRecord,
    getAllRecords,
    filterRecords,
    getAllRows
}


