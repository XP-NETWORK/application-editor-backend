
const app = require('express')()
let http = require('http').Server(app);


export default http.listen(3000, () => {
    console.log(`Server runs on ${PORT}`)
})