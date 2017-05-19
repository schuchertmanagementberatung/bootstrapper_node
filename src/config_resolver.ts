import { Resolver } from 'addict-ioc';

export class ConfigResolver extends Resolver {

  private _nconf: any = undefined;

  constructor(nconf: any) {
    super();
    this._nconf = nconf;
  }

  public get nconf(): any {
    return this._nconf;
  }

  resolveConfig(configNamespace) {
    return this.nconf.get(configNamespace);
  }
}