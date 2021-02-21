const qs = require('query-string')
const { default: axios } = require('axios');

async function request(obj){
    return (await axios(obj)).data
}

function parseResponse(res){
    let parsed = qs.parse(res)
    if (parsed.status === 'fail') throw {
            message: 'provide valid id or url',
    }
    parsed.player_response = JSON.parse(parsed.player_response)
    return parsed
}

function prepareMeidaObj(obj) {
    return {
        url:obj.url || null,
        mimeType:obj.mimeType || null,
        width:obj.width || null,
        height:obj.height || null,
        quality:obj.quality || null,
        qualitylable:obj.qualitylbl || null,
        audioQuality:obj.audioQuality || null
    }
}

function normaileMedia(data,type = 'v') {
    let noraml = []
    data.filter(el => {
        if(el.mimeType.includes('audio/') && type === 'a' ){
            noraml.push(prepareMeidaObj(el))
        }else if(el.mimeType.includes('video/') && type === 'v' ){
            noraml.push(prepareMeidaObj(el))
        }
    })
    return noraml
}

function normalizeRes(res){
    let parsed = parseResponse(res)
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
            video : normaileMedia([...parsed.player_response.streamingData.formats, ...parsed.player_response.streamingData.adaptiveFormats]),
            audio : normaileMedia(parsed.player_response.streamingData.adaptiveFormats,'a')
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
    request: async (obj) => {
        let data = {}
        data = await request(obj)
        return data
    },
    normalizeRes: normalizeRes,
    urlParse: (url) => qs.parse(url)
}
