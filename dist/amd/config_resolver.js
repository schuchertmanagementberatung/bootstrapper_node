define(["require", "exports", "addict-ioc"], function (require, exports, addict_ioc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});

//# sourceMappingURL=config_resolver.js.map
