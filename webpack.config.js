const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
  entry: {
    // 'js/app.js': './src/js/index.js', // scripts
    // 'css/main.css': './src/style/index.scss' //styles
    index: './src/js/index.js',
    // main: './src/style/index.scss' //styles
  },
  output: {
    path: path.resolve(__dirname, 'staticfile'),
    // filename: "[name]"
    // path: path.resolve(__dirname, 'staticfile'),
    filename: 'js/app.js'
  },

  module: {
    rules: [
       // css || sass
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      // css || sass
      // {
      //   test: /\.scss$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: [{
      //     loader: 'css-loader'
      //   },
      //   {
      //     loader: 'sass-loader'
      //   }
      //   ]
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

  plugins: [new CleanWebpackPlugin()]
};