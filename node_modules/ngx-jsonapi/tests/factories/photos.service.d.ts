import { Resource } from '../../resource';
import { Service } from '../../service';
export declare class Photo extends Resource {
    attributes: {
        title: string;
        uri: string;
        imageable_id: string;
        created_at: Date;
        updated_at: Date;
    };
    type: string;
    ttl: number;
    static test_ttl: any;
    constructor();
}
export declare class PhotosService extends Service<Photo> {
    constructor();
    resource: typeof Photo;
    type: string;
}
