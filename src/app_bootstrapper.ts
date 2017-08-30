import {Container, IInstanceWrapper, IFactoryAsync} from 'addict-ioc';
import {ExtensionBootstrapper} from '@process-engine-js/bootstrapper';
import {ExtensionDiscoveryTag as extensionDiscoveryTag} from '@process-engine-js/core_contracts';
import {ConfigResolver} from './config_resolver';
import * as path from 'path';
import * as nconf from 'nconf';

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

  private initializeConfigProvider() {

    require('nconfetti'); // eslint-disable-line

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
