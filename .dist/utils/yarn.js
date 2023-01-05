"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yarn = void 0;
const execa_1 = __importDefault(require("execa"));
class Yarn {
    home;
    yarnRcFileName;
    cwd;
    constructor({ HOME, YARN_RC_FILENAME, cwd } = {}) {
        this.home = HOME;
        this.yarnRcFileName = YARN_RC_FILENAME;
        this.cwd = cwd;
    }
    async setNpmRegistryServer(registryServer) {
        await this.useExeca(`config set npmRegistryServer ${registryServer} --home`);
    }
    async getNpmRegistryServer() {
        const response = await this.useExeca('config get npmRegistryServer --json');
        return JSON.parse(response.stdout);
    }
    async setNpmAuthToken(npmAuthToken) {
        await this.useExeca(`config set npmAuthToken ${npmAuthToken} --home`);
    }
    async setNpmAuthIdent(npmAuthIdent) {
        await this.useExeca(`config set npmAuthIdent ${npmAuthIdent} --home`);
    }
    async getNpmAuthToken() {
        const response = await this.useExeca('config get npmAuthToken --json --no-redacted');
        return JSON.parse(response.stdout);
    }
    async getNpmAuthIdent() {
        const response = await this.useExeca('config get npmAuthIdent --json --no-redacted');
        return JSON.parse(response.stdout);
    }
    async authenticated() {
        try {
            await this.useExeca('npm whoami');
            return true;
        }
        catch (e) {
            return e.toString().indexOf('Response Code: 404 (Not Found)') >= 0;
        }
    }
    async install(ignoreLock) {
        await this.useExeca(`install ${ignoreLock ? '--no-lockfile' : ''}`);
    }
    async pluginImportVersion() {
        await this.useExeca('plugin import version');
    }
    async version(version) {
        await this.useExeca(`version ${version}`);
    }
    async packDryRun() {
        const response = (await this.useExeca('pack --dry-run --json')).stdout;
        return response
            .split('\n')
            .map(line => JSON.parse(line))
            .flatMap((line) => (line.location ? [line.location] : []))
            .sort();
    }
    async pack(filename = 'package.tgz') {
        await this.useExeca(`pack -o ${filename}`);
    }
    async publish(tag) {
        const tagToPublish = tag ? `--tag ${tag}` : '';
        await this.useExeca(`npm publish ${tagToPublish}`);
    }
    async useExeca(args) {
        const command = args.split(' ');
        const useCwd = this.cwd && { cwd: this.cwd };
        const env = { HOME: this.home, YARN_RC_FILENAME: this.yarnRcFileName };
        return (0, execa_1.default)('yarn', command, { ...useCwd, env });
    }
}
exports.Yarn = Yarn;
