import { Service } from './service';
import { Resource } from './resource';
import { JsonapiConfig } from './jsonapi-config';
import { Http as JsonapiHttpImported } from './sources/http.service';
import { StoreService as JsonapiStore } from './sources/store.service';
import { IDocumentResource } from './interfaces/data-object';
import { Observable } from 'rxjs';
import { IDocumentData } from './interfaces/document';
export declare class Core {
    static me: Core;
    static injectedServices: {
        JsonapiStoreService: JsonapiStore;
        JsonapiHttp: JsonapiHttpImported;
        rsJsonapiConfig: JsonapiConfig;
    };
    loadingsCounter: number;
    loadingsStart: Function;
    loadingsDone: Function;
    loadingsError: Function;
    loadingsOffline: Function;
    config: JsonapiConfig;
    private resourceServices;
    constructor(user_config: JsonapiConfig, jsonapiStoreService: JsonapiStore, jsonapiHttp: JsonapiHttpImported);
    static delete(path: string): Observable<IDocumentData>;
    static get(path: string): Observable<IDocumentData>;
    static exec(path: string, method: string, data?: IDocumentResource, call_loadings_error?: boolean): Observable<IDocumentData>;
    registerService<R extends Resource>(clase: Service): Service<R> | false;
    getResourceService(type: string): Service | undefined;
    getResourceServiceOrFail(type: string): Service;
    static removeCachedResource(resource_type: string, resource_id: string): void;
    static setCachedResource(resource: Resource): void;
    static deprecateCachedCollections(type: string): void;
    refreshLoadings(factor: number): void;
    clearCache(): Promise<boolean>;
    duplicateResource<R extends Resource>(resource: R, ...relations_alias_to_duplicate_too: Array<string>): R;
}
