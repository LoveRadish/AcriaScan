import { TimeagoIntl } from './timeago.intl';
export declare type Unit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
export declare type Suffix = 'ago' | 'from now';
export declare type StringOrFn = ((value: number, millisDelta: number) => string) | string;
export declare type NumberArray = [string, string, string, string, string, string, string, string, string, string];
export declare abstract class TimeagoFormatter {
    abstract format(then: number): string;
}
export declare class TimeagoDefaultFormatter extends TimeagoFormatter {
    format(then: number): string;
    private parse(value, unit, suffix);
}
export declare class TimeagoCustomFormatter extends TimeagoFormatter {
    private intl;
    constructor(intl: TimeagoIntl);
    format(then: number): string;
    private parse(value, unit, suffix, now, then);
    /**
     * If the numbers array is present, format numbers with it,
     * otherwise just cast the number to a string and return it
    */
    private normalizeNumber(numbers, value);
    /**
     * Take a string or a function that takes number of days and returns a string
     * and provide a uniform API to create string parts
    */
    private normalizeFn(value, millisDelta, numbers?);
}
