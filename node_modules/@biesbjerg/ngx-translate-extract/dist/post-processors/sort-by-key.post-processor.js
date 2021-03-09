"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SortByKeyPostProcessor {
    constructor() {
        this.name = 'SortByKey';
    }
    process(draft, extracted, existing) {
        return draft.sort();
    }
}
exports.SortByKeyPostProcessor = SortByKeyPostProcessor;
//# sourceMappingURL=sort-by-key.post-processor.js.map