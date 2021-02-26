import * as mongoose from 'mongoose'
import { MONGO_URI, PORT } from '../config/keys'
import { Server, Socket } from 'socket.io'
import websocket from '../websocket/websocket'

const app = require('express')()
let http = require('http').Server(app)

mongoose.connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true  
}, (err: any) => {
    if (err) console.log('Error on MongoDB connection', err)
    else console.log('Connected to MongoDB')
})

const io = new Server(http, {})
io.attach(http)
io.on('connection', (socket: Socket) => websocket(socket))

export default http.listen(PORT, () => {
    console.log(`Server runs on ${PORT}`)
})