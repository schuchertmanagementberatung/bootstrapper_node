"use strict";
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
        return this.nconf.get(configNamespace);
    }
}
exports.ConfigResolver = ConfigResolver;

//# sourceMappingURL=config_resolver.js.map
