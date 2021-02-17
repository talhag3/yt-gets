
'use strict';
var debug = require('debug')('yt-gets');
var fs = require('fs');
var helper = require('./helpers/index');

/**
 * Name of this module
 */
var MODULE_NAME = 'yt-gets';

var ID= ''

/**
 * Endpoint 
 */
var SERVICE_ENDPOINT = 'https://youtube.com/get_video_info?video_id=';

var ID = null

function __validURL(str) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(str)) {
        return false;
    } else {
        return true;
    }
}


/**
 * get video info
 * 
 * @param {String} url video url or id in string
 * 
 * @return {Promise} video info 
 * 
 */
async function fetch(url) {
    ID = __validURL(url) ? helper.urlParse(url.split('?')[1]).v : null || url  
    if(!ID){
        throw {
            'status' : 404,
            'msg' : 'provide valid id or url',
        }
    }
    const res = await helper.request({type:'get',url:SERVICE_ENDPOINT+ID})
    return helper.normalizedData(res)
}
module.exports.fetch = fetch;