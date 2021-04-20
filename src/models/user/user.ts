import  * as bcryptjs from 'bcryptjs'
import { Document, model, Schema } from 'mongoose'

import { 
    IUser, 
    IUserDocument, 
    IUserModel,
    USER_EMAIL_EXISTS, 
    USER_SUCCESSFUL_LOGIN,
    USER_LOGIN_INCORRECT_PASSWORD,
    USER_DOES_NOT_EXIST
} from './interfaces/user'
import { MONGO_COLLECTIONS } from '../../config/keys'
import { CustomDocumentBuild } from '../../@tools/mongodb/documentDefaults'
import { hashString } from '../../@tools/string'

export const docUser = {
    password: { type: Schema.Types.String },
    email: { type: Schema.Types.String },
    lowerCaseEmail: { type: Schema.Types.String }
}

export const schema = CustomDocumentBuild(docUser)

schema.statics.doesEmailExist = async function doesEmailExist(lowerCaseEmail: string) {
    const query = this.findOne({ lowerCaseEmail })
    return await query.exec().then(r => r ? r : undefined)
}

schema.statics.login = async function login(email: string, password: string) {
    const user = await User.doesEmailExist(email.toLowerCase())
    if(user) {
        const passwordCorrect: boolean = await bcryptjs.compare(password, user.password)
        if (passwordCorrect) {
            return {message: USER_SUCCESSFUL_LOGIN, user: user}
        } else return {message: USER_LOGIN_INCORRECT_PASSWORD, user}
    } else return {message: USER_DOES_NOT_EXIST }
}

schema.statics.register = async function register(user: IUser) {
    const { password, email } = user
    if(email && password) {
        const doesEmailExist = await User.doesEmailExist(email.toLowerCase())
        if( !doesEmailExist) {
            user.password = await hashString(password)
            user.lowerCaseEmail = email.toLowerCase()
            return await User.createNew(user)
        } 
        else if(doesEmailExist) return USER_EMAIL_EXISTS
    } 
    return undefined
}

const User: IUserModel = model<IUserDocument, IUserModel>(MONGO_COLLECTIONS.Users, schema)
export default User
export {
    IUser,
    IUserDocument
}