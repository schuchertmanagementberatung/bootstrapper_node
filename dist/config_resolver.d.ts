import { IInstanceWrapper, Resolver } from 'addict-ioc';
export declare class ConfigResolver extends Resolver<any, IInstanceWrapper<any>> {
    private _nconf;
    constructor(nconf: any);
    readonly nconf: any;
    resolveConfig(configNamespace: any): any;
}
