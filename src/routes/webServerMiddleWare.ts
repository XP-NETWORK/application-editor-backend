import * as path from 'path'
import * as bodyParser from 'body-parser'
import { Express } from 'express'
import * as express from 'express'

import { IS_PROD } from '../config/keys'

export default (app: Express) => {
    const publicPath = path.join(__dirname, '../../public')

    app.use(bodyParser.json({ limit: '50mb' }))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use('/public', express.static(publicPath))

    if(!IS_PROD) app.use((req: any, res: any, next: any) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR, access-token")
        if (req.headers.origin) {
            res.header('Access-Control-Allow-Origin', '*')
        }
        if (req.method === 'OPTIONS') {
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
            return res.status(200).json({})
        }
        next()
    })
}