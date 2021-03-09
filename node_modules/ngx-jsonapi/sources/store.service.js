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
import Dexie from 'dexie';
/**
 * @record
 */
function IStoreElement() { }
/** @type {?} */
IStoreElement.prototype.time;
export class StoreService {
    constructor() {
        this.db = new Dexie('jsonapi_db');
        this.db.version(1).stores({
            collections: '',
            elements: ''
        });
        this.checkIfIsTimeToClean();
    }
    /**
     * @param {?} type
     * @param {?} id_or_url
     * @return {?}
     */
    getDataObject(type, id_or_url) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const table_name = type === 'collection' ? 'collections' : 'elements';
            yield this.db.open();
            /** @type {?} */
            let item = yield this.db.table(table_name).get(type + '.' + id_or_url);
            if (item === undefined) {
                throw new Error();
            }
            return item;
        });
    }
    /**
     * @param {?} keys
     * @return {?}
     */
    getDataResources(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const collection = this.db
                .table('elements')
                .where(':id')
                .anyOf(keys);
            /** @type {?} */
            let resources_by_id = {};
            yield collection.each(item => {
                resources_by_id[item.id] = item;
            });
            return resources_by_id;
        });
    }
    /**
     * @param {?} type
     * @param {?} url_or_id
     * @param {?} value
     * @return {?}
     */
    saveResource(type, url_or_id, value) {
        /** @type {?} */
        let data_resource_storage = Object.assign({ cache_last_update: Date.now() }, value);
        this.db.open().then(() => __awaiter(this, void 0, void 0, function* () {
            return this.db.table('elements').put(data_resource_storage, type + '.' + url_or_id);
        }));
    }
    /**
     * @param {?} url_or_id
     * @param {?} value
     * @return {?}
     */
    saveCollection(url_or_id, value) {
        /** @type {?} */
        let data_collection_storage = Object.assign({ cache_last_update: Date.now() }, value);
        this.db.open().then(() => __awaiter(this, void 0, void 0, function* () {
            return this.db.table('collections').put(data_collection_storage, 'collection.' + url_or_id);
        }));
    }
    /**
     * @return {?}
     */
    clearCache() {
        this.db.open().then(() => __awaiter(this, void 0, void 0, function* () {
            return this.db
                .table('elements')
                .toCollection()
                .delete();
        }));
        this.db.open().then(() => __awaiter(this, void 0, void 0, function* () {
            return this.db
                .table('collections')
                .toCollection()
                .delete();
        }));
    }
    /**
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    deprecateResource(type, id) {
        this.db.open().then(() => __awaiter(this, void 0, void 0, function* () {
            return this.db
                .table('elements')
                .where(':id')
                .startsWith(type + '.' + id)
                .modify({ cache_last_update: 0 });
        }));
    }
    /**
     * @param {?} key_start_with
     * @return {?}
     */
    deprecateCollection(key_start_with) {
        this.db.open().then(() => __awaiter(this, void 0, void 0, function* () {
            return this.db
                .table('collections')
                .where(':id')
                .startsWith(key_start_with)
                .modify({ cache_last_update: 0 });
        }));
    }
    /**
     * @param {?} key
     * @return {?}
     */
    removeObjectsWithKey(key) {
        /*
                this.allstore.removeItem(key);
                await this.allstore.getItems().then(async result => {
                    for (let saved_resource_key in result) {
                        let resource_id_split = key.split('.');
                        let resource_id = resource_id_split[resource_id_split.length - 1];
                        if (
                            Array.isArray(result[saved_resource_key].data) &&
                            result[saved_resource_key].data.find(resource => resource.id === resource_id)
                        ) {
                            result[saved_resource_key].data.splice(
                                result[saved_resource_key].data.findIndex(resource => resource.id === resource_id),
                                1
                            );
                            await this.allstore.setItem(saved_resource_key, result[saved_resource_key]);
                        }
                    }
                });
                */
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    /**
     * @return {?}
     */
    checkIfIsTimeToClean() {
        // check if is time to check cachestore
        /*
                this.globalstore
                    .getItem('_lastclean_time')
                    .then((success: IStoreElement) => {
                        if (Date.now() >= success.time + 12 * 3600 * 1000) {
                            // is time to check cachestore!
                            this.globalstore.setItem('_lastclean_time', {
                                time: Date.now()
                            });
                            this.checkAndDeleteOldElements();
                        }
                    })
                    .catch(() => {
                        this.globalstore.setItem('_lastclean_time', {
                            time: Date.now()
                        });
                    });
                */
    }
    /**
     * @return {?}
     */
    checkAndDeleteOldElements() {
        /*
                this.allstore
                    .keys()
                    .then(success => {
                        Base.forEach(success, key => {
                            // recorremos cada item y vemos si es tiempo de removerlo
                            this.allstore
                                .getItem(key)
                                .then((success2: ICacheableDataCollection | ICacheableDataResource) => {
                                    if (Date.now() >= success2.cache_last_update + 24 * 3600 * 1000) {
                                        this.allstore.removeItem(key);
                                    }
                                })
                                .catch(noop);
                        });
                    })
                    .catch(noop);
                */
    }
}
if (false) {
    /** @type {?} */
    StoreService.prototype.db;
}
//# sourceMappingURL=store.service.js.map