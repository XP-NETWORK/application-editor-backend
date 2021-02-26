import * as path from 'path'
import * as bodyParser from 'body-parser'
import { Express } from 'express'
import * as express from 'express'

export default (app: Express) => {
    const publicPath = path.join(__dirname, '../../public')

    app.use(bodyParser.json({ limit: '50mb' }))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use('/public', express.static(publicPath))

}