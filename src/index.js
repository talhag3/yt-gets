
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
    ID = id
    var res = await helper.request({type:'get',url:SERVICE_ENDPOINT+id})
    var parsed = helper.qstoObj(res)
    parsed.fflags = helper.qstoObj(parsed.fflags)
    parsed.player_response = JSON.parse(parsed.player_response)
    
    var nomalized = {
        videoId : parsed.player_response.videoDetails.videoId,
        description : parsed.player_response.videoDetails.shortDescription,
        channelId : parsed.player_response.videoDetails.channelId,
        averageRating : parsed.player_response.videoDetails.averageRating,
        viewCount : parsed.player_response.videoDetails.viewCount,
        author : parsed.player_response.videoDetails.author,
        title : parsed.player_response.videoDetails.title,
        keywords : parsed.player_response.videoDetails.keywords,
        images : parsed.player_response.videoDetails.thumbnail.thumbnails,
    }
    console.log(nomalized)
    //fs.writeFileSync(Date.now()+'_ytres.json',JSON.stringify(parsed))
    return nomalized
}
module.exports = fetch;