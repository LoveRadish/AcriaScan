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
export class DexieDataProvider {
    constructor() {
        if (DexieDataProvider.db) {
            return;
        }
        DexieDataProvider.db = new Dexie('dexie_data_provider');
        DexieDataProvider.db.version(1).stores({
            collections: '',
            elements: ''
        });
    }
    /**
     * @param {?} key
     * @param {?=} table_name
     * @return {?}
     */
    getElement(key, table_name = 'elements') {
        return __awaiter(this, void 0, void 0, function* () {
            yield DexieDataProvider.db.open();
            /** @type {?} */
            const data = yield DexieDataProvider.db.table(table_name).get(key);
            if (data === undefined) {
                throw new Error(key + ' not found.');
            }
            return data;
        });
    }
    /**
     * @param {?} keys
     * @param {?=} table_name
     * @return {?}
     */
    getElements(keys, table_name = 'elements') {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let data = {};
            yield DexieDataProvider.db
                .table(table_name)
                .where(':id')
                .anyOf(keys)
                .each(element => {
                data[element.data.type + '.' + element.data.id] = element;
            });
            // we need to maintain same order, database return ordered by key
            return keys.map(key => {
                return data[key];
            });
        });
    }
    /**
     * @param {?} key_start_with
     * @param {?} changes
     * @param {?=} table_name
     * @return {?}
     */
    updateElements(key_start_with, changes, table_name = 'elements') {
        return __awaiter(this, void 0, void 0, function* () {
            return DexieDataProvider.db.open().then(() => __awaiter(this, void 0, void 0, function* () {
                if (key_start_with === '') {
                    return DexieDataProvider.db.table(table_name).clear();
                }
                else {
                    return DexieDataProvider.db
                        .table(table_name)
                        .where(':id')
                        .startsWith(key_start_with)
                        .delete()
                        .then(() => undefined);
                }
            }));
        });
    }
    /**
     * @param {?} elements
     * @param {?=} table_name
     * @return {?}
     */
    saveElements(elements, table_name = 'elements') {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let keys = [];
            /** @type {?} */
            let items = elements.map(element => {
                keys.push(element.key);
                return element.content;
            });
            return DexieDataProvider.db.open().then(() => {
                DexieDataProvider.db.table(table_name).bulkPut(items, keys);
            });
        });
    }
}
if (false) {
    /** @type {?} */
    DexieDataProvider.db;
}
//# sourceMappingURL=dexie-data-provider.js.map