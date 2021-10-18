import { Position } from 'graphql-language-service';
export function toMonacoRange(range) {
    return {
        startLineNumber: range.start.line + 1,
        startColumn: range.start.character + 1,
        endLineNumber: range.end.line + 1,
        endColumn: range.end.character + 1,
    };
}
export function toGraphQLPosition(position) {
    return new Position(position.lineNumber - 1, position.column - 1);
}
export function toCompletion(entry, range) {
    return {
        label: entry.label,
        insertText: entry.insertText ||
            (!entry.label.startsWith('$') ? entry.label : entry.label.substring(1)),
        sortText: entry.sortText,
        filterText: entry.filterText,
        documentation: entry.documentation,
        detail: entry.detail,
        range: range ? toMonacoRange(range) : undefined,
        kind: entry.kind,
    };
}
export function toMarkerData(diagnostic) {
    return {
        startLineNumber: diagnostic.range.start.line + 1,
        endLineNumber: diagnostic.range.end.line + 1,
        startColumn: diagnostic.range.start.character + 1,
        endColumn: diagnostic.range.end.character,
        message: diagnostic.message,
        severity: 5,
        code: diagnostic.code || undefined,
    };
}
//# sourceMappingURL=utils.js.map