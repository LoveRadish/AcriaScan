import { Observable } from 'rxjs';
export declare abstract class TimeagoClock {
    abstract tick(then: number): Observable<any>;
}
export declare class TimeagoDefaultClock extends TimeagoClock {
    tick(then: number): Observable<any>;
}
