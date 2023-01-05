import execa from 'execa';
interface ConstructorProps {
    readonly HOME?: string;
    readonly YARN_RC_FILENAME?: string;
    readonly cwd?: string;
}
export declare class Yarn {
    readonly home?: string | undefined;
    readonly yarnRcFileName?: string | undefined;
    readonly cwd?: string | undefined;
    constructor({ HOME, YARN_RC_FILENAME, cwd }?: ConstructorProps);
    setNpmRegistryServer(registryServer: string): Promise<void>;
    getNpmRegistryServer(): Promise<string>;
    setNpmAuthToken(npmAuthToken: string): Promise<void>;
    setNpmAuthIdent(npmAuthIdent: string): Promise<void>;
    getNpmAuthToken(): Promise<string | null>;
    getNpmAuthIdent(): Promise<string | null>;
    authenticated(): Promise<boolean>;
    install(ignoreLock?: boolean): Promise<void>;
    pluginImportVersion(): Promise<void>;
    version(version: string): Promise<void>;
    packDryRun(): Promise<ReadonlyArray<string>>;
    pack(filename?: string): Promise<void>;
    publish(tag?: string): Promise<void>;
    useExeca(args: string): Promise<execa.ExecaReturnValue<string>>;
}
export {};
//# sourceMappingURL=yarn.d.ts.map