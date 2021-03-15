export const PORT: string = process.env.PORT || '3004'
export const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost:27017/xpnetwork-application-editor'

export const IS_PROD: boolean = process.env.NODE_ENV === 'production'

export const MONGO_COLLECTIONS = {
    Sections: 'Sections'.toLowerCase(),
    Apps: 'Apps'.toLowerCase(),
    Pages: 'Pages'.toLowerCase()
}