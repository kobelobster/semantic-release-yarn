# @dmeents/semantic-release-yarn

[![npm](https://img.shields.io/npm/v/@dmeents/semantic-release-yarn?style=flat)](https://www.npmjs.com/package/@dmeents/semantic-release-yarn)
[![npm](https://img.shields.io/npm/dw/@dmeents/semantic-release-yarn?style=flat)](https://www.npmjs.com/package/@dmeents/semantic-release-yarn)
[![codecov](https://codecov.io/gh/dmeents/semantic-release-yarn/branch/main/graph/badge.svg?token=cKCa19pY6e)](https://codecov.io/gh/dmeents/semantic-release-yarn)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/dmeents/semantic-release-yarn/main?style=flat)
[![GitHub issues](https://img.shields.io/github/issues/dmeents/semantic-release-yarn?style=flat)](https://github.com/dmeents/semantic-release-yarn/issues)
[![GitHub](https://img.shields.io/github/license/dmeents/semantic-release-yarn?style=flat)](https://github.com/dmeents/semantic-release-yarn/blob/main/LICENSE)

A plugin for [semantic-release](https://github.com/semantic-release/semantic-release) to support publishing packages
to [npm](https://www.npmjs.com/)
with [yarn@berry](https://github.com/yarnpkg/berry) and later. Inspired by [@suin's](https://github.com/suin)
package of a [similar name](https://github.com/suin/semantic-release-yarn).

| Step               | Description                                                                                                |
|--------------------|------------------------------------------------------------------------------------------------------------|
| `verifyConditions` | Verify the presence of the `NPM_TOKEN` environment variable and verify the authentication method is valid. |
| `prepare`          | Update the `package.json` version and [create](https://yarnpkg.com/cli/pack) the npm package tarball.      |
| `publish`          | [Publish the npm package](https://yarnpkg.com/cli/npm/publish) to the registry.                            |

## Install

```bash
$ yarn add -D @dmeents/semantic-release-yarn
```

## Usage

Start by adding the plugin to
the [semantic-release configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@dmeents/semantic-release-yarn"
  ]
}
```

## Configuration

### Environment Variables

| Variable  | Required | Description                                                                                                                                                                                                                    |
|-----------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| NPM_TOKEN | ✅        | The npm token to use to publish to the registry. It must be created using two-factor authentication [auth-only](https://docs.npmjs.com/about-two-factor-authentication) because semantic-release won't work with anything else |

### Configuration

> Packages will be published to the registry specified in the package.json file

> Your repository must be using `yarn@berry` and have a `.yarnrc.yml` file.

| Option        | Required | Default | Description                                                                                                                                                                                                              |
|---------------|----------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| npmPublish    | ❌        | true    | Should the package be published to the registry provided in the `package.json` file.                                                                                                                                     |
| tarballDir    | ❌        | .       | The location and filename of where to output the tarball generated by Yarn. As an example, this can be used to include the tarball in the [@semantic-release/github](https://github.com/semantic-release/github) plugin. |
| changeVersion | ❌        | true    | Determines if the plugin should update the `package.json` file as part of the `Prepare` step.                                                                                                                            |

### Example

In this example we are using this plugin to simply generate the tarball with npm and releasing it with GitHub. We are
also not allowing the plugin to update the version in the `package.json`.

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@dmeents/semantic-release-yarn",
      {
        "npmPublish": false,
        "changeVersion": false,
        "tarballDir": "dist"
      }
    ],
    [
      "@semantic-release/github",
      {
        "assets": "dist/*.tgz"
      }
    ]
  ]
}
```
