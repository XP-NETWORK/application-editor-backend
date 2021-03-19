import { Document, Model } from 'mongoose'
import { ObjectId } from 'mongodb'

export interface IPage {
    appId: ObjectId
    title: string
}

// Instance methods
export interface IPageDocument extends IPage, Document {
    toJSON()
}


// Static methods
export interface IPageModel extends Model<IPageDocument> {
    getById(to: ObjectId): Promise<IPageDocument>
    removeById(id: ObjectId): Promise<boolean>
    updateById(id: ObjectId, doc: IPage): Promise<IPageDocument>
    createNew(doc: IPage): Promise<IPageDocument>
}