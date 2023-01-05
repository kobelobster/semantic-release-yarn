import { PluginConfig } from './config/plugin';
import { Context, PrepareContext } from './types';
export declare function verifyConditions(config: PluginConfig, ctx: Context): Promise<void>;
export declare function prepare(config: PluginConfig, ctx: PrepareContext): Promise<void>;
export declare function publish(config: PluginConfig, ctx: PrepareContext): Promise<void>;
//# sourceMappingURL=index.d.ts.map