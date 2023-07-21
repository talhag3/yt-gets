const ytvid = require('../src/index')
const fs = require('fs')
const url = 'https://www.youtube.com/watch?v=8sVhzaeS55o&t=2s';
const url2 = 'https://www.youtube.com/watch?v=wsLvzQ7rWzg';
ytvid.fetch(url2).then((data)=>{
    // fs.writeFileSync('video_data.json',JSON.stringify(data));
    console.log(data)
}).catch((err)=>{
    console.log(err)
})