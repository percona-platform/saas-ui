/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fse = require('fs-extra');
/* eslint-enable @typescript-eslint/no-var-requires */

const pkg = 'package.json';
const from = path.join('./', pkg);
const to = path.join('./dist', pkg);

fse.copySync(from, to);
