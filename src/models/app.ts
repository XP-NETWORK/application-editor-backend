import { Document, model, Schema } from 'mongoose'
import { ObjectId } from 'mongodb'
import { 
    IApp, 
    IAppDocument, 
    IAppModel, 
} from './interfaces/app'

export const docApp = {
    userId: { type: Schema.Types.ObjectId },
    title: { type: Schema.Types.String }
}

var schema: Schema = new Schema(docApp,
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    })
schema.index({ '$**': 'text' })
schema.set('toJSON', {
    transform(doc: any, ret: any) {
        delete ret.__v
    },
})
schema.set('toObject', {
    transform(doc: any, ret: any) {
        delete ret.__v
    },
})


const App: IAppModel = model<IAppDocument, IAppModel>('Apps', schema)
export default App
export {
    IApp,
    IAppDocument
}