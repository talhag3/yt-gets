const ytvid = require('../src/index')
ytvid.fetch('https://www.youtube.com/watch?v=7UpNiTap4m8').then((data)=>{
    console.log(data)
}).catch((err)=>{
    console.log(err)
})