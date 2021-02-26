import * as mongoose from 'mongoose'
import { MONGO_URI, PORT } from '../config/keys'

const app = require('express')()
let http = require('http').Server(app)

mongoose.connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true  
}, (err: any) => {
    if (err) console.log('Error on MongoDB connection', err)
    else console.log('Connected to MongoDB')
})

export default http.listen(PORT, () => {
    console.log(`Server runs on ${PORT}`)
})