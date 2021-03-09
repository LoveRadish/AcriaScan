import { ICacheableDataCollection } from './../interfaces/data-collection';
import { ICacheableDataResource } from './../interfaces/data-resource';
import { IDataResource } from '../interfaces/data-resource';
import { IObjectsById } from '../interfaces';
export declare class StoreService {
    private db;
    constructor();
    getDataObject(type: 'collection', url: string): Promise<ICacheableDataCollection>;
    getDataObject(type: string, id: string): Promise<ICacheableDataResource>;
    getDataResources(keys: Array<string>): Promise<IObjectsById<ICacheableDataResource>>;
    saveResource(type: string, url_or_id: string, value: IDataResource): void;
    saveCollection(url_or_id: string, value: ICacheableDataCollection): void;
    clearCache(): void;
    deprecateResource(type: string, id: string): void;
    deprecateCollection(key_start_with: string): void;
    removeObjectsWithKey(key: string): Promise<void>;
    private checkIfIsTimeToClean;
    private checkAndDeleteOldElements;
}
