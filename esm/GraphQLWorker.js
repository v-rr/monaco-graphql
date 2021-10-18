var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getRange, LanguageService } from 'graphql-language-service';
import { toGraphQLPosition, toMonacoRange, toMarkerData, toCompletion, } from './utils';
export class GraphQLWorker {
    constructor(ctx, createData) {
        this._ctx = ctx;
        this._languageService = new LanguageService(createData.languageConfig);
        this._formattingOptions = createData.formattingOptions;
    }
    getSchemaResponse(_uri) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._languageService.getSchemaResponse();
        });
    }
    setSchema(schema) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._languageService.setSchema(schema);
        });
    }
    loadSchema(_uri) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._languageService.getSchema();
        });
    }
    doValidation(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = this._getTextDocument(uri);
            const graphqlDiagnostics = yield this._languageService.getDiagnostics(uri, document);
            return graphqlDiagnostics.map(toMarkerData);
        });
    }
    doComplete(uri, position) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = this._getTextDocument(uri);
            const graphQLPosition = toGraphQLPosition(position);
            const suggestions = yield this._languageService.getCompletion(uri, document, graphQLPosition);
            return suggestions.map(suggestion => toCompletion(suggestion));
        });
    }
    doHover(uri, position) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = this._getTextDocument(uri);
            const graphQLPosition = toGraphQLPosition(position);
            const hover = yield this._languageService.getHover(uri, document, graphQLPosition);
            return {
                content: hover,
                range: toMonacoRange(getRange({
                    column: graphQLPosition.character,
                    line: graphQLPosition.line,
                }, document)),
            };
        });
    }
    doFormat(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const prettierStandalone = yield import('prettier/standalone');
            const prettierGraphqlParser = yield import('prettier/parser-graphql');
            return prettierStandalone.format(text, Object.assign(Object.assign({}, this._formattingOptions), { parser: 'graphql', plugins: [prettierGraphqlParser] }));
        });
    }
    doParse(text) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._languageService.parse(text);
        });
    }
    _getTextDocument(_uri) {
        const models = this._ctx.getMirrorModels();
        if (models.length > 0) {
            return models[0].getValue();
        }
        return '';
    }
}
export default {
    GraphQLWorker,
};
export function create(ctx, createData) {
    return new GraphQLWorker(ctx, createData);
}
//# sourceMappingURL=GraphQLWorker.js.map