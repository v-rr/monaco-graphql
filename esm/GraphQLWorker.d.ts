import { ICreateData } from './typings';
import type { worker, editor, Position, IRange } from 'monaco-editor';
import * as monaco from 'monaco-editor';
import type { SchemaResponse, CompletionItem as GraphQLCompletionItem } from 'graphql-language-service';
import type { GraphQLSchema, DocumentNode } from 'graphql';
export declare type MonacoCompletionItem = monaco.languages.CompletionItem & {
    isDeprecated?: boolean;
    deprecationReason?: string | null;
};
export declare class GraphQLWorker {
    private _ctx;
    private _languageService;
    private _formattingOptions;
    constructor(ctx: worker.IWorkerContext, createData: ICreateData);
    getSchemaResponse(_uri?: string): Promise<SchemaResponse | null>;
    setSchema(schema: string): Promise<void>;
    loadSchema(_uri?: string): Promise<GraphQLSchema | null>;
    doValidation(uri: string): Promise<editor.IMarkerData[]>;
    doComplete(uri: string, position: Position): Promise<(GraphQLCompletionItem & {
        range: IRange;
    })[]>;
    doHover(uri: string, position: Position): Promise<{
        content: string | import("vscode-languageserver-types").MarkupContent | {
            language: string;
            value: string;
        } | import("vscode-languageserver-types").MarkedString[];
        range: globalThis.monaco.IRange;
    }>;
    doFormat(text: string): Promise<string>;
    doParse(text: string): Promise<DocumentNode>;
    private _getTextDocument;
}
declare const _default: {
    GraphQLWorker: typeof GraphQLWorker;
};
export default _default;
export declare function create(ctx: worker.IWorkerContext, createData: ICreateData): GraphQLWorker;
//# sourceMappingURL=GraphQLWorker.d.ts.map