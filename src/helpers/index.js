const qs = require('query-string')
const { default: axios } = require('axios');

var req_ = function(obj){
    return axios(obj).then((res)=>{
        return res.data
    })
}

/**
 * Module Helper
 */
module.exports = {
    /**
     * @returns {Promise} 
     */
    request: async function(obj){
        let data = {}
        data = await req_(obj)
        return data
    },
    qstoObj:qs.parse
}