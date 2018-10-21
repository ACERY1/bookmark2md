#!/usr/bin/env node
'use strict';

const program = require('commander');
const main = require('../lib/main');

program
  .version('0.0.1', '-v, --version')
 

program
  .command('create [json|md]')
  .action(main)  

program.parse(process.argv)
