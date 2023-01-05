/// <reference types="node" />
import readPackage from 'read-pkg';
export declare function getPackage(cwd: string): Promise<readPackage.NormalizedPackageJson>;
export declare function getNpmToken(env: NodeJS.ProcessEnv): string;
export declare function getNpmAuthIdent(env: NodeJS.ProcessEnv): string;
export declare const getChannel: (channel: string) => string;
//# sourceMappingURL=index.d.ts.map