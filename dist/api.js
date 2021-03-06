"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formattingDefaults = exports.schemaDefault = exports.modeConfigurationDefault = exports.LanguageServiceAPI = void 0;
var monaco_editor_1 = require("monaco-editor");
var graphql_1 = require("graphql");
var LanguageServiceAPI = (function () {
    function LanguageServiceAPI(_a) {
        var _this = this;
        var languageId = _a.languageId, schemaConfig = _a.schemaConfig, modeConfiguration = _a.modeConfiguration, formattingOptions = _a.formattingOptions;
        this._onDidChange = new monaco_editor_1.Emitter();
        this._schemaConfig = {};
        this._resolveWorkerPromise = function () { };
        this._schemaString = null;
        this._externalFragmentDefinitions = null;
        this._worker = null;
        this._workerPromise = new Promise(function (resolve) {
            _this._resolveWorkerPromise = resolve;
        });
        this._languageId = languageId;
        if (schemaConfig && schemaConfig.uri) {
            this.setSchemaConfig(schemaConfig);
        }
        this.setModeConfiguration(modeConfiguration);
        this.setFormattingOptions(formattingOptions);
        this.setFormattingOptions(formattingOptions);
    }
    Object.defineProperty(LanguageServiceAPI.prototype, "onDidChange", {
        get: function () {
            return this._onDidChange.event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LanguageServiceAPI.prototype, "languageId", {
        get: function () {
            return this._languageId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LanguageServiceAPI.prototype, "modeConfiguration", {
        get: function () {
            return this._modeConfiguration;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LanguageServiceAPI.prototype, "schemaConfig", {
        get: function () {
            return this._schemaConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LanguageServiceAPI.prototype, "formattingOptions", {
        get: function () {
            return this._formattingOptions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LanguageServiceAPI.prototype, "externalFragmentDefinitions", {
        get: function () {
            return this._externalFragmentDefinitions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LanguageServiceAPI.prototype, "hasSchema", {
        get: function () {
            return Boolean(this._schemaString);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LanguageServiceAPI.prototype, "schemaString", {
        get: function () {
            return this._schemaString;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LanguageServiceAPI.prototype, "worker", {
        get: function () {
            if (this._worker) {
                return Promise.resolve(this._worker);
            }
            return this._workerPromise;
        },
        enumerable: false,
        configurable: true
    });
    LanguageServiceAPI.prototype.setWorker = function (worker) {
        this._worker = worker;
        this._resolveWorkerPromise(worker);
    };
    LanguageServiceAPI.prototype.getSchema = function () {
        return __awaiter(this, void 0, void 0, function () {
            var langWorker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._schemaString) {
                            return [2, this._schemaString];
                        }
                        return [4, this.worker];
                    case 1: return [4, (_a.sent())()];
                    case 2:
                        langWorker = _a.sent();
                        return [2, langWorker.getSchemaResponse()];
                }
            });
        });
    };
    LanguageServiceAPI.prototype.setSchema = function (schema) {
        return __awaiter(this, void 0, void 0, function () {
            var rawSchema, langWorker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rawSchema = schema;
                        if (typeof schema !== 'string') {
                            rawSchema = graphql_1.printSchema(schema, { commentDescriptions: true });
                        }
                        this._schemaString = rawSchema;
                        return [4, this.worker];
                    case 1: return [4, (_a.sent())()];
                    case 2:
                        langWorker = _a.sent();
                        return [4, langWorker.setSchema(rawSchema)];
                    case 3:
                        _a.sent();
                        this._onDidChange.fire(this);
                        return [2];
                }
            });
        });
    };
    LanguageServiceAPI.prototype.parse = function (graphqlString) {
        return __awaiter(this, void 0, void 0, function () {
            var langWorker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.worker];
                    case 1: return [4, (_a.sent())()];
                    case 2:
                        langWorker = _a.sent();
                        return [2, langWorker.doParse(graphqlString)];
                }
            });
        });
    };
    LanguageServiceAPI.prototype.setSchemaConfig = function (options) {
        this._schemaConfig = options || Object.create(null);
        this._onDidChange.fire(this);
    };
    LanguageServiceAPI.prototype.updateSchemaConfig = function (options) {
        this._schemaConfig = __assign(__assign({}, this._schemaConfig), options);
        this._onDidChange.fire(this);
    };
    LanguageServiceAPI.prototype.setExternalFragmentDefinitions = function (externalFragmentDefinitions) {
        this._externalFragmentDefinitions = externalFragmentDefinitions;
    };
    LanguageServiceAPI.prototype.setSchemaUri = function (schemaUri) {
        this.setSchemaConfig(__assign(__assign({}, this._schemaConfig), { uri: schemaUri }));
    };
    LanguageServiceAPI.prototype.setModeConfiguration = function (modeConfiguration) {
        this._modeConfiguration = modeConfiguration || Object.create(null);
        this._onDidChange.fire(this);
    };
    LanguageServiceAPI.prototype.setFormattingOptions = function (formattingOptions) {
        this._formattingOptions = formattingOptions || Object.create(null);
        this._onDidChange.fire(this);
    };
    return LanguageServiceAPI;
}());
exports.LanguageServiceAPI = LanguageServiceAPI;
exports.modeConfigurationDefault = {
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
exports.schemaDefault = {};
exports.formattingDefaults = {
    prettierConfig: {
        tabWidth: 2,
    },
};
//# sourceMappingURL=api.js.map