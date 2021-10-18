import { SchemaConfig, SchemaResponse } from 'graphql-language-service';
import type { FormattingOptions, ModeConfiguration } from './typings';
import type { WorkerAccessor } from './languageFeatures';
import type { IEvent } from 'monaco-editor';
import { DocumentNode, FragmentDefinitionNode, GraphQLSchema } from 'graphql';
export declare type LanguageServiceAPIOptions = {
    languageId: string;
    schemaConfig: SchemaConfig;
    modeConfiguration: ModeConfiguration;
    formattingOptions: FormattingOptions;
};
export declare class LanguageServiceAPI {
    private _onDidChange;
    private _schemaConfig;
    private _formattingOptions;
    private _modeConfiguration;
    private _languageId;
    private _worker;
    private _workerPromise;
    private _resolveWorkerPromise;
    private _schemaString;
    private _externalFragmentDefinitions;
    constructor({ languageId, schemaConfig, modeConfiguration, formattingOptions, }: LanguageServiceAPIOptions);
    get onDidChange(): IEvent<LanguageServiceAPI>;
    get languageId(): string;
    get modeConfiguration(): ModeConfiguration;
    get schemaConfig(): SchemaConfig;
    get formattingOptions(): FormattingOptions;
    get externalFragmentDefinitions(): string | FragmentDefinitionNode[] | null;
    get hasSchema(): boolean;
    get schemaString(): string | null;
    get worker(): Promise<WorkerAccessor>;
    setWorker(worker: WorkerAccessor): void;
    getSchema(): Promise<SchemaResponse | string | null>;
    setSchema(schema: string | GraphQLSchema): Promise<void>;
    parse(graphqlString: string): Promise<DocumentNode>;
    setSchemaConfig(options: SchemaConfig): void;
    updateSchemaConfig(options: Partial<SchemaConfig>): void;
    setExternalFragmentDefinitions(externalFragmentDefinitions: string | FragmentDefinitionNode[]): void;
    setSchemaUri(schemaUri: string): void;
    setModeConfiguration(modeConfiguration: ModeConfiguration): void;
    setFormattingOptions(formattingOptions: FormattingOptions): void;
}
export declare const modeConfigurationDefault: Required<ModeConfiguration>;
export declare const schemaDefault: SchemaConfig;
export declare const formattingDefaults: FormattingOptions;
//# sourceMappingURL=api.d.ts.map