var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LanguageServiceAPI, schemaDefault, formattingDefaults, modeConfigurationDefault, } from './api';
import * as monaco from 'monaco-editor';
export * from './typings';
export const LANGUAGE_ID = 'graphqlDev';
monaco.languages.register({
    id: LANGUAGE_ID,
    extensions: ['.graphql', '.gql'],
    aliases: ['graphql'],
    mimetypes: ['application/graphql', 'text/graphql'],
});
export const api = new LanguageServiceAPI({
    languageId: LANGUAGE_ID,
    schemaConfig: schemaDefault,
    formattingOptions: formattingDefaults,
    modeConfiguration: modeConfigurationDefault,
});
monaco.languages.onLanguage(LANGUAGE_ID, () => __awaiter(void 0, void 0, void 0, function* () {
    const graphqlMode = yield getMode();
    graphqlMode.setupMode(api);
}));
function getMode() {
    return import('./graphqlMode');
}
//# sourceMappingURL=monaco.contribution.js.map