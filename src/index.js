
//'use strict';

var debug = require('debug')('yt-gets');
const { default: axios } = require('axios');
const qs = require('query-string')
var fs = require('fs')
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

var id = null

async function fetch(id) {
    id = id
    var res = await helper.request({type:'get',url:SERVICE_ENDPOINT+id})
    var parsed = helper.qstoObj(res)
    parsed.player_response = JSON.parse(parsed.player_response)
    fs.writeFileSync(Date.now()+'_ytres.json',JSON.stringify(parsed))
    console.log('done')
    
    
    return {parsed:'parsed'}
}
module.exports = fetch;