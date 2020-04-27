const csv = require('csvtojson');
const fetch = require('node-fetch');
const moment = require('moment');
const _ = require('lodash');

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
    return new Promise((resolve) => {
        if (jsonArray.length > 1) {
            const reverse = _.reverse(jsonArray);
            let unique = _.uniqBy(reverse, "Date");
            unique = _.reverse(unique);
            resolve(unique);
        }
    });
}

async function formatRecords(jsonArray) {
    return jsonArray.map((value) => {
        return {
            Date: moment.unix(value.seconds_since_Epoch).format("MM/DD/YYYY"),
            Tested: value.tested,
            Cases: value.positive,
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
                    const sort = _.orderBy(records, (obj) => {
                        return new Date(obj.Date);
                    });
                    resolve(sort);
                });
            }));
    });
}

async function getAllRows(doc, sheetId) {
    const sheet = doc.sheetsById[sheetId];
    const rows = await sheet.getRows();
    const rowsFormat = rows.map((value) => {
        return {
            Date: moment(value.Date).format("MM/DD/YYYY"),
            Tested: value.Tested,
            Cases: value.Cases,
            Deaths: value.Deaths
        }
    });
    const orderRows = _.orderBy(rowsFormat, (obj) => {
        return new Date(obj.Date);
    })
    return orderRows;
}

const sleep = ms =>{
    return new Promise(resolve => setTimeout(resolve, ms)) 
}

async function insertMultiple(doc, state, sheetId) {
    const records = await this.getAllRecords(state);
    const filtered = await this.filterRecords(records);
    const sheetRows = await this.getAllRows(doc, sheetId);
    const diff = _.differenceWith(filtered, sheetRows, _.isEqual);
    const sheet = doc.sheetsById[sheetId];
    if (diff.length > 0) {
        for(var a = 0; a<=diff.length -1; a++){
            await sheet.addRow({
                "Date": moment(diff[a].Date).format("MM/DD/YYYY"),
                "Cases": diff[a].Cases,
                "Deaths": diff[a].Deaths,
                "Tested": diff[a].Tested
            });
            console.log(`${state} - Added Row`);
            await sleep(5000); 
        }
}
}


async function insertSingle(doc, state, sheetId) {
    let record = await getTodaysRecord(state);
    const sheet = doc.sheetsById[sheetId];
    return new Promise((resolve, reject) => {
        if (record != null) {
            sheet.addRow({
                "Date": moment().format('MM/DD/YYYY'),
                "Cases": record.Positive,
                "Deaths": record.Deaths,
                "Tested": record.Tested
            });
            resolve();
        }
        else {
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


