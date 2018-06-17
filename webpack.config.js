const path = require('path');
const webpack = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


// webpack.config.js
module.exports = env => {
  return {
    mode: (!env.production)
      ? 'development'
      : 'production',
    entry: {
      index: './src/main.js'
    },
    resolve: {
      extensions: ['.js', '.vue'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].min.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          use: 'eslint-loader',
          enforce: 'pre'
        }, {
          test: /\.vue$/,
          use: 'vue-loader'
        }, {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        }, {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader, {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }, {
          test: /\.(gif|png|jpe?g|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images/'
              }
            }, {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true
              }
            }
          ]
        }
      ]
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true, parallel: true, sourceMap: true, // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({filename: "[name].min.css"}),
      new HtmlWebpackPlugin({
        // Generating the index.html based on the template
        template: './src/template/index.template.html',
        title: 'Carsguide Test',
        filename: 'index.html',
        chunk: ['index']
      }),
      new CopyWebpackPlugin([
          {
              from: path.join(__dirname, 'src/assets/images'),
              to: path.join(__dirname, 'dist/assets/images'),
              toType: 'dir'
          }
      ])
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 3000,
    }
  };
};
