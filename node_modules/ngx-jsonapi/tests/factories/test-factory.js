/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { DocumentCollection } from '../../document-collection';
import { DocumentResource } from '../../document-resource';
import { Author } from './authors.service';
import { Book } from './books.service';
import { Photo } from './photos.service';
import * as faker from 'faker';
export class TestFactory {
    /**
     * @param {?} document_class
     * @param {?=} include
     * @param {?=} id
     * @return {?}
     */
    static getResourceDocumentData(document_class, include = [], id) {
        /** @type {?} */
        let main_resource = this[`get${document_class.name}`](id, include);
        /** @type {?} */
        let document_data = main_resource.toObject();
        TestFactory.fillDocumentDataIncludedRelatioships(document_data, include);
        return document_data;
    }
    /**
     * @param {?} document_class
     * @param {?=} size
     * @param {?=} include
     * @return {?}
     */
    static getCollectionDocumentData(document_class, size = 2, include = []) {
        /** @type {?} */
        let main_collection = this.getCollection(document_class, size, include);
        /** @type {?} */
        let document_data = main_collection.toObject();
        TestFactory.fillDocumentDataIncludedRelatioships(document_data, include);
        return document_data;
    }
    /**
     * @return {?}
     */
    static getBookDocumentData() {
        /**/
    }
    /**
     * @return {?}
     */
    static getPhotoDocumentData() {
        /**/
    }
    /**
     * @param {?=} id
     * @param {?=} include
     * @param {?=} ttl
     * @return {?}
     */
    static getBook(id, include = [], ttl = 0) {
        /** @type {?} */
        let book = new Book();
        book.id = this.getId(id);
        book.ttl = ttl;
        TestFactory.fillBookAttributes(book);
        // NOTE: add author
        (/** @type {?} */ (book.relationships.author.data)) = this.getDataResourceWithType('authors');
        if (include.includes('author')) {
            this.includeFromService(book, 'author', Author);
        }
        // NOTE: add photos
        book.relationships.photos.data = book.relationships.photos.data.concat(/** @type {?} */ (this.getDataResourcesWithType('photos', 2)));
        if (include.includes('photos')) {
            this.includeFromService(book, 'photos', Photo);
        }
        return book;
    }
    /**
     * @param {?=} id
     * @param {?=} include
     * @param {?=} ttl
     * @return {?}
     */
    static getAuthor(id, include = [], ttl = 0) {
        /** @type {?} */
        let author = new Author();
        author.id = this.getId(id);
        author.ttl = ttl;
        TestFactory.fillAuthorAttributes(author);
        // NOTE: add books
        author.relationships.books.data = author.relationships.books.data.concat(/** @type {?} */ (this.getDataResourcesWithType('books', 2)));
        if (include.includes('books')) {
            this.includeFromService(author, 'books', Book);
            for (let book of author.relationships.books.data) {
                (/** @type {?} */ (book.relationships.author.data)).id = author.id;
            }
        }
        // NOTE: add photos
        author.relationships.photos.data = author.relationships.photos.data.concat(/** @type {?} */ ((this.getDataResourcesWithType('photos', 2))));
        if (include.includes('photos')) {
            this.includeFromService(author, 'photos', Photo);
        }
        return author;
    }
    /**
     * @param {?=} id
     * @param {?=} include
     * @param {?=} ttl
     * @return {?}
     */
    static getPhoto(id, include = [], ttl = 0) {
        /** @type {?} */
        let photo = new Photo();
        photo.id = this.getId(id);
        photo.ttl = ttl;
        TestFactory.fillPhotoAttirbutes(photo);
        return photo;
    }
    /**
     * @param {?} resources_class
     * @param {?=} size
     * @param {?=} include
     * @return {?}
     */
    static getCollection(resources_class, size = 2, include = []) {
        /** @type {?} */
        let collection = new DocumentCollection();
        for (let index = 0; index < size; index++) {
            /** @type {?} */
            let factory_name = `get${resources_class.name}`;
            /** @type {?} */
            let resource = this[factory_name](undefined, include);
            collection.data.push(resource);
        }
        collection.setBuilded(true);
        collection.setLoaded(true);
        collection.cache_last_update = Date.now();
        return collection;
    }
    /**
     * @param {?} author
     * @return {?}
     */
    static fillAuthorAttributes(author) {
        author.attributes.name = faker.name.firstName();
        author.attributes.date_of_birth = faker.date.past();
        author.attributes.date_of_death = faker.date.past();
        author.attributes.created_at = faker.date.past();
        author.attributes.updated_at = faker.date.past();
        return author;
    }
    /**
     * @param {?} book
     * @return {?}
     */
    static fillBookAttributes(book) {
        book.attributes.title = faker.name.title();
        book.attributes.date_published = faker.date.past();
        book.attributes.created_at = faker.date.past();
        book.attributes.updated_at = faker.date.past();
        return book;
    }
    /**
     * @param {?} book
     * @return {?}
     */
    static fillPhotoAttirbutes(book) {
        book.attributes.title = faker.name.title();
        book.attributes.uri = faker.internet.url();
        book.attributes.imageable_id = faker.random.uuid();
        book.attributes.created_at = faker.date.past();
        book.attributes.updated_at = faker.date.past();
        return book;
    }
    /**
     * @param {?=} id
     * @return {?}
     */
    static getId(id) {
        return id || 'new_' + Math.floor(Math.random() * 10000).toString();
    }
    /**
     * @param {?} resource
     * @param {?} relationship_alias
     * @param {?} class_to_add
     * @return {?}
     */
    static includeFromService(resource, relationship_alias, class_to_add) {
        /** @type {?} */
        let relationship = resource.relationships[relationship_alias];
        if (!relationship) {
            console.error(`${relationship_alias} relationship doesn't exist in ${resource.type}`);
            return;
        }
        else if (relationship.data && 'id' in relationship.data) {
            this.includeHasOneFromService(resource, relationship_alias, class_to_add);
        }
        else if (relationship instanceof DocumentCollection) {
            this.includeHasManyFromService(resource, relationship_alias, class_to_add);
        }
    }
    /**
     * @param {?} resource
     * @param {?} relationship_alias
     * @param {?} class_to_add
     * @return {?}
     */
    static includeHasOneFromService(resource, relationship_alias, class_to_add) {
        /** @type {?} */
        let resource_to_add = new class_to_add();
        /** @type {?} */
        let relationship = /** @type {?} */ (resource.relationships[relationship_alias]);
        if (!relationship || !relationship.data) {
            return;
        }
        resource_to_add.id = relationship.data.id;
        /** @type {?} */
        let fill_method = `fill${class_to_add.name}Attributes`;
        TestFactory[fill_method](resource_to_add);
        resource.addRelationship(resource_to_add, relationship_alias);
    }
    /**
     * @param {?} resource
     * @param {?} relationship_alias
     * @param {?} class_to_add
     * @return {?}
     */
    static includeHasManyFromService(resource, relationship_alias, class_to_add) {
        /** @type {?} */
        let resources_to_add = [];
        for (let resource_relatioship of (/** @type {?} */ (resource.relationships[relationship_alias])).data) {
            /** @type {?} */
            let resource_to_add = new class_to_add();
            resource_to_add.id = resource_relatioship.id;
            /** @type {?} */
            let fill_method = `fill${class_to_add.name}Attributes`;
            TestFactory[fill_method](resource_to_add);
            resources_to_add.push(resource_to_add);
        }
        // @TODO: cannot use addRelationships because its not working here... SHOULD BE FIXED
        // resource.addRelationships(resources_to_add, relationship_alias);
        resource.relationships[relationship_alias].data = resources_to_add;
    }
    /**
     * @param {?} type
     * @param {?=} id
     * @return {?}
     */
    static getDataResourceWithType(type, id) {
        return {
            id: this.getId(id),
            type: type
        };
    }
    /**
     * @param {?} type
     * @param {?} qty
     * @return {?}
     */
    static getDataResourcesWithType(type, qty) {
        /** @type {?} */
        let data_resources = [];
        for (let index = 0; index < qty; index++) {
            data_resources.push(this.getDataResourceWithType(type));
        }
        return data_resources;
    }
    /**
     * @param {?} document_data
     * @param {?} resource
     * @param {?} included_alias
     * @return {?}
     */
    static fillResourceRelationshipsInDocumentData(document_data, resource, included_alias) {
        if (!document_data.included) {
            document_data.included = [];
        }
        /** @type {?} */
        let relationship_content = resource.relationships[included_alias];
        // @NOTE: cannot check IDocumentResource interface with instanceof
        if (relationship_content instanceof DocumentResource || 'type' in relationship_content.data) {
            /** @type {?} */
            let relation_data = (/** @type {?} */ (relationship_content)).data;
            if (!relation_data) {
                console.warn('relationship content is empty');
                return;
            }
            /** @type {?} */
            let resource_class = TestFactory.resource_classes_by_type[relation_data.type];
            if (!resource_class) {
                console.warn(`cannot find the required class for type ${relation_data.type}`);
                return;
            }
            document_data.included.push(
            // @TODO: improve this code... should avoid forced types and ts errors...
            this[`get${resource_class.name}`](relation_data.id));
            // @NOTE: cannot check IDataResource interface with instanceof
        }
        else if (relationship_content instanceof DocumentCollection || relationship_content.data instanceof Array) {
            for (let has_many_relationship of (/** @type {?} */ (resource.relationships[included_alias])).data) {
                document_data.included.push(this[`get${TestFactory.resource_classes_by_type[has_many_relationship.type].name}`](has_many_relationship.id));
            }
        }
    }
    /**
     * @param {?} document_data
     * @param {?} include
     * @return {?}
     */
    static fillDocumentDataIncludedRelatioships(document_data, include) {
        for (let included_alias of include) {
            if (!document_data.included) {
                document_data.included = [];
            }
            if ((/** @type {?} */ (document_data.data)).id) {
                if (!(/** @type {?} */ (document_data.data)).relationships[included_alias].data) {
                    continue;
                }
                TestFactory.fillResourceRelationshipsInDocumentData(document_data, /** @type {?} */ (document_data.data), included_alias);
                return;
            }
            for (let resource of /** @type {?} */ (document_data.data)) {
                TestFactory.fillResourceRelationshipsInDocumentData(document_data, resource, included_alias);
            }
        }
    }
}
TestFactory.resource_classes_by_type = {
    photos: Photo,
    books: Book,
    authors: Author
};
if (false) {
    /** @type {?} */
    TestFactory.resource_classes_by_type;
}
//# sourceMappingURL=test-factory.js.map