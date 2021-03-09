/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Resource } from '../../resource';
import { Service } from '../../service';
export class Photo extends Resource {
    constructor() {
        super();
        this.attributes = {
            title: '',
            uri: '',
            imageable_id: '',
            created_at: new Date(),
            updated_at: new Date()
        };
        this.type = 'photos';
        this.ttl = 0;
        if (Photo.test_ttl || Photo.test_ttl === 0) {
            this.ttl = Photo.test_ttl;
        }
    }
}
if (false) {
    /** @type {?} */
    Photo.test_ttl;
    /** @type {?} */
    Photo.prototype.attributes;
    /** @type {?} */
    Photo.prototype.type;
    /** @type {?} */
    Photo.prototype.ttl;
}
export class PhotosService extends Service {
    constructor() {
        super();
        this.resource = Photo;
        this.type = 'photos';
        this.register();
    }
}
if (false) {
    /** @type {?} */
    PhotosService.prototype.resource;
    /** @type {?} */
    PhotosService.prototype.type;
}
//# sourceMappingURL=photos.service.js.map