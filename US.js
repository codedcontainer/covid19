const request = require('async-request'); 

async function toJson(string){
    return new Promise((resolve, reject)=>{
       if(string == null) return reject('type is not a string');
       return resolve(JSON.parse(string)); 
    });
}

async function getLastObject(obj){
    return new Promise((resolve, reject)=>{
        if(obj == null) return reject('Object is null');        
        return resolve(obj[obj.length-1].Cases); 
    });
}

async function getStats(){
    let confirmed = await request('https://api.covid19api.com/total/country/united-states/status/confirmed');       
    let json = await toJson(confirmed.body);     
    let totalPositiveCases = await getLastObject(json); 
    let deaths = await request('https://api.covid19api.com/total/country/united-states/status/deaths'); 
    let json2 = await toJson(deaths.body); 
    let totalDeaths = await getLastObject(json2); 

    return{
        'US':{
            totalPositiveCases,
            totalDeaths
        }       
    }; 
}

getStats()
    .then(stats => console.log(stats))
    .catch(err => console.log(err)); 
