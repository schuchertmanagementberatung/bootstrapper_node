define(["require", "exports", "@process-engine-js/core_contracts", "./config_resolver", "path", "nconf"], function (require, exports, core_contracts_1, config_resolver_1, path, nconf) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AppBootstrapper {
        constructor(_container, extensionBootstrapperFactory, appRoot) {
            this._appRoot = process.cwd();
            this._env = process.env.NODE_ENV || 'development';
            this._configPath = process.env.CONFIG_PATH || path.resolve(this._appRoot, 'config');
            this._container = _container;
            this.extensionBootstrapperFactory = extensionBootstrapperFactory;
            if (appRoot) {
                this._appRoot = path.normalize(appRoot);
            }
        }
        get appRoot() {
            return this._appRoot;
        }
        get container() {
            return this._container;
        }
        get env() {
            return this._env;
        }
        get configPath() {
            return this._configPath;
        }
        initializeConfigProvider() {
            require('nconfetti');
            nconf.argv()
                .env('__');
            nconf.use('Nconfetti', { path: this.configPath, env: this.env });
            this.container.settings.resolver = new config_resolver_1.ConfigResolver(nconf);
        }
        async initialize() {
            this.extensionBootstrapper = await this.extensionBootstrapperFactory([core_contracts_1.ExtensionDiscoveryTag]);
            this.initializeConfigProvider();
        }
        async start() {
            await this.extensionBootstrapper.start();
        }
    }
    exports.AppBootstrapper = AppBootstrapper;
});

//# sourceMappingURL=app_bootstrapper.js.map
