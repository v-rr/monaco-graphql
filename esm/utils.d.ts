import type { IRange as GraphQLRange, IPosition as GraphQLPosition, Diagnostic, CompletionItem as GraphQLCompletionItem } from 'graphql-language-service';
export declare type MonacoCompletionItem = monaco.languages.CompletionItem & {
    isDeprecated?: boolean;
    deprecationReason?: string | null;
};
export declare function toMonacoRange(range: GraphQLRange): monaco.IRange;
export declare function toGraphQLPosition(position: monaco.Position): GraphQLPosition;
export declare function toCompletion(entry: GraphQLCompletionItem, range?: GraphQLRange): GraphQLCompletionItem & {
    range: monaco.IRange;
};
export declare function toMarkerData(diagnostic: Diagnostic): monaco.editor.IMarkerData;
//# sourceMappingURL=utils.d.ts.map