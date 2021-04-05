import { Document, model, Schema } from 'mongoose'
import { 
    IUser, 
    IUserDocument, 
    IUserModel, 
} from './interfaces/user'
import { MONGO_COLLECTIONS } from '../../config/keys'
import { CustomDocumentBuild } from '../../@tools/mongodb/documentDefaults'

export const docUser = {
    password: { type: Schema.Types.String },
    email: { type: Schema.Types.String },
    lowerCaseEmail: { type: Schema.Types.String }
}

export const schema = CustomDocumentBuild(docUser)


const User: IUserModel = model<IUserDocument, IUserModel>(MONGO_COLLECTIONS.Users, schema)
export default User
export {
    IUser,
    IUserDocument
}