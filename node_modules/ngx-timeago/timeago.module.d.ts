import { ModuleWithProviders, Provider } from '@angular/core';
export interface TimeagoModuleConfig {
    clock?: Provider;
    intl?: Provider;
    formatter?: Provider;
}
export declare class TimeagoModule {
    /**
     * Use this method in your root module to provide the TimeagoModule
     */
    static forRoot(config?: TimeagoModuleConfig): ModuleWithProviders;
    /**
     * Use this method in your other (non root) modules to import the directive/pipe
     */
    static forChild(config?: TimeagoModuleConfig): ModuleWithProviders;
}
