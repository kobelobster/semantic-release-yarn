"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.ErrorTypes = void 0;
const error_1 = __importDefault(require("@semantic-release/error"));
var ErrorTypes;
(function (ErrorTypes) {
    ErrorTypes[ErrorTypes["MISSING_PACKAGE_NAME"] = 0] = "MISSING_PACKAGE_NAME";
    ErrorTypes[ErrorTypes["MISSING_PACKAGE"] = 1] = "MISSING_PACKAGE";
    ErrorTypes[ErrorTypes["INVALID_NPM_TOKEN"] = 2] = "INVALID_NPM_TOKEN";
    ErrorTypes[ErrorTypes["INVALID_NPM_AUTH_IDENT"] = 3] = "INVALID_NPM_AUTH_IDENT";
})(ErrorTypes = exports.ErrorTypes || (exports.ErrorTypes = {}));
const error = (error) => {
    switch (error) {
        case ErrorTypes.MISSING_PACKAGE_NAME:
            return new error_1.default('Missing `name` in property `package.json`', 'MISSING_PACKAGE_NAME');
        case ErrorTypes.MISSING_PACKAGE:
            return new error_1.default('Missing `package.json`', 'MISSING_PACKAGE');
        case ErrorTypes.INVALID_NPM_TOKEN:
            return new error_1.default('Invalid NPM_TOKEN value in environment variables', 'INVALID_NPM_TOKEN');
        case ErrorTypes.INVALID_NPM_AUTH_IDENT:
            return new error_1.default('Invalid NPM_AUTH_IDENT value in environment variables', 'INVALID_NPM_AUTH_IDENT');
        default:
            return new error_1.default(error);
    }
};
exports.error = error;
