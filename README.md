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