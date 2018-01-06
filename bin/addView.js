#!/usr/bin/env node

const path = require('path')
const utils = require('../utils/index')

function resolve(dir) {
  return path.resolve(__dirname, '../', dir)
}

var argv = require('yargs')
  .option('n', {
    alias: 'name',
    demand: true,
    default: 'template',
    describe: 'your views name',
    type: 'string',
  })
  .usage('Usage: add [options]')
  .example('add -n App', 'create a view template named App')
  .help('h')
  .alias('h', 'help').argv

utils.copyDir(resolve('utils/template/view'), resolve(`src/views/${argv.n}`))
