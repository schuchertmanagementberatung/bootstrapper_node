"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addict_ioc_1 = require("addict-ioc");
class ConfigResolver extends addict_ioc_1.Resolver {
    constructor(nconf) {
        super();
        this._nconf = undefined;
        this._nconf = nconf;
    }
    get nconf() {
        return this._nconf;
    }
    resolveConfig(configNamespace) {
        const configType = typeof configNamespace;
        switch (configType) {
            case 'function':
                return configNamespace();
            case 'object':
                return configNamespace;
            case 'string':
                return this.nconf.get(configNamespace);
            default:
                return undefined;
        }
    }
}
exports.ConfigResolver = ConfigResolver;

//# sourceMappingURL=config_resolver.js.map