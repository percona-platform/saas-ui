/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const glob = require('glob');
const fse = require('fs-extra');
/* eslint-enable @typescript-eslint/no-var-requires */

const srcDir = path.join('./src');
const jsDistDir = path.join('./dist/js');
const esmDistDir = path.join('./dist/esm');

const files = glob.sync('**/*.d.ts', {
  cwd: srcDir,
});

files.forEach((file) => {
  const from = path.join(srcDir, file);
  const toJsDir = path.join(jsDistDir, file);
  const toEsmDir = path.join(esmDistDir, file);
  fse.copySync(from, toJsDir);
  fse.copySync(from, toEsmDir);
});
