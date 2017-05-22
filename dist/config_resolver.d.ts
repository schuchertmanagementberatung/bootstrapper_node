import { Resolver } from 'addict-ioc';
export declare class ConfigResolver extends Resolver {
    private _nconf;
    constructor(nconf: any);
    readonly nconf: any;
    resolveConfig(configNamespace: any): any;
}
