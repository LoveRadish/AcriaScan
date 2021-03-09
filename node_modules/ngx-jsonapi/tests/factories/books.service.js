/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Resource } from '../../resource';
import { DocumentCollection } from '../../document-collection';
import { DocumentResource } from '../../document-resource';
import { Service } from '../../service';
export class Book extends Resource {
    constructor() {
        super();
        this.attributes = {
            date_published: new Date(),
            title: '',
            created_at: new Date(),
            updated_at: new Date()
        };
        this.relationships = {
            author: new DocumentResource(),
            photos: new DocumentCollection()
        };
        this.type = 'books';
        this.ttl = 0;
        if (Book.test_ttl || Book.test_ttl === 0) {
            this.ttl = Book.test_ttl;
        }
    }
}
if (false) {
    /** @type {?} */
    Book.test_ttl;
    /** @type {?} */
    Book.prototype.attributes;
    /** @type {?} */
    Book.prototype.relationships;
    /** @type {?} */
    Book.prototype.type;
    /** @type {?} */
    Book.prototype.ttl;
}
export class BooksService extends Service {
    constructor() {
        super();
        this.type = 'books';
        this.resource = Book;
        this.collections_ttl = 0;
        this.register();
    }
}
if (false) {
    /** @type {?} */
    BooksService.prototype.type;
    /** @type {?} */
    BooksService.prototype.resource;
    /** @type {?} */
    BooksService.prototype.collections_ttl;
}
//# sourceMappingURL=books.service.js.map