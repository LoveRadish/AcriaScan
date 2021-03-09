/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Core as JsonapiCore } from './core';
import { Http as JsonapiHttp } from './sources/http.service';
import { StoreService as JsonapiStore } from './sources/store.service';
import { JsonapiConfig } from './jsonapi-config';
export class NgxJsonapiModule {
    /**
     * @param {?} parentModule
     * @param {?} jsonapiCore
     */
    constructor(parentModule, jsonapiCore) {
        if (parentModule) {
            throw new Error('NgxJsonapiModule is already loaded. Import it in the AppModule only');
        }
    }
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: NgxJsonapiModule,
            providers: [{ provide: JsonapiConfig, useValue: config }]
        };
    }
}
NgxJsonapiModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [
                    HttpClientModule
                ],
                providers: [
                    JsonapiCore,
                    JsonapiStore,
                    JsonapiConfig,
                    JsonapiHttp
                ]
            },] },
];
/** @nocollapse */
NgxJsonapiModule.ctorParameters = () => [
    { type: NgxJsonapiModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: JsonapiCore }
];
//# sourceMappingURL=ngx-jsonapi.module.js.map