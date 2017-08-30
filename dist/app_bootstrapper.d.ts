import { Container, IInstanceWrapper, IFactoryAsync } from 'addict-ioc';
import { ExtensionBootstrapper } from '@process-engine-js/bootstrapper';
export declare class AppBootstrapper {
    private _container;
    private _appRoot;
    private _env;
    private _configPath;
    private extensionBootstrapperFactory;
    private extensionBootstrapper;
    constructor(_container: Container<IInstanceWrapper<any>>, extensionBootstrapperFactory: IFactoryAsync<ExtensionBootstrapper>, appRoot?: string);
    readonly appRoot: string;
    protected readonly container: Container<IInstanceWrapper<any>>;
    readonly env: string;
    readonly configPath: string;
    private initializeConfigProvider();
    initialize(): Promise<void>;
    start(): Promise<void>;
}
