import {ExtensionBootstrapper} from '@essential-projects/bootstrapper';
import {ExtensionDiscoveryTag as extensionDiscoveryTag} from '@essential-projects/core_contracts';
import {Container, IFactoryAsync, IInstanceWrapper} from 'addict-ioc';
import * as nconf from 'nconf';
import * as path from 'path';
import {ConfigResolver} from './config_resolver';

export class AppBootstrapper {

  private _container: Container<IInstanceWrapper<any>>;
  private _appRoot: string = process.cwd();
  private _env: string = process.env.NODE_ENV || 'development';
  private _configPath: string = process.env.CONFIG_PATH || path.resolve(this._appRoot, 'config');
  private extensionBootstrapperFactory: IFactoryAsync<ExtensionBootstrapper>;
  private extensionBootstrapper: ExtensionBootstrapper;

  constructor(_container: Container<IInstanceWrapper<any>>,
              extensionBootstrapperFactory: IFactoryAsync<ExtensionBootstrapper>,
              appRoot?: string) {
    this._container = _container;
    this.extensionBootstrapperFactory = extensionBootstrapperFactory;
    if (appRoot) {
      this._appRoot = path.normalize(appRoot);
    }
  }

  public get appRoot(): string {
    return this._appRoot;
  }

  protected get container(): Container<IInstanceWrapper<any>> {
    return this._container;
  }

  public get env(): string {
    return this._env;
  }

  public get configPath(): string {
    return this._configPath;
  }

  private initializeConfigProvider(): void {

    require('nconfetti'); // tslint:disable-line

    nconf.argv()
      .env('__');

    nconf.use('Nconfetti', {path: this.configPath, env: this.env});

    this.container.settings.resolver = new ConfigResolver(nconf);
  }

  public async initialize(): Promise<void> {
    this.extensionBootstrapper = await this.extensionBootstrapperFactory([extensionDiscoveryTag]);

    this.initializeConfigProvider();
  }

  public async start(): Promise<void> {
    await this.extensionBootstrapper.start();
  }

}
