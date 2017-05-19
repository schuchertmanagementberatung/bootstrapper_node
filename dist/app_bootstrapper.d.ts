import { Container } from 'addict-ioc';
import { ExtensionBootstrapper } from '@process-engine-js/bootstrapper';
import { IFactory } from '@process-engine-js/core_contracts';
export declare class AppBootstrapper {
    private _container;
    private _appRoot;
    private _env;
    private _configPath;
    private _extensionBootstrapper;
    private _isInitialized;
    constructor(_container: Container, extensionBootstrapperLazy: IFactory<ExtensionBootstrapper>, appRoot?: string);
    protected isInitialized: boolean;
    readonly appRoot: string;
    protected readonly container: Container;
    protected readonly extensionBootstrapper: ExtensionBootstrapper;
    readonly env: string;
    readonly configPath: string;
    protected initializeLogging(): void;
    private initializeConfigProvider();
    initialize(): Promise<void>;
    start(): Promise<void>;
}
