import { Document, model, Schema } from 'mongoose'
import { ObjectId } from 'mongodb'
import { 
    IPage, 
    IPageDocument, 
    IPageModel, 
} from './interfaces/page'
import { CustomDocumentBuild } from '../../@tools/mongodb/documentDefaults'
import { MONGO_COLLECTIONS } from '../../config/keys'

export const docPage = {
    appId: { type: Schema.Types.ObjectId },
    title: { type: Schema.Types.String }
}

export const schema = CustomDocumentBuild(docPage)

const Page: IPageModel = model<IPageDocument, IPageModel>(MONGO_COLLECTIONS.Pages, schema)
export default Page
export {
    IPage,
    IPageDocument
}