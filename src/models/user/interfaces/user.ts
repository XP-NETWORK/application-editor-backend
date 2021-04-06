import { Document, Model } from 'mongoose'
import { ObjectId } from 'mongodb'
export const USER_EMAIL_EXISTS = 'This email already exists'
export const USER_DOES_NOT_EXIST = 'User does not exist'
export const USER_SUCCESSFUL_LOGIN = 'User Successful Login'
export const USER_LOGIN_INCORRECT_PASSWORD = 'User Incorrect Password'
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
    login(email: string, password: string): Promise<IUserLogin>
}