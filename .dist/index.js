"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = exports.prepare = exports.verifyConditions = void 0;
const plugin_1 = require("./config/plugin");
const error_1 = require("./utils/error");
const utils_1 = require("./utils");
const yarn_1 = require("./utils/yarn");
let verified = false;
let prepared = false;
const yarn = new yarn_1.Yarn();
async function verifyConditions(config, ctx) {
    config = plugin_1.PluginConfig.normalize(config);
    ctx.logger.log(`read ${ctx.cwd}/package.json`);
    const packageJson = await (0, utils_1.getPackage)(ctx.cwd);
    const registry = packageJson?.publishConfig?.registry;
    if (packageJson.private === true) {
        ctx.logger.log('skipping since package is private');
        return;
    }
    if (config.npmPublish === false) {
        ctx.logger.log('skipping since npmPublish is false');
        return;
    }
    if (config.useNpmToken == config.useNpmAuthIdent) {
        ctx.logger.log('useNpmToken cannot be same value as useNpmAuthIdent');
        return;
    }
    if (registry) {
        ctx.logger.log(`set npmRegistry to ${registry}`);
        await yarn.setNpmRegistryServer(registry);
    }
    else {
        ctx.logger.log('set npmRegistryServer: "https://registry.npmjs.org"');
        await yarn.setNpmRegistryServer('https://registry.npmjs.org');
    }
    if (config.useNpmToken) {
        ctx.logger.log('set NPM_TOKEN to yarn config npmAuthToken');
        await yarn.setNpmAuthToken((0, utils_1.getNpmToken)(ctx.env));
        ctx.logger.log('verify npm auth');
        if (!(await yarn.authenticated()))
            throw (0, error_1.error)(error_1.ErrorTypes.INVALID_NPM_TOKEN);
    }
    else {
        ctx.logger.log('set NPM_AUTH_IDENT to yarn config npmAuthIdent');
        await yarn.setNpmAuthIdent((0, utils_1.getNpmAuthIdent)(ctx.env));
        ctx.logger.log('verify npm auth');
        if (!(await yarn.authenticated()))
            throw (0, error_1.error)(error_1.ErrorTypes.INVALID_NPM_AUTH_IDENT);
    }
    ctx.logger.log('install version plugin');
    await yarn.pluginImportVersion();
    verified = true;
}
exports.verifyConditions = verifyConditions;
async function prepare(config, ctx) {
    ctx.logger.log(`read ${ctx.cwd}/package.json`);
    config = plugin_1.PluginConfig.normalize(config);
    if (config.changeVersion) {
        ctx.logger.log(`update to "version": ${ctx.nextRelease.version}`);
        await yarn.version(ctx.nextRelease.version);
    }
    if (!verified) {
        ctx.logger.log('skipping since not verified');
        return;
    }
    ctx.logger.log('get tarball directory');
    const tarballDir = config.tarballDir ?? '.';
    if (typeof tarballDir === 'string') {
        const tarballName = tarballDir + '/package.tgz';
        ctx.logger.log(`creating a tarball: ${tarballName}`);
        await yarn.pack(tarballName);
    }
    ctx.logger.log(`package contents:`);
    const tarballContents = await yarn.packDryRun();
    for (const tarballContent of tarballContents) {
        ctx.logger.log(`  ${tarballContent}`);
    }
    prepared = true;
}
exports.prepare = prepare;
async function publish(config, ctx) {
    if (!verified || !prepared) {
        ctx.logger.log('skipping since not verified or prepared');
        return;
    }
    ctx.logger.log(`read ${ctx.cwd}/package.json`);
    const packageJson = await (0, utils_1.getPackage)(ctx.cwd);
    const { version } = ctx.nextRelease;
    ctx.logger.log(`get channel to publish to`);
    const distTag = (0, utils_1.getChannel)(ctx.nextRelease.channel);
    ctx.logger.log(`publishing ${version} to registry on dist-tag ${distTag}`);
    await yarn.publish(distTag);
    ctx.logger.log(`published ${packageJson.name}@${version} to @${distTag}`);
}
exports.publish = publish;
