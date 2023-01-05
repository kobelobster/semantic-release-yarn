"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannel = exports.getNpmAuthIdent = exports.getNpmToken = exports.getPackage = void 0;
const error_1 = require("./error");
const semver_1 = __importDefault(require("semver"));
const read_pkg_1 = __importDefault(require("read-pkg"));
async function getPackage(cwd) {
    let packageJson;
    try {
        packageJson = await (0, read_pkg_1.default)({ cwd });
    }
    catch (err) {
        const { code } = err;
        if (code === 'ENOENT')
            throw (0, error_1.error)(error_1.ErrorTypes.MISSING_PACKAGE);
        throw new AggregateError([err]);
    }
    if (!packageJson.name)
        throw (0, error_1.error)(error_1.ErrorTypes.MISSING_PACKAGE_NAME);
    return packageJson;
}
exports.getPackage = getPackage;
function getNpmToken(env) {
    const token = env['NPM_TOKEN'];
    if (typeof token !== 'string')
        throw (0, error_1.error)(error_1.ErrorTypes.INVALID_NPM_TOKEN);
    return token;
}
exports.getNpmToken = getNpmToken;
function getNpmAuthIdent(env) {
    const authIdent = env['NPM_AUTH_IDENT'];
    if (typeof authIdent !== 'string')
        throw (0, error_1.error)(error_1.ErrorTypes.INVALID_NPM_AUTH_IDENT);
    return authIdent;
}
exports.getNpmAuthIdent = getNpmAuthIdent;
const getChannel = (channel) => {
    if (!channel)
        return 'latest';
    return semver_1.default.validRange(channel) ? `release-${channel}` : channel;
};
exports.getChannel = getChannel;
