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


schema.statics.createNew = async function createNew(newDocument: any) {
    return new this(newDocument).save();
};


schema.statics.getById = async function getById(_id: ObjectId) {
    const query = this.findOne({ _id });
    return query.exec().then((doc: any) => (doc ? doc.toJSON() : undefined));
};


schema.statics.removeById = async function removeById(_id: ObjectId) {
    return new Promise(async (res, rej) => {
        const query = this.findOneAndRemove({ _id })
        query.exec().then((err: any, r: any) => {
            if(err || !r) rej()
            else res(true)
        })
    })

}

schema.statics.updateById = async function updateById(_id: ObjectId, updatedDocument: any) {
    return new Promise((res, rej) => {
       const query = this.findByIdAndUpdate({ _id }, updatedDocument, { new: true })
       query.exec().then((r: any, err: any) => {
           if(err || !r) rej()
           else res(r)

       })
    })

}

const App: IAppModel = model<IAppDocument, IAppModel>('Apps', schema)
export default App
export {
    IApp,
    IAppDocument
}