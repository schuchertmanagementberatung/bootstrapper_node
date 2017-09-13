import {IInstanceWrapper, Resolver} from 'addict-ioc';

export class ConfigResolver extends Resolver<any, IInstanceWrapper<any>> {

  private _nconf: any = undefined;

  constructor(nconf: any) {
    super();
    this._nconf = nconf;
  }

  public get nconf(): any {
    return this._nconf;
  }

  public resolveConfig(configNamespace: Function | {} | string): any {

    const configType: string = typeof configNamespace;

    switch (configType) {
      case 'function':
        return (configNamespace as Function)();
      case 'object':
        return configNamespace;
      case 'string':
        return this.nconf.get(configNamespace);
      default:
        return undefined;
    }
  }
}
