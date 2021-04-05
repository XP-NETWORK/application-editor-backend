import { Document, Model } from 'mongoose'
import { ObjectId } from 'mongodb'
export const USER_EMAIL_EXISTS = 'This email already exists'

export interface IUser {
    password: string
    email: string
    lowerCaseEmail: string
}

// Instance methods
export interface IUserDocument extends IUser, Document {
    toJSON();
}

// Static methods
export interface IUserModel extends Model<IUserDocument> {
    getById(to: ObjectId): Promise<IUserDocument>
    removeById(id: ObjectId): Promise<boolean>
    updateById(id: ObjectId, doc: IUser): Promise<IUserDocument>
    createNew(doc: IUser): Promise<IUserDocument>
    doesEmailExist(email: string): Promise<IUserDocument>
}