import { ICacheableDataCollection } from './../interfaces/data-collection';
import { ICacheableDocumentResource } from './../interfaces/data-object';
import { Resource } from './../resource';
import { IElement } from './../data-providers/data-provider';
import { DocumentCollection } from '../document-collection';
export declare class JsonRipper {
    private dataProvider;
    constructor();
    getResource(key: string, include?: Array<string>): Promise<ICacheableDocumentResource>;
    getCollection(url: string, include?: Array<string>): Promise<ICacheableDataCollection>;
    private getDataCollection;
    private getDataResources;
    saveCollection(url: string, collection: DocumentCollection, include?: Array<string>): void;
    saveResource(resource: Resource, include?: never[]): Promise<void>;
    private static collectionToElement;
    private static collectionResourcesToElements;
    static toResourceElements(key: string, resource: Resource, include?: Array<string>): Array<IElement>;
    static getResourceKey(resource: Resource): string;
    private static getElement;
    deprecateCollection(key_start_with: string): Promise<void>;
}
