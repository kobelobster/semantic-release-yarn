"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginConfig = void 0;
function isNullableBoolean(value, name) {
    if (typeof value === 'undefined')
        return;
    if (typeof value === 'boolean')
        return;
    throw new Error(`${name} must be a boolean, but given ${JSON.stringify(value)}`);
}
function isNullableString(value, name) {
    if (typeof value === 'undefined')
        return;
    if (typeof value === 'string')
        return;
    throw new Error(`${name} must be a string, but given ${JSON.stringify(value)}`);
}
exports.PluginConfig = {
    normalize({ npmPublish, tarballDir, changeVersion, useNpmToken, useNpmAuthIdent }) {
        isNullableBoolean(npmPublish, 'npmPublish');
        isNullableBoolean(changeVersion, 'packageVersion');
        isNullableString(tarballDir, 'tarballDir');
        isNullableBoolean(useNpmToken, 'useNpmToken');
        isNullableBoolean(useNpmAuthIdent, 'useNpmAuthIdent');
        return {
            npmPublish: npmPublish ?? true,
            tarballDir: tarballDir ?? '.',
            changeVersion: changeVersion ?? true,
            useNpmToken: useNpmToken ?? true,
            useNpmAuthIdent: useNpmAuthIdent ?? false,
        };
    },
};
