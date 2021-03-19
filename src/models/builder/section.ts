import { Document, model, Schema } from 'mongoose'
import { ObjectId } from 'mongodb'
import { 
    ISection, 
    ISectionDocument, 
    ISectionModel, 
} from './interfaces/section'
import { CustomDocumentBuild } from '../../@tools/mongodb/documentDefaults'
import { MONGO_COLLECTIONS } from '../../config/keys'
import { SectionTypeSpread } from '../../enum/sectionTypeEnum'

export const docSection = {
    SectionId: { type: Schema.Types.ObjectId },
    index: { type: Schema.Types.Number },
    type: { type: Schema.Types.String, enum: [...SectionTypeSpread()] },
    data: { type: Schema.Types.Mixed } // section's datas to be explained in types
}

export const schema = CustomDocumentBuild(docSection)

const Section: ISectionModel = model<ISectionDocument, ISectionModel>(MONGO_COLLECTIONS.Sections, schema)
export default Section
export {
    ISection,
    ISectionDocument
}