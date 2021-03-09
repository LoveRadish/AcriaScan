import { Resource } from '../../resource';
import { IDocumentData } from '../../interfaces/document';
import { DocumentCollection } from '../../document-collection';
import { Author } from './authors.service';
import { Book } from './books.service';
import { Photo } from './photos.service';
export declare class TestFactory {
    private static resource_classes_by_type;
    static getResourceDocumentData(document_class: typeof Resource, include?: Array<string>, id?: string): IDocumentData;
    static getCollectionDocumentData(document_class: typeof Resource, size?: number, include?: Array<string>): IDocumentData;
    static getBookDocumentData(): void;
    static getPhotoDocumentData(): void;
    static getBook(id?: string, include?: Array<string>, ttl?: number): Book;
    static getAuthor(id?: string, include?: Array<string>, ttl?: number): Author;
    static getPhoto(id?: string, include?: Array<string>, ttl?: number): Photo;
    static getCollection(resources_class: typeof Resource, size?: number, include?: Array<string>): DocumentCollection;
    private static fillAuthorAttributes;
    private static fillBookAttributes;
    private static fillPhotoAttirbutes;
    private static getId;
    private static includeFromService;
    private static includeHasOneFromService;
    private static includeHasManyFromService;
    private static getDataResourceWithType;
    private static getDataResourcesWithType;
    private static fillResourceRelationshipsInDocumentData;
    private static fillDocumentDataIncludedRelatioships;
}
