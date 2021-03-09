import { Resource } from '../../resource';
import { DocumentCollection } from '../../document-collection';
import { DocumentResource } from '../../document-resource';
import { Service } from '../../service';
import { Author } from './authors.service';
import { Photo } from './photos.service';
export declare class Book extends Resource {
    attributes: {
        date_published: Date;
        title: string;
        created_at: Date;
        updated_at: Date;
    };
    relationships: {
        author: DocumentResource<Author>;
        photos: DocumentCollection<Photo>;
    };
    type: string;
    ttl: number;
    static test_ttl: any;
    constructor();
}
export declare class BooksService extends Service<Book> {
    constructor();
    type: string;
    resource: typeof Book;
    collections_ttl: number;
}
