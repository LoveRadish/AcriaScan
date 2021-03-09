var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { DocumentResource } from './../document-resource';
import { DexieDataProvider } from '../data-providers/dexie-data-provider';
import { DocumentCollection } from '../document-collection';
/**
 * @record
 */
function IStoredCollection() { }
/** @type {?} */
IStoredCollection.prototype.updated_at;
/** @type {?} */
IStoredCollection.prototype.keys;
export class JsonRipper {
    constructor() {
        this.dataProvider = new DexieDataProvider();
    }
    /**
     * @param {?} key
     * @param {?=} include
     * @return {?}
     */
    getResource(key, include = []) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let stored_resource = (yield this.getDataResources([key])).shift();
            if (stored_resource === undefined) {
                throw new Error(`Resource ${key} don't found.`);
            }
            if (include.length === 0) {
                return stored_resource;
            }
            /** @type {?} */
            let included_keys = [];
            include.forEach(relationship_alias => {
                // @NOTE: typescript doesn't detect throwError added a few lines above when stored_resource === undefnied
                if (!stored_resource || !stored_resource.data.relationships || !stored_resource.data.relationships[relationship_alias]) {
                    // this is a classic problem when relationship property is missing on included resources
                    throw new Error('We dont have relation_alias on stored data resource');
                }
                /** @type {?} */
                const relationship = stored_resource.data.relationships[relationship_alias].data;
                if (relationship instanceof Array) {
                    relationship.forEach(related_resource => {
                        included_keys.push(JsonRipper.getResourceKey(related_resource));
                    });
                }
                else if (relationship && 'id' in relationship) {
                    included_keys.push(JsonRipper.getResourceKey(relationship));
                }
            });
            /** @type {?} */
            let included_resources = yield this.getDataResources(included_keys);
            return Object.assign({}, stored_resource, { included: included_resources.map(document_resource => document_resource.data) });
        });
    }
    /**
     * @param {?} url
     * @param {?=} include
     * @return {?}
     */
    getCollection(url, include = []) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let stored_collection = yield this.getDataCollection(url);
            /** @type {?} */
            let data_resources = yield this.getDataResources(stored_collection.keys);
            /** @type {?} */
            let ret = {
                data: data_resources.map(data_resource => data_resource.data),
                cache_last_update: stored_collection.updated_at
            };
            if (include.length === 0) {
                return ret;
            }
            /** @type {?} */
            let included_keys = [];
            include.forEach(relationship_alias => {
                data_resources.forEach(resource => {
                    if (!resource.data.relationships || !resource.data.relationships[relationship_alias]) {
                        return;
                    }
                    /** @type {?} */
                    const relationship = resource.data.relationships[relationship_alias].data;
                    if (relationship instanceof Array) {
                        relationship.forEach(related_resource => {
                            included_keys.push(JsonRipper.getResourceKey(related_resource));
                        });
                    }
                    else if ('id' in relationship) {
                        included_keys.push(JsonRipper.getResourceKey(relationship));
                    }
                });
            });
            /** @type {?} */
            let included_resources = yield this.getDataResources(included_keys);
            return Object.assign({}, ret, { included: included_resources.map(document_resource => document_resource.data) });
        });
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getDataCollection(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return /** @type {?} */ (this.dataProvider.getElement(url, 'collections'));
        });
    }
    /**
     * @param {?} keys
     * @return {?}
     */
    getDataResources(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            return /** @type {?} */ (this.dataProvider.getElements(keys, 'elements'));
        });
    }
    /**
     * @param {?} url
     * @param {?} collection
     * @param {?=} include
     * @return {?}
     */
    saveCollection(url, collection, include = []) {
        this.dataProvider.saveElements(JsonRipper.collectionToElement(url, collection), 'collections');
        this.dataProvider.saveElements(JsonRipper.collectionResourcesToElements(collection, include), 'elements');
    }
    /**
     * @param {?} resource
     * @param {?=} include
     * @return {?}
     */
    saveResource(resource, include = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataProvider.saveElements(JsonRipper.toResourceElements(JsonRipper.getResourceKey(resource), resource, include), 'elements');
        });
    }
    /**
     * @param {?} url
     * @param {?} collection
     * @return {?}
     */
    static collectionToElement(url, collection) {
        /** @type {?} */
        let collection_element = {
            key: url,
            content: { updated_at: Date.now(), keys: /** @type {?} */ ([]) }
        };
        collection.data.forEach(resource => {
            /** @type {?} */
            let key = JsonRipper.getResourceKey(resource);
            collection_element.content.keys.push(key);
        });
        return [collection_element];
    }
    /**
     * @param {?} collection
     * @param {?=} include
     * @return {?}
     */
    static collectionResourcesToElements(collection, include = []) {
        /** @type {?} */
        let elements = [];
        collection.data.forEach(resource => {
            /** @type {?} */
            let key = JsonRipper.getResourceKey(resource);
            elements.push(...JsonRipper.toResourceElements(key, resource, include));
        });
        return elements;
    }
    /**
     * @param {?} key
     * @param {?} resource
     * @param {?=} include
     * @return {?}
     */
    static toResourceElements(key, resource, include = []) {
        /** @type {?} */
        let elements = [
            {
                key: key,
                content: resource.toObject()
            }
        ];
        elements[0].content["data"].cache_last_update = Date.now();
        include.forEach(relationship_alias => {
            /** @type {?} */
            const relationship = resource.relationships[relationship_alias];
            if (relationship instanceof DocumentCollection) {
                relationship.data.forEach(related_resource => {
                    elements.push(JsonRipper.getElement(related_resource));
                });
            }
            else if (relationship instanceof DocumentResource) {
                if (relationship.data === null || relationship.data === undefined) {
                    return;
                }
                elements.push(JsonRipper.getElement(relationship.data));
            }
        });
        return elements;
    }
    /**
     * @param {?} resource
     * @return {?}
     */
    static getResourceKey(resource) {
        return resource.type + '.' + resource.id;
    }
    /**
     * @param {?} resource
     * @return {?}
     */
    static getElement(resource) {
        return {
            key: JsonRipper.getResourceKey(resource),
            content: resource.toObject()
        };
    }
    /**
     * @param {?} key_start_with
     * @return {?}
     */
    deprecateCollection(key_start_with) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataProvider.updateElements(key_start_with, {}, 'collections');
        });
    }
}
if (false) {
    /** @type {?} */
    JsonRipper.prototype.dataProvider;
}
//# sourceMappingURL=json-ripper.js.map