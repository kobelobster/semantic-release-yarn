export interface PluginConfig {
    readonly npmPublish?: boolean;
    readonly changeVersion?: boolean;
    readonly tarballDir?: string | false;
    readonly useNpmToken?: boolean;
    readonly useNpmAuthIdent?: boolean;
}
export declare const PluginConfig: {
    normalize({ npmPublish, tarballDir, changeVersion, useNpmToken, useNpmAuthIdent }: PluginConfig): PluginConfig;
};
//# sourceMappingURL=plugin.d.ts.map