import * as monaco from 'monaco-editor';
import { WorkerManager } from './workerManager';
import { language as monarchLanguage } from 'monaco-editor/esm/vs/basic-languages/graphql/graphql';
import * as languageFeatures from './languageFeatures';
export function setupMode(defaults) {
    const disposables = [];
    const providers = [];
    const client = new WorkerManager(defaults);
    const { languageId } = defaults;
    disposables.push(client);
    const worker = (...uris) => {
        try {
            return client.getLanguageServiceWorker(...uris);
        }
        catch (err) {
            throw Error('Error fetching graphql language service worker');
        }
    };
    defaults.setWorker(worker);
    monaco.languages.setLanguageConfiguration(languageId, richLanguageConfig);
    monaco.languages.setMonarchTokensProvider(languageId, monarchLanguage);
    function registerFormattingProvider() {
        const { modeConfiguration } = defaults;
        if (modeConfiguration.documentFormattingEdits) {
            providers.push(monaco.languages.registerDocumentFormattingEditProvider(defaults.languageId, new languageFeatures.DocumentFormattingAdapter(worker)));
        }
    }
    function registerProviders() {
        const { modeConfiguration } = defaults;
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
    let { modeConfiguration, schemaConfig, formattingOptions } = defaults;
    defaults.onDidChange(newDefaults => {
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
function asDisposable(disposables) {
    return { dispose: () => disposeAll(disposables) };
}
function disposeAll(disposables) {
    var _a;
    while (disposables.length) {
        (_a = disposables.pop()) === null || _a === void 0 ? void 0 : _a.dispose();
    }
}
export const richLanguageConfig = {
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