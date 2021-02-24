import { PORT } from '../config/keys'

const app = require('express')()
let http = require('http').Server(app)


export default http.listen(PORT, () => {
    console.log(`Server runs on ${PORT}`)
})