import { Resource } from '../../resource';
import { DocumentCollection } from '../../document-collection';
import { Service } from '../../service';
import { Book } from './books.service';
import { Photo } from './photos.service';
export declare class Author extends Resource {
    attributes: {
        name: string;
        date_of_birth: Date;
        date_of_death: Date;
        created_at: Date;
        updated_at: Date;
    };
    relationships: {
        books: DocumentCollection<Book>;
        photos: DocumentCollection<Photo>;
    };
    type: string;
    ttl: number;
    static test_ttl: any;
    constructor();
}
export declare class AuthorsService extends Service<Author> {
    constructor();
    resource: typeof Author;
    type: string;
    collections_ttl: number;
}
