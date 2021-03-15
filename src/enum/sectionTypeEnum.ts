
/**
 * Enum of Section Types; 
 * Provides flags for Section Types
 */
 export enum SectionType {
    MARKETPLACE = "MARKETPLACE",
};

/**
 * Allows to edit enum without rewriting dependant schemas;
 */
export function* SectionTypeSpread(){
    yield SectionType.MARKETPLACE;
}