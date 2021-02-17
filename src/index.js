
'use strict';
var debug = require('debug')('yt-gets');
var fs = require('fs');
var helper = require('./helpers/index');

/**
 * Name of this module
 */
var MODULE_NAME = 'yt-gets';

var ID= 'Wy9q22isx3U'

/**
 * Endpoint 
 */
var SERVICE_ENDPOINT = 'https://youtube.com/get_video_info?video_id=';

var ID = null

async function fetch(id) {
    ID = id || ID 
    const res = await helper.request({type:'get',url:SERVICE_ENDPOINT+ID})
    console.log(helper.normalizedData(res))
    return helper.normalizedData(res)
}
module.exports = fetch;