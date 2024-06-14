const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')
const ESLintPlugin = require('eslint-webpack-plugin');

dotenv.config();

module.exports = {
  entry: "./src/index.js", // Your main component file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    publicPath: '/',
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    historyApiFallback: true,
    port: process.env.PORT || 9000,
    allowedHosts: "all"
  },
  stats: 'errors-only',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new webpack.ProvidePlugin({
      "React": "react",
    }),
    new ESLintPlugin({
      // Specify extensions to lint
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      // Specify the directory where the source files are located
      context: 'src',
      // ESLint configuration
      eslintPath: require.resolve('eslint'),
      baseConfig: {
          extends: [
              "eslint:recommended",
              'plugin:react/recommended',
              "react-app"
          ],
          parserOptions: {
              ecmaVersion: 12,
              sourceType: 'module',
              ecmaFeatures: {
                  jsx: true,
              },
          },
          rules: {
              // Custom ESLint rules
          },
      },
      // Set to false if you want ESLint to emit warnings during webpack build
      failOnError: false,
  }),
  ],
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', ['@babel/preset-react', {"runtime": "automatic"}]]
          }
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|webp)(\?.*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/inline',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Creates style nodes from JS strings
          'css-loader', // Translates CSS into CommonJS
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true, // <-- !!IMPORTANT!!
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // Creates style nodes from JS strings
          'css-loader', // Translates CSS into CommonJS
        ]
      },
      {
        test: /\.svg$/,
        loader: 'file-loader'
      },

    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.png', '.svg', '.jpg', '.jpeg', '.eot', '.woff2', '.woff', '.ttf'], // Add other extensions if needed
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    alias: {
      'redux': path.resolve('./node_modules/@reduxjs/toolkit/node_modules/redux'),
    }
  },

};