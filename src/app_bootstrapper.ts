import {DependencyInjectionContainer as Container} from 'addict-ioc';
import {configureAddictIocWithNconf as configureAddictIocWithNconf} from 'addict-ioc-nconf';
import {ExtensionBootstrapper} from '@process-engine-js/bootstrapper';
import {IFactory, ExtensionDiscoveryTag as extensionDiscoveryTag} from '@process-engine-js/core_contracts';
import * as path from 'path';

export class AppBootstrapper {

  private _container: Container;
  private _appRoot: string = process.cwd();
  private _env: string = process.env.NODE_ENV || 'development';
  private _configPath: string = process.env.CONFIG_PATH || this._appRoot;
  private _extensionBootstrapper: ExtensionBootstrapper;
  private _isInitialized: boolean = false;

  constructor(_container: Container,
              extensionBootstrapperLazy: IFactory<ExtensionBootstrapper>,
              appRoot?: string) {
    this._container = _container;
    if (appRoot) {
      this._appRoot = path.normalize(appRoot);
    }
    this._extensionBootstrapper = extensionBootstrapperLazy([extensionDiscoveryTag]);
    this.container.registerObject('appBootstrapper', this);

  }

  protected get isInitialized(): boolean {
    return this._isInitialized;
  }

  protected set isInitialized(initialize: boolean) {
    this._isInitialized = initialize;
  }

  public get appRoot(): string {
    return this._appRoot;
  }

  protected get container(): Container {
    return this._container;
  }

  protected get extensionBootstrapper(): ExtensionBootstrapper {
    return this._extensionBootstrapper;
  }

  public get env(): string {
    return this._env;
  }

  public get configPath(): string {
    return this._configPath;
  }

  protected initializeLogging(): void {
  }

  public async initialize(): Promise<void> {
    if (!this.isInitialized) {
      this.initializeLogging();

      configureAddictIocWithNconf(this.container, {configPath: this.configPath, env: this.env});

      await this.extensionBootstrapper.initialize();
      this.isInitialized = true;
    }
  }

  public async start(): Promise<void> {

    await this.initialize();
    await this.extensionBootstrapper.start();

  }

}
