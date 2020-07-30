const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: './src/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'staticfile'),
    filename: 'js/app.js'
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    // poll: 1000,
  },

  module: {
    rules: [
      // css || sass
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     // Creates `style` nodes from JS strings
      //     'style-loader',
      //     // Translates CSS into CommonJS
      //     'css-loader',
      //     // Compiles Sass to CSS
      //     'sass-loader',
      //   ],
      // },
      // fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          }
        }],
      },
      // file || image
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCSSAssetsPlugin({}),
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
    }),
  ]
};