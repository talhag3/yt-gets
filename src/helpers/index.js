const qs = require('query-string')
const { default: axios } = require('axios');
const HTMLParser = require('node-html-parser')

async function request(obj){
    return (await axios(obj)).data
}

function parseResponse(res){
    let root = HTMLParser.parse(res)
    let scripts = root.querySelectorAll('script')
    let yt_data = scripts.filter( s => s.innerText.includes('var ytInitialPlayerResponse'))[0]
    yt_data = yt_data.innerText.replace('var ytInitialPlayerResponse = ','').slice(0, -1)
    yt_data = JSON.parse(yt_data)
    
    return yt_data
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
        videoId : parsed.videoDetails.videoId || null ,
        shortDescription : parsed.videoDetails.shortDescription || null,
        channelId : parsed.videoDetails.channelId || null,
        length: parsed.videoDetails.lengthSeconds || null,
        averageRating : parsed.videoDetails.averageRating || null,
        viewCount : parsed.videoDetails.viewCount || null,
        author : parsed.videoDetails.author || null,
        title : parsed.videoDetails.title || null,
        keywords : parsed.videoDetails.keywords || null,
        images : parsed.videoDetails.thumbnail.thumbnails || null,
        media : {
            expiry : parsed.streamingData.expiresInSeconds || null,
            video : normaileMedia([...parsed.streamingData.formats, ...parsed.streamingData.adaptiveFormats]),
            audio : normaileMedia(parsed.streamingData.adaptiveFormats,'a')
        },
        iframeURL :  parsed.microformat.playerMicroformatRenderer.embed.iframeUrl || null,
        description : parsed.microformat.playerMicroformatRenderer.description.simpleText || null,
        ownerProfileUrl : parsed.microformat.playerMicroformatRenderer.ownerProfileUrl || null,
        viewCount: parsed.microformat.playerMicroformatRenderer.viewCount || null,
        category : parsed.microformat.playerMicroformatRenderer.category || null,
        publishDate : parsed.microformat.playerMicroformatRenderer.publishDate || null,
        ownerChannelName : parsed.microformat.playerMicroformatRenderer.ownerChannelName || null,
        uploadDate : parsed.microformat.playerMicroformatRenderer.uploadDate || null, 
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
