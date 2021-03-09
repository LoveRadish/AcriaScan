/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonapiConfig } from '../jsonapi-config';
import { share, tap } from 'rxjs/operators';
export class Http {
    /**
     * @param {?} http
     * @param {?} rsJsonapiConfig
     */
    constructor(http, rsJsonapiConfig) {
        this.http = http;
        this.rsJsonapiConfig = rsJsonapiConfig;
        this.get_requests = {};
    }
    /**
     * @param {?} path
     * @param {?} method
     * @param {?=} data
     * @return {?}
     */
    exec(path, method, data) {
        /** @type {?} */
        let req = {
            body: data || null,
            headers: new HttpHeaders({
                'Content-Type': 'application/vnd.api+json',
                Accept: 'application/vnd.api+json'
            })
        };
        // NOTE: prevent duplicate GET requests
        if (method === 'get') {
            if (!this.get_requests[path]) {
                /** @type {?} */
                let obs = this.http.request(method, this.rsJsonapiConfig.url + path, req).pipe(tap(() => {
                    delete this.get_requests[path];
                }), share());
                this.get_requests[path] = obs;
                return obs;
            }
            return this.get_requests[path];
        }
        return this.http.request(method, this.rsJsonapiConfig.url + path, req).pipe(tap(() => {
            delete this.get_requests[path];
        }), share());
    }
}
Http.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Http.ctorParameters = () => [
    { type: HttpClient },
    { type: JsonapiConfig }
];
if (false) {
    /** @type {?} */
    Http.prototype.get_requests;
    /** @type {?} */
    Http.prototype.http;
    /** @type {?} */
    Http.prototype.rsJsonapiConfig;
}
//# sourceMappingURL=http.service.js.map