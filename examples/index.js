var ytvid = require('../src/index')
console.log('ABC')
ytvid.fetch('https://www.abc.com/watch?v=fggffws8MSXN7A').then((data)=>{
    console.log(data)
}).catch((err)=>{
    console.log(err)
})

console.log('XYZ')