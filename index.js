const osname = require('os-name');
const crypto = require('crypto')
const request = require('request');

var URL = 'https://pastebin.com/raw/wh5eTW8Z';

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

async function Data() {
    try {
    var os_name = osname();
    console.log(`
    PROCESSOR_IDENTIFIER > ${process.env.PROCESSOR_IDENTIFIER}
    \nNUMBER_OF_PROCESSORS ${process.env.NUMBER_OF_PROCESSORS}
    \nPROCESSOR_LEVEL > ${process.env.PROCESSOR_LEVEL}
    \nPROCESSOR_REVISION > ${process.env.PROCESSOR_REVISION}
    \nCOMPUTERNAME > ${process.env.COMPUTERNAME}
    \n[property] user.name > ${process.env.USERNAME}
    \n[property] os.name > ${os_name}
    \n[property] user.home > ${process.env.USERPROFILE}
    \n[property] java.home > ${process.env.JAVA_HOME}
    `);
    
    var hw = (process.env.PROCESSOR_IDENTIFIER + process.env.NUMBER_OF_PROCESSORS + process.env.PROCESSOR_LEVEL + process.env.PROCESSOR_REVISION + process.env.COMPUTERNAME + os_name + process.env.USERPROFILE + process.env.JAVA_HOME);
    console.log(hw);
    
    var getSHA256ofJSON = function(input){
        return crypto.createHash('sha256').update(JSON.stringify(input)).digest('hex');
    }
    hwid = getSHA256ofJSON(hw);
    console.log(hwid);
    }
    catch (e) {
        console.log(e);
    }
}

function Verify() {
    Data();
    var hwids = request(URL, function(err, res, body) {
        if (err) throw err;
        console.log(body);
        if(!body.includes(hwid)){
            console.log(`INCORRECT HWID!`);
            throw new Error('INCORRECT HWID!')
        } else {
            console.log(`PASSED!`);
        }
        return body;
    });
}
Verify();