import { ModuleWithProviders } from '@angular/core';
import { Core as JsonapiCore } from './core';
import { JsonapiConfig } from './jsonapi-config';
export declare class NgxJsonapiModule {
    constructor(parentModule: NgxJsonapiModule, jsonapiCore: JsonapiCore);
    static forRoot(config: JsonapiConfig): ModuleWithProviders;
}
