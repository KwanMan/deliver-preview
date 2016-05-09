#!/usr/bin/env node
/* global exec, echo, exit, env */
'use strict'

require('shelljs/global')

let chalk = require('chalk')
let semver = require('semver')
let write = require('fs').writeFileSync
let resolve = require('path').resolve

const INC = env.inc || 'patch'
const PKG_PATH = resolve(__dirname, '..', 'package.json')
const PKG = require(PKG_PATH)
const MAN_PATH = resolve(__dirname, '..', 'chrome_extension', 'manifest.json')
const MAN = require(MAN_PATH)
const CURRENT_BRANCH = run('git rev-parse --abbrev-ref HEAD').trim()
const GIT_STATUS = run('git status --porcelain')

if (PKG.version !== MAN.version) {
  error(`package.json version (${PKG.version}) does not match manifest.json version (${MAN.version})`)
}

const NEW_VERSION = semver.inc(PKG.version, INC)

if (CURRENT_BRANCH !== 'master') {
  error('Can only release from master branch')
}
if (GIT_STATUS !== '') {
  error('Repo is dirty. Please commit before releasing')
}
log('Ensuring repo is update to date')
run('git pull')
run('git push')

log(`Incrementing version from ${PKG.version} to ${NEW_VERSION}`)
PKG.version = NEW_VERSION
MAN.version = NEW_VERSION
write(PKG_PATH, JSON.stringify(PKG, null, 2))
write(MAN_PATH, JSON.stringify(MAN, null, 2))

log('Committing')
run('git add -A')
run(`git commit -m [v${NEW_VERSION}]`)

log('Pushing changes')
run('git push')

echo(chalk.green(`Version v${NEW_VERSION} released to master`))

function error (msg) {
  echo(chalk.red(`Error: ${msg}`))
  exit(1)
}

function run (command) {
  let result = exec(command, { silent: true })
  if (result.code === 0) {
    return result.stdout
  } else {
    error(result.stderr)
  }
}

function log (msg) {
  echo(chalk.cyan(msg))
}
