import { Document, Model } from 'mongoose'
import { ObjectId } from 'mongodb'
import { SectionType } from '../../../enum/sectionTypeEnum'

export interface ISection {
    pageId: ObjectId
    index: number
    type: SectionType
    data: any // to be replaced with specific types
}

// Instance methods
export interface ISectionDocument extends ISection, Document {
    toJSON();
}


// Static methods
export interface ISectionModel extends Model<ISectionDocument> {
    getById(to: ObjectId): Promise<ISectionDocument>
    removeById(id: ObjectId): Promise<boolean>
    updateById(id: ObjectId, doc: ISection): Promise<ISectionDocument>
    createNew(doc: ISection): Promise<ISectionDocument>
}