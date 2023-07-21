const qs = require('query-string')
const { default: axios } = require('axios');
const HTMLParser = require('node-html-parser')

async function request(obj){
    return (await axios(obj)).data
}


//https://www.youtube.com/s/player/8e83803a/player_ias.vflset/en_US/base.js
const stringManipulation = {
    reverse: function(array) {
        array.reverse();
    },
    spliceStart: function(array, startIndex) {
        array.splice(0, startIndex);
    },
    swapElements: function(array, index) {
        const temp = array[0];
        array[0] = array[index % array.length];
        array[index % array.length] = temp;
    }
};

const manipulateString = function(inputString) {
    // Convert the input string to an array of characters
    const characters = inputString.split("");

    // Perform the manipulations using the defined functions
    stringManipulation.swapElements(characters, 42);
    stringManipulation.swapElements(characters, 14);
    stringManipulation.swapElements(characters, 54);
    stringManipulation.spliceStart(characters, 2);
    stringManipulation.reverse(characters);
    stringManipulation.swapElements(characters, 27);
    stringManipulation.spliceStart(characters, 3);

    // Convert the array of characters back to a string and return the result
    return characters.join("");
};

const decipher = myStr => {
    const args = qs.parse(myStr);
    const components = new URL(decodeURIComponent(args.url));
    const signature = decodeURIComponent(args.s);
    const signatureKey = args.sp ? args.sp : 'signature';
    const decipheredSignature = manipulateString(signature);
    components.searchParams.set(signatureKey, decipheredSignature);
    return components.toString();
};

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
        url:obj.url || decipher(obj.signatureCipher) || null,
        signatureCipher: obj.signatureCipher || null,
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
