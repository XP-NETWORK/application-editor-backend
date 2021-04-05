import { Document, model, Schema } from 'mongoose'
import { 
    IUser, 
    IUserDocument, 
    IUserModel,
    USER_EMAIL_EXISTS, 
} from './interfaces/user'
import { MONGO_COLLECTIONS } from '../../config/keys'
import { CustomDocumentBuild } from '../../@tools/mongodb/documentDefaults'
import { hashString } from '../../config/string'

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