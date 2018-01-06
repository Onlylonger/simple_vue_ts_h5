const path = require('path')

const resolve = dir => path.join(__dirname, './', dir)

module.exports = {
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    // publicPath: process.env.NODE_ENV === 'dev' ? './dist' : ''
    publicPath: '/dist'
  },
  resolve: {
    extensions: ['.ts', '.vue', '.js'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      styles: resolve('src/styles'),
      components: resolve('src/components'),
      router: resolve('src/router'),
      views: resolve('src/views'),
      assets: resolve('src/assets')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: ['vue-style-loader', 'css-loader', 'sass-loader']
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
