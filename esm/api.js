var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Emitter } from 'monaco-editor';
import { printSchema, } from 'graphql';
export class LanguageServiceAPI {
    constructor({ languageId, schemaConfig, modeConfiguration, formattingOptions, }) {
        this._onDidChange = new Emitter();
        this._schemaConfig = {};
        this._resolveWorkerPromise = () => { };
        this._schemaString = null;
        this._externalFragmentDefinitions = null;
        this._worker = null;
        this._workerPromise = new Promise(resolve => {
            this._resolveWorkerPromise = resolve;
        });
        this._languageId = languageId;
        if (schemaConfig && schemaConfig.uri) {
            this.setSchemaConfig(schemaConfig);
        }
        this.setModeConfiguration(modeConfiguration);
        this.setFormattingOptions(formattingOptions);
        this.setFormattingOptions(formattingOptions);
    }
    get onDidChange() {
        return this._onDidChange.event;
    }
    get languageId() {
        return this._languageId;
    }
    get modeConfiguration() {
        return this._modeConfiguration;
    }
    get schemaConfig() {
        return this._schemaConfig;
    }
    get formattingOptions() {
        return this._formattingOptions;
    }
    get externalFragmentDefinitions() {
        return this._externalFragmentDefinitions;
    }
    get hasSchema() {
        return Boolean(this._schemaString);
    }
    get schemaString() {
        return this._schemaString;
    }
    get worker() {
        if (this._worker) {
            return Promise.resolve(this._worker);
        }
        return this._workerPromise;
    }
    setWorker(worker) {
        this._worker = worker;
        this._resolveWorkerPromise(worker);
    }
    getSchema() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._schemaString) {
                return this._schemaString;
            }
            const langWorker = yield (yield this.worker)();
            return langWorker.getSchemaResponse();
        });
    }
    setSchema(schema) {
        return __awaiter(this, void 0, void 0, function* () {
            let rawSchema = schema;
            if (typeof schema !== 'string') {
                rawSchema = printSchema(schema, { commentDescriptions: true });
            }
            this._schemaString = rawSchema;
            const langWorker = yield (yield this.worker)();
            yield langWorker.setSchema(rawSchema);
            this._onDidChange.fire(this);
        });
    }
    parse(graphqlString) {
        return __awaiter(this, void 0, void 0, function* () {
            const langWorker = yield (yield this.worker)();
            return langWorker.doParse(graphqlString);
        });
    }
    setSchemaConfig(options) {
        this._schemaConfig = options || Object.create(null);
        this._onDidChange.fire(this);
    }
    updateSchemaConfig(options) {
        this._schemaConfig = Object.assign(Object.assign({}, this._schemaConfig), options);
        this._onDidChange.fire(this);
    }
    setExternalFragmentDefinitions(externalFragmentDefinitions) {
        this._externalFragmentDefinitions = externalFragmentDefinitions;
    }
    setSchemaUri(schemaUri) {
        this.setSchemaConfig(Object.assign(Object.assign({}, this._schemaConfig), { uri: schemaUri }));
    }
    setModeConfiguration(modeConfiguration) {
        this._modeConfiguration = modeConfiguration || Object.create(null);
        this._onDidChange.fire(this);
    }
    setFormattingOptions(formattingOptions) {
        this._formattingOptions = formattingOptions || Object.create(null);
        this._onDidChange.fire(this);
    }
}
export const modeConfigurationDefault = {
    documentFormattingEdits: true,
    documentRangeFormattingEdits: false,
    completionItems: true,
    hovers: true,
    documentSymbols: false,
    tokens: false,
    colors: false,
    foldingRanges: false,
    diagnostics: true,
    selectionRanges: false,
};
export const schemaDefault = {};
export const formattingDefaults = {
    prettierConfig: {
        tabWidth: 2,
    },
};
//# sourceMappingURL=api.js.map