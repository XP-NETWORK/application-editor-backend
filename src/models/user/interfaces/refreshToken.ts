import { Document, Model } from 'mongoose'
import { ObjectId } from 'mongodb'

export interface IRefreshToken {
    userId: ObjectId
    token: string
}

// Instance methods
export interface IRefreshTokenDocument extends IRefreshToken, Document {
    toJSON();
}


// Static methods
export interface IRefreshTokenModel extends Model<IRefreshTokenDocument> {
    getById(to: ObjectId): Promise<IRefreshTokenDocument>
    getByToken(token: string): Promise<IRefreshTokenDocument>
    removeById(id: ObjectId): Promise<boolean>
    updateById(id: ObjectId, doc: IRefreshToken): Promise<IRefreshTokenDocument>
    createNew(doc: IRefreshToken): Promise<IRefreshTokenDocument>
}