"use strict";
const core_contracts_1 = require("@process-engine-js/core_contracts");
const config_resolver_1 = require("./config_resolver");
const path = require("path");
const nconf = require("nconf");
class AppBootstrapper {
    constructor(_container, extensionBootstrapperLazy, appRoot) {
        this._appRoot = process.cwd();
        this._env = process.env.NODE_ENV || 'development';
        this._configPath = process.env.CONFIG_PATH || this._appRoot;
        this._isInitialized = false;
        this._container = _container;
        if (appRoot) {
            this._appRoot = path.normalize(appRoot);
        }
        this._extensionBootstrapper = extensionBootstrapperLazy([core_contracts_1.ExtensionDiscoveryTag]);
        this.container.registerObject('appBootstrapper', this);
    }
    get isInitialized() {
        return this._isInitialized;
    }
    set isInitialized(initialize) {
        this._isInitialized = initialize;
    }
    get appRoot() {
        return this._appRoot;
    }
    get container() {
        return this._container;
    }
    get extensionBootstrapper() {
        return this._extensionBootstrapper;
    }
    get env() {
        return this._env;
    }
    get configPath() {
        return this._configPath;
    }
    initializeLogging() {
    }
    initializeConfigProvider() {
        require('nconfetti');
        nconf.argv()
            .env('__');
        nconf.use('Nconfetti', { path: this.configPath, env: this.env });
        this.container.settings.resolver = new config_resolver_1.ConfigResolver(nconf);
    }
    async initialize() {
        if (!this.isInitialized) {
            this.initializeLogging();
            this.initializeConfigProvider();
            await this.extensionBootstrapper.initialize();
            this.isInitialized = true;
        }
    }
    async start() {
        await this.initialize();
        await this.extensionBootstrapper.start();
    }
}
exports.AppBootstrapper = AppBootstrapper;

//# sourceMappingURL=app_bootstrapper.js.map
