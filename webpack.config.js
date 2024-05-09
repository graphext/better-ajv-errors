var path = require('path');

const crypto = require('crypto');
const crypto_orig_createHash = crypto.createHash;
crypto.createHash = algorithm =>
  crypto_orig_createHash(algorithm === 'md4' ? 'sha256' : algorithm);

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'better-ajv-errors',
    libraryTarget: 'commonjs2',
  },
};
