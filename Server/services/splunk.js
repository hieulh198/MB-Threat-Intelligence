
const axios = require('axios');
const config = require('../config');
const https = require('https');

const agent = new https.Agent({
    rejectUnauthorized: false
});

function createService() {
    return {
        baseURL: `https://${config.splunk_host}:${config.splunk_port}`,
        auth: {
            username: config.splunk_user,
            password: config.splunk_password,
        },
    };
}


function getKVStore(service, collectionName) {
    return axios.get(`${service.baseURL}/servicesNS/nobody/system/storage/collections/data/${collectionName}`, {
        baseURL: service.baseURL,
        auth: service.auth,
        httpsAgent: agent
    });
}

// function searchKVStore(service, collectionName, keyID) {
//     return axios.get(`${service.baseURL}/servicesNS/nobody/system/storage/collections/data/${collectionName}/${keyID}`, {
//         baseURL: service.baseURL,
//         auth: service.auth,
//         httpsAgent: agent
//     });
// }

module.exports = {
    createService,
    getKVStore,
    // searchKVStore
}