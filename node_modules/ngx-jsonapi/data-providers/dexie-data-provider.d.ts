import { IDataProvider, IObject, IElement } from './data-provider';
export declare class DexieDataProvider implements IDataProvider {
    private static db;
    constructor();
    getElement(key: string, table_name?: string): Promise<IObject | Array<IObject>>;
    getElements(keys: Array<string>, table_name?: string): Promise<Array<IObject>>;
    updateElements(key_start_with: string, changes: IObject, table_name?: string): Promise<void>;
    saveElements(elements: Array<IElement>, table_name?: string): Promise<void>;
}
