import {Container} from 'addict-ioc';
import {ExtensionBootstrapper} from '@process-engine-js/bootstrapper';
import {IFactory, ExtensionDiscoveryTag as extensionDiscoveryTag} from '@process-engine-js/core_contracts';
import {ConfigResolver} from './config_resolver';
import * as path from 'path';
import * as nconf from 'nconf';

export class AppBootstrapper {

  private _container: Container;
  private _appRoot: string = process.cwd();
  private _env: string = process.env.NODE_ENV || 'development';
  private _configPath: string = process.env.CONFIG_PATH || path.resolve(this._appRoot, 'config');
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

  private initializeConfigProvider() {

    require('nconfetti'); // eslint-disable-line

    nconf.argv()
      .env('__');

    nconf.use('Nconfetti', {path: this.configPath, env: this.env});

    this.container.settings.resolver = new ConfigResolver(nconf);
  }

  public async initialize(): Promise<void> {
    if (!this.isInitialized) {
      this.initializeLogging();

      this.initializeConfigProvider();

      await this.extensionBootstrapper.initialize();
      this.isInitialized = true;
    }
  }

  public async start(): Promise<void> {

    await this.initialize();
    await this.extensionBootstrapper.start();

  }

}
