
'use strict';
const debug = require('debug')('yt-gets');
const fs = require('fs');
const helper = require('./helpers/index');

/**
 * Name of this module
 */
const MODULE_NAME = 'yt-gets';

const ID= '?'

/**
 * Endpoint 
 */
const SERVICE_ENDPOINT = 'https://youtube.com/get_video_info?video_id=';

function validateURL(str) {
    const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return regex.test(str);
}


/**
 * get video info
 * 
 * @param {String} url video url or id in string
 * 
 * @return {Promise} video info 
 * 
 */
module.exports.fetch = async (url) => {
    let vId = validateURL(url) ? helper.urlParse(url.split('?')[1]).v : null || url  
    if(!vId) throw {
            message : 'provide valid id or url',
        }
 
    const res = await helper.request({ type:'get', url: SERVICE_ENDPOINT + vId })
    return helper.normalizeRes(res)
}
