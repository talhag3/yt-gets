### Installation

```sh
npm install yt-gets
```

### Usage

```sh

const ytgets = require('yt-gets');

ytgets.fetch('https://www.youtube.com/watch?v=gG3pytAY2MY').then((data)=>{
    console.log(data)
}).catch((err)=>{
    console.log(err)
})

```

### Result

```sh
{
    "videoId": "VideoID",
    "shortDescription": "shortDescription",
    "channelId": "UC7A0P8INcRIbhgFQ1v46Uyg",
    "length": "281",
    "averageRating": 4.9694118,
    "viewCount": "1516012",
    "author": "talhag3",
    "title": "Official Video",
    "keywords": ["Youtube"],
    "images": [{
        "url": "link",
        "width": 168,
        "height": 94
    }],
    "media": {
        "expiry": "21540",
        "video": [{
            "url": "link",
            "mimeType": "video/.....",
            "width": 640,
            "height": 360,
            "quality": "medium",
            "qualitylable": null,
            "audioQuality": "AUDIO_QUALITY_LOW"
        }],
        "audio": [{
            "url": "link",
            "mimeType": "audio/",
            "width": null,
            "height": null,
            "quality": "tiny",
            "qualitylable": null,
            "audioQuality": "AUDIO_QUALITY_MEDIUM"
        }]
    },
    "iframeURL": "https://www.youtube.com/embed/videoID",
    "description": "video description",
    "ownerProfileUrl": "http://www.youtube.com/user/USER",
    "category": "Music",
    "publishDate": "2021-02-17",
    "ownerChannelName": "NAME",
    "uploadDate": "2021-02-17"
}
```
