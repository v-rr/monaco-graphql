import { GraphQLWorker } from './GraphQLWorker';
import type { LanguageServiceAPI } from './api';
import type { Uri, Position, Thenable, CancellationToken, IRange } from 'monaco-editor';
import * as monaco from 'monaco-editor';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { CompletionItemKind as lsCompletionItemKind } from 'vscode-languageserver-types';
import { CompletionItem as GraphQLCompletionItem } from 'graphql-language-service';
export interface WorkerAccessor {
    (...more: Uri[]): Thenable<GraphQLWorker>;
}
export declare class DiagnosticsAdapter {
    private defaults;
    private _worker;
    private _disposables;
    private _listener;
    constructor(defaults: LanguageServiceAPI, _worker: WorkerAccessor);
    dispose(): void;
    private _doValidate;
}
export declare function toCompletionItemKind(kind: lsCompletionItemKind): monaco.languages.CompletionItemKind.Method | monaco.languages.CompletionItemKind.Function | monaco.languages.CompletionItemKind.Constructor | monaco.languages.CompletionItemKind.Field | monaco.languages.CompletionItemKind.Variable | monaco.languages.CompletionItemKind.Class | monaco.languages.CompletionItemKind.Struct | monaco.languages.CompletionItemKind.Interface | monaco.languages.CompletionItemKind.Module | monaco.languages.CompletionItemKind.Property | monaco.languages.CompletionItemKind.Event | monaco.languages.CompletionItemKind.Operator | monaco.languages.CompletionItemKind.Unit | monaco.languages.CompletionItemKind.Value | monaco.languages.CompletionItemKind.Constant | monaco.languages.CompletionItemKind.Enum | monaco.languages.CompletionItemKind.EnumMember | monaco.languages.CompletionItemKind.Keyword | monaco.languages.CompletionItemKind.Text | monaco.languages.CompletionItemKind.Color | monaco.languages.CompletionItemKind.File | monaco.languages.CompletionItemKind.Reference | monaco.languages.CompletionItemKind.Folder | monaco.languages.CompletionItemKind.TypeParameter | monaco.languages.CompletionItemKind.Snippet;
export declare function toCompletion(entry: GraphQLCompletionItem & {
    range: IRange;
}): monaco.languages.CompletionItem;
export declare class CompletionAdapter implements monaco.languages.CompletionItemProvider {
    private _worker;
    constructor(_worker: WorkerAccessor);
    get triggerCharacters(): string[];
    provideCompletionItems(model: editor.IReadOnlyModel, position: Position, _context: monaco.languages.CompletionContext, _token: CancellationToken): Promise<monaco.languages.CompletionList>;
}
export declare class DocumentFormattingAdapter implements monaco.languages.DocumentFormattingEditProvider {
    private _worker;
    constructor(_worker: WorkerAccessor);
    provideDocumentFormattingEdits(document: editor.ITextModel, _options: monaco.languages.FormattingOptions, _token: CancellationToken): Promise<{
        range: monaco.Range;
        text: string;
    }[]>;
}
export declare class HoverAdapter implements monaco.languages.HoverProvider {
    private _worker;
    constructor(_worker: WorkerAccessor);
    provideHover(model: editor.IReadOnlyModel, position: Position, _token: CancellationToken): Promise<monaco.languages.Hover>;
    dispose(): void;
}
//# sourceMappingURL=languageFeatures.d.ts.map