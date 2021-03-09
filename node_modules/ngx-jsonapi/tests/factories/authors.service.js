/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Resource } from '../../resource';
import { DocumentCollection } from '../../document-collection';
import { Service } from '../../service';
export class Author extends Resource {
    constructor() {
        super();
        this.attributes = {
            name: '',
            date_of_birth: new Date(),
            date_of_death: new Date(),
            created_at: new Date(),
            updated_at: new Date()
        };
        this.relationships = {
            books: new DocumentCollection(),
            photos: new DocumentCollection()
        };
        this.type = 'authors';
        this.ttl = 0;
        if (Author.test_ttl || Author.test_ttl === 0) {
            this.ttl = Author.test_ttl;
        }
    }
}
if (false) {
    /** @type {?} */
    Author.test_ttl;
    /** @type {?} */
    Author.prototype.attributes;
    /** @type {?} */
    Author.prototype.relationships;
    /** @type {?} */
    Author.prototype.type;
    /** @type {?} */
    Author.prototype.ttl;
}
export class AuthorsService extends Service {
    constructor() {
        super();
        this.resource = Author;
        this.type = 'authors';
        this.collections_ttl = 0;
        this.register();
    }
}
if (false) {
    /** @type {?} */
    AuthorsService.prototype.resource;
    /** @type {?} */
    AuthorsService.prototype.type;
    /** @type {?} */
    AuthorsService.prototype.collections_ttl;
}
//# sourceMappingURL=authors.service.js.map