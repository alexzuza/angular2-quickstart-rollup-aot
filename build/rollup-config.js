var nodeResolve = require('rollup-plugin-node-resolve');
var nodePath = require("path");
var config = require('./constants.js');

class RollupNG2 {
  resolveId(id, from) {
    if (id.startsWith('rxjs/')) {
        return nodePath.resolve(`${config.RXJS_TO_ES_DIR}/${id.replace('rxjs/', '')}.js`);
    }
    return undefined;
  }
}

const rollupNG2 = () => new RollupNG2();

module.exports = {
  sourceMap: false,
  treeshake: true,
  format: 'iife',
  context: 'window',
  plugins: [
    rollupNG2(),
    nodeResolve({
      jsnext: true, main: true, module: true
    })
  ],
  onwarn: function ( message ) {
    console.warn( message );
  }
};
