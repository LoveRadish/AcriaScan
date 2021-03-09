import { OnDestroy, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { TimeagoClock } from './timeago.clock';
import { TimeagoFormatter } from './timeago.formatter';
import { TimeagoIntl } from './timeago.intl';
export declare class TimeagoPipe implements PipeTransform, OnDestroy {
    private clock;
    private intlSubscription;
    private clockSubscription;
    private date;
    private value;
    private live;
    /**
     * Emits on:
     * - Input change
     * - Intl change
     * - Clock tick
    */
    stateChanges: Subject<void>;
    constructor(intl: TimeagoIntl, cd: ChangeDetectorRef, formatter: TimeagoFormatter, clock: TimeagoClock);
    transform(date: any, ...args: any[]): string;
    ngOnDestroy(): void;
}
