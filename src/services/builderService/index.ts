import { ObjectId } from 'mongodb'
import App, { IApp } from '../../models/builder/app'
import Page, { IPage } from '../../models/builder/page'
import Section, { ISection } from '../../models/builder/section'

export class BuilderService {

    createApp(doc: IApp) {
        return App.createNew(doc)
    }

    updateApp(appId: ObjectId, doc: IApp) {
        return App.updateById(appId, doc)
    }

    createSection(doc: ISection) {
        return Section.createNew(doc)
    }

    updateSection(sectionId: ObjectId, doc: ISection) {
        return Section.updateById(sectionId, doc)
    }

    createPage(doc: IPage) {
        return Page.createNew(doc)
    }

    updatePage(pageId: ObjectId, doc: IPage) {
        return Page.updateById(pageId, doc)
    }
}