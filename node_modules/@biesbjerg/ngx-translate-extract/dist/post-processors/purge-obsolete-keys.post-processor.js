"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PurgeObsoleteKeysPostProcessor {
    constructor() {
        this.name = 'PurgeObsoleteKeys';
    }
    process(draft, extracted, existing) {
        return draft.intersect(extracted);
    }
}
exports.PurgeObsoleteKeysPostProcessor = PurgeObsoleteKeysPostProcessor;
//# sourceMappingURL=purge-obsolete-keys.post-processor.js.map