const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // Entry 
  entry: {
    server: './src/server.js'
  },

  // Avoid bundling Nodejs modules by marking it as external module
  target: 'node',
  externals: [webpackNodeExternals()],

  /*Development tool*/
  devtool: 'source-map',

  // Output 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js' 
  },

  // Rules to handle 
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          } 
        }
      },
    ]
  },

  // Plugins
  plugins: [
    new cleanWebpackPlugin(['dist'])
  ]
};
