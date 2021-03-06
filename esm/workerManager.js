var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { editor as monacoEditor } from 'monaco-editor';
const STOP_WHEN_IDLE_FOR = 2 * 60 * 1000;
export class WorkerManager {
    constructor(defaults) {
        this._defaults = defaults;
        this._worker = null;
        this._idleCheckInterval = setInterval(() => this._checkIfIdle(), 30 * 1000);
        this._lastUsedTime = 0;
        this._configChangeListener = this._defaults.onDidChange(() => this._stopWorker());
        this._client = null;
    }
    _stopWorker() {
        if (this._worker) {
            this._worker.dispose();
            this._worker = null;
        }
        this._client = null;
    }
    dispose() {
        clearInterval(this._idleCheckInterval);
        this._configChangeListener.dispose();
        this._stopWorker();
    }
    _checkIfIdle() {
        if (!this._worker) {
            return;
        }
        const timePassedSinceLastUsed = Date.now() - this._lastUsedTime;
        if (timePassedSinceLastUsed > STOP_WHEN_IDLE_FOR) {
            this._stopWorker();
        }
    }
    _getClient() {
        return __awaiter(this, void 0, void 0, function* () {
            this._lastUsedTime = Date.now();
            if (!this._client) {
                this._worker = monacoEditor.createWebWorker({
                    moduleId: '/node_modules/monaco-graphql/esm/GraphQLWorker.js',
                    label: this._defaults.languageId,
                    createData: {
                        languageId: this._defaults.languageId,
                        formattingOptions: this._defaults.formattingOptions,
                        languageConfig: {
                            schemaString: this._defaults.schemaString,
                            schemaConfig: this._defaults.schemaConfig,
                            exteralFragmentDefinitions: this._defaults
                                .externalFragmentDefinitions,
                        },
                    },
                });
                try {
                    this._client = yield this._worker.getProxy();
                }
                catch (error) {
                }
            }
            return this._client;
        });
    }
    getLanguageServiceWorker(...resources) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this._getClient();
            yield this._worker.withSyncedResources(resources);
            return client;
        });
    }
}
//# sourceMappingURL=workerManager.js.map