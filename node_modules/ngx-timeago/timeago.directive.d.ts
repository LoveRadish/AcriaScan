import { ElementRef, OnChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { TimeagoClock } from './timeago.clock';
import { TimeagoFormatter } from './timeago.formatter';
import { TimeagoIntl } from './timeago.intl';
export declare class TimeagoDirective implements OnChanges, OnDestroy {
    private cd;
    private clock;
    private intlSubscription;
    private clockSubscription;
    /**
     * Emits on:
     * - Input change
     * - Intl change
     * - Clock tick
    */
    stateChanges: Subject<any>;
    /** The Date to display. An actual Date object or something that can be fed to new Date. */
    date: any;
    private _date;
    /** If the directive should update itself over time */
    live: boolean;
    private _live;
    constructor(intl: TimeagoIntl, cd: ChangeDetectorRef, formatter: TimeagoFormatter, element: ElementRef, clock: TimeagoClock);
    ngOnChanges(): void;
    setContent(node: any, content: string): void;
    ngOnDestroy(): void;
}
