const path = require('path');
const glob = require('glob');


module.exports = {
  entry: {
    App: './src/App.js',
    action: './src/store/actions.js',
    reducers: './src/store/reducers.js',
    sagas: './src/store/sagas.js',

    Routes: './src/Routes/index.jsx',
    allRoutes:  './src/Routes/allRoutes.js',
    AuthProtected:  './src/Routes/AuthProtected.js',

  }, // Your main component file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    publicPath: '/'
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
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
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'url-loader',
        } 
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
        loader: 'svg-inline-loader'
      },

    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.png', '.svg', '.jpg', '.jpeg', '.eot', '.woff2', '.woff', '.ttf'] // Add other extensions if needed
  }
};