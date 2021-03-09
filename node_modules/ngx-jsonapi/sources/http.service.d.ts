import { IDocumentResource } from '../interfaces/data-object';
import { HttpClient } from '@angular/common/http';
import { JsonapiConfig } from '../jsonapi-config';
import { Observable } from 'rxjs';
import { IDocumentData } from '../interfaces/document';
export declare class Http {
    private http;
    private rsJsonapiConfig;
    get_requests: {
        [key: string]: Observable<IDocumentData>;
    };
    constructor(http: HttpClient, rsJsonapiConfig: JsonapiConfig);
    exec(path: string, method: string, data?: IDocumentResource): Observable<IDocumentData>;
}
