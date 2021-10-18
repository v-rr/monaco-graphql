"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.richLanguageConfig = exports.setupMode = void 0;
var monaco = __importStar(require("monaco-editor"));
var workerManager_1 = require("./workerManager");
var graphql_1 = require("monaco-editor/esm/vs/basic-languages/graphql/graphql");
var languageFeatures = __importStar(require("./languageFeatures"));
function setupMode(defaults) {
    var disposables = [];
    var providers = [];
    var client = new workerManager_1.WorkerManager(defaults);
    var languageId = defaults.languageId;
    disposables.push(client);
    var worker = function () {
        var uris = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uris[_i] = arguments[_i];
        }
        try {
            return client.getLanguageServiceWorker.apply(client, __spread(uris));
        }
        catch (err) {
            throw Error('Error fetching graphql language service worker');
        }
    };
    defaults.setWorker(worker);
    monaco.languages.setLanguageConfiguration(languageId, exports.richLanguageConfig);
    monaco.languages.setMonarchTokensProvider(languageId, graphql_1.language);
    function registerFormattingProvider() {
        var modeConfiguration = defaults.modeConfiguration;
        if (modeConfiguration.documentFormattingEdits) {
            providers.push(monaco.languages.registerDocumentFormattingEditProvider(defaults.languageId, new languageFeatures.DocumentFormattingAdapter(worker)));
        }
    }
    function registerProviders() {
        var modeConfiguration = defaults.modeConfiguration;
        disposeAll(providers);
        if (modeConfiguration.completionItems) {
            providers.push(monaco.languages.registerCompletionItemProvider(defaults.languageId, new languageFeatures.CompletionAdapter(worker)));
        }
        if (modeConfiguration.diagnostics) {
            providers.push(new languageFeatures.DiagnosticsAdapter(defaults, worker));
        }
        if (modeConfiguration.hovers) {
            providers.push(monaco.languages.registerHoverProvider(defaults.languageId, new languageFeatures.HoverAdapter(worker)));
        }
        registerFormattingProvider();
    }
    registerProviders();
    var modeConfiguration = defaults.modeConfiguration, schemaConfig = defaults.schemaConfig, formattingOptions = defaults.formattingOptions;
    defaults.onDidChange(function (newDefaults) {
        if (defaults.schemaString !== newDefaults.schemaString) {
            registerProviders();
        }
        if (newDefaults.modeConfiguration !== modeConfiguration) {
            modeConfiguration = newDefaults.modeConfiguration;
            registerProviders();
        }
        if (newDefaults.schemaConfig !== schemaConfig) {
            schemaConfig = newDefaults.schemaConfig;
            registerProviders();
        }
        if (newDefaults.formattingOptions !== formattingOptions) {
            formattingOptions = newDefaults.formattingOptions;
            registerFormattingProvider();
        }
    });
    disposables.push(asDisposable(providers));
    return asDisposable(disposables);
}
exports.setupMode = setupMode;
function asDisposable(disposables) {
    return { dispose: function () { return disposeAll(disposables); } };
}
function disposeAll(disposables) {
    var _a;
    while (disposables.length) {
        (_a = disposables.pop()) === null || _a === void 0 ? void 0 : _a.dispose();
    }
}
exports.richLanguageConfig = {
    comments: {
        lineComment: '#',
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
    ],
    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"""', close: '"""', notIn: ['string', 'comment'] },
        { open: '"', close: '"', notIn: ['string', 'comment'] },
    ],
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"""', close: '"""' },
        { open: '"', close: '"' },
    ],
    folding: {
        offSide: true,
    },
};
//# sourceMappingURL=graphqlMode.js.map