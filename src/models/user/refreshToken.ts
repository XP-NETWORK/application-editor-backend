import { Document, model, Schema } from 'mongoose'
import { ObjectId } from 'mongodb'
import { IRefreshToken, IRefreshTokenDocument, IRefreshTokenModel } from './interfaces/refreshToken'
import { CustomDocumentBuild } from '../../@tools/mongodb/documentDefaults'
import { MONGO_COLLECTIONS } from '../../config/keys'

export const docRefreshToken = {
    userId: { type: Schema.Types.ObjectId },
    token: { type: Schema.Types.String }
}

export const schema = CustomDocumentBuild(docRefreshToken)



/**
 * MODEL RefreshToken, used for interactions with MongoDB
 */
const RefreshToken: IRefreshTokenModel = model<IRefreshTokenDocument, IRefreshTokenModel>(MONGO_COLLECTIONS.RefreshTokens, schema)
export default RefreshToken
export {
    IRefreshToken,
    IRefreshTokenDocument,
}