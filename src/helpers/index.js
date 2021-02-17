const qs = require('query-string')
const { default: axios } = require('axios');

function __req(obj){
    return axios(obj).then((res)=>{
        return res.data
    })
}

function __responseParser(res){
    let parsed = qs.parse(res)
    if (parsed.status === 'fail'){
        throw {
            'status' : 404,
            'msg' : 'provide valid id or url',
        }
    }
    parsed.player_response = JSON.parse(parsed.player_response)
    return parsed
}

function __normalizedData(res){
    let parsed = __responseParser(res)
    let data = {
        videoId : parsed.player_response.videoDetails.videoId || null ,
        shortDescription : parsed.player_response.videoDetails.shortDescription || null,
        channelId : parsed.player_response.videoDetails.channelId || null,
        length: parsed.player_response.videoDetails.lengthSeconds || null,
        averageRating : parsed.player_response.videoDetails.averageRating || null,
        viewCount : parsed.player_response.videoDetails.viewCount || null,
        author : parsed.player_response.videoDetails.author || null,
        title : parsed.player_response.videoDetails.title || null,
        keywords : parsed.player_response.videoDetails.keywords || null,
        images : parsed.player_response.videoDetails.thumbnail.thumbnails || null,
        media : {
            expiry : parsed.player_response.streamingData.expiresInSeconds || null,
            medias : [parsed.player_response.streamingData.formats || null,
                parsed.player_response.streamingData.adaptiveFormats || null],
        },
        iframeURL :  parsed.player_response.microformat.playerMicroformatRenderer.embed.iframeUrl || null,
        description : parsed.player_response.microformat.playerMicroformatRenderer.description.simpleText || null,
        ownerProfileUrl : parsed.player_response.microformat.playerMicroformatRenderer.ownerProfileUrl || null,
        viewCount: parsed.player_response.microformat.playerMicroformatRenderer.viewCount || null,
        category : parsed.player_response.microformat.playerMicroformatRenderer.category || null,
        publishDate : parsed.player_response.microformat.playerMicroformatRenderer.publishDate || null,
        ownerChannelName : parsed.player_response.microformat.playerMicroformatRenderer.ownerChannelName || null,
        uploadDate : parsed.player_response.microformat.playerMicroformatRenderer.uploadDate || null, 
    }
    return data
}

/**
 * Module Helper
 */
module.exports = {
    /**
     * @return {Promise} 
     */
    request: async function(obj){
        let data = {}
        data = await __req(obj)
        return data
    },
    normalizedData: __normalizedData,
    urlParse: (url) => qs.parse(url)
}