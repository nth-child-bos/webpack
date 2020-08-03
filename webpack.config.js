const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HappyPack = require('happypack')

module.exports = {
  // mode: 'production',
  devtool: 'source-map',
  context: path.join(__dirname, '/src'), // 指定entry的前缀
  // entry: './index.js',
  entry: {
    buddle: './index.js',
  //   foo: './foo.js',
  //   bar: './bar.js',
  },
  output: {
    // filename: 'bundle.js',
    filename: '[name]@[hash].js',
    // path: path.join(__dirname, '/dist'),
  },
  mode: 'development',
  devServer: {
    hot: true,
    publicPath: '/dist',
    host: '0.0.0.0',
    // port: '1024',
  },
  module: {
    noParse: /lodash/,
    rules: [{
      // test: /\.js$/,
      // use: 'force-strict-loader',
    }, {
      test: /\.css$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[name]__[local]__[hash:base64:5]',
          },
        }
      }, 'px2rem-loader', 'postcss-loader'],
      // use: ExtractTextPlugin.extract({
      //   fallback: 'style-loader',
      //   use: 'css-loader',
      // }),
      // use: [
      //   {
      //     loader: MiniCssExtractPlugin.loader,
      //     options: {
      //       // publicPath: './',
      //     }
      //   },
      //   'css-loader',
      // ],
      // exclude: /node_modules/,
      include: /src/,
      issuer: { // 加载者
        test: /\.js$/,
        include: /src/,
      }
    }, {
      /* 
        test: /\.js$/,
        use: 'eslint-loader',
        enforce: 'pre', // 保证此loader在所有loader之前执行
       */
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
      // use: {
      //   loader: 'babel-loader',
      //   // options: {
      //   //   cacheDirectory: true,
      //   //   presets: [[
      //   //     'env', {
      //   //       modules: false,
      //   //     }
      //   //   ]]
      //   // }
      // }
    }, {
      // test: /\.js$/,
      // use: 'ts-loader',
    }, {
      test: /\.html$/,
      use: 'html-loader',
    }, {
      test: /\.handlebars$/,
      use: 'handlebars-loader',
    }, {
      // test: /\.(png|jpg|gif)$/,
      // use: {
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]',
      //     publicPath: './assets/'
      //   }
      // },
    }, {
      test: /\.(png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: '[name].[ext]',
          publicPath: './assets/'
        }
      },
    }, {
      test: /\.vue$/,
      use: 'vue-loader',
    }, {
      test: /\.scss$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          sourceMap: true
        },
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        },
      }],
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './test.html',
    }),
    new webpack.NamedModulesPlugin(),
    new VueLoaderPlugin(),
    // new ExtractTextPlugin('bundle.css'),
    // new ExtractTextPlugin('[name].css'),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      ENV: JSON.stringify('testEnv'),
      TEST_ENV: JSON.stringify('haha'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.splitChunks({
    //   name: 'commons',
    //   filename: 'commons.js',
    // })
  ],
  optimization: {
    // splitChunks: { // 不知道为什么开发环境不能用
    //   chunks: "all",
    // }
    minimize: true,
    minimizer: [
      new TerserPlugin({ // js压缩
        test: /\.js(\?.*)?$/i,
        exclude: /\/excludes/,
      })
    ]
  }
}

// console.log('webpack',webpack)
// console.log(111, process.env.ENV)
// "scripts": {
//   "dev": " webpack-dev-server --config=webpack.development.config.js",
//   "build": " webpack --config=webpack.production.config.js"
// },




// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// module.exports = {
//     // ...
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 use: ExtractTextPlugin.extract({
//                     fallback: 'style-loader',
//                     use: 'css-loader',
//                 }),
//             }
//         ],
//     },
//     plugins: [new ExtractTextPlugin('style.css')],
//     optimization: {
//         minimizer: [new OptimizeCSSAssetsPlugin({
//             // 生效范围，只压缩匹配到的资源
//             assetNameRegExp: /\.optimize\.css$/g,
//             // 压缩处理器，默认为 cssnano
//             cssProcessor: require('cssnano'),
//             // 压缩处理器的配置
//             cssProcessorOptions: { discardComments: { removeAll: true } },
//             // 是否展示 log
//             canPrint: true,
//         })],
//     },
// };





// happyPack
// 初始Webpack配置（使用HappyPack前）
// module.exports = {
//   //...
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         options: {
//           presets: ['react'],
//         },
//       }
//     ],
//   },
// };

// 使用HappyPack的配置
// const HappyPack = require('happypack');
// module.exports = {
//   //...
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'happypack/loader?id=js',
//       },
//       {
//         test: /\.ts$/,
//         exclude: /node_modules/,
//         loader: 'happypack/loader?id=ts',
//       }
//     ],
//   },
//   plugins: [
//     new HappyPack({
//       id: 'js',
//       loaders: [{
//         loader: 'babel-loader',
//         options: {}, // babel options
//       }],
//     }),
//     new HappyPack({
//       id: 'ts',
//       loaders: [{
//         loader: 'ts-loader',
//         options: {}, // ts options
//       }],
//     })
//   ]
// };


//
// plugins: [
//   new webpack.IgnorePlugin({
//     resourceRegExp: /^\.\/locale$/, // 匹配资源文件
//     contextRegExp: /moment$/, // 匹配检索目录
//   })
// ],


// 
// webpack.vendor.config.js
// const path = require('path');
// const webpack = require('webpack');
// const dllAssetPath = path.join(__dirname, 'dll');
// const dllLibraryName = 'dllExample';
// module.exports = {
//   entry: ['react'],
//   output: {
//     path: dllAssetPath,
//     filename: 'vendor.js',
//     library: dllLibraryName,
//   },
//   plugins: [
//     new webpack.DllPlugin({
//       name: dllLibraryName,
//       path: path.join(dllAssetPath, 'manifest.json'),
//     })
//   ],
// };

//
// webpack.config.js
// const path = require('path');
// const webpack = require('webpack');
// module.exports = {
//   // ...
//   plugins: [
//     new webpack.DllReferencePlugin({
//       manifest: require(path.join(__dirname, 'dll/manifest.json')),
//     })
//   ]
// };

// // index.html
// <body>
//   <!-- ... -->
//   <script src="dll/vendor.js"></script>
//   <script src="dist/app.js"></script>
// </body>

//
// webpack.vendor.config.js
// module.exports = {
//   // ...
//   plugins: [
//     new webpack.DllPlugin({
//       name: dllLibraryName,
//       path: path.join(dllAssetPath, 'manifest.json'),
//     }),
//     new webpack.HashedModuleIdsPlugin(),
//   ]
// };

//  关闭模块依赖解析
// module.exports = {
//   // ...
//   module: {
//     rules: [{
//       test: /\.js$/,
//       exclude: /node_modules/,
//       use: [{
//         loader: 'babel-loader',
//         options: {
//           presets: [
//             // 这里一定要加上 modules: false
//             [@babel/preset-env, { modules: false }]
//           ],
//         },
//       }],
//     }],
//   },
// };

//
// const DashboardPlugin = require('webpack-dashboard/plugin');
// module.exports = {
//   entry: './app.js',
//   output: {
//     filename: '[name].js',
//   },
//   mode: 'development',
//   plugins: [
//     new DashboardPlugin()
//   ],
// };
// package.json
// {
//   ...
//   "scripts": {
//     "dev": "webpack-dashboard -- webpack-dev-server"
//   }
// }

//
// const merge = require('webpack-merge');
// const commonConfig = require('./webpack.common.js');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// module.exports = merge.smart(commonConfig, {
//   mode: 'production',
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: ExtractTextPlugin.extract({
//           fallback: 'style-loader',
//           use: 'css-loader',
//         }),
//       }
//     ]
//   },
// });

//
// webpack.config.js
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const smp = new SpeedMeasurePlugin();
// module.exports = smp.wrap({
//   entry: './app.js',
//   ...
// });

//
// const path = require('path');
// const SizePlugin = require('size-plugin');

// module.exports = {
//   entry: './app.js',
//   output: {
//     path: path.join(__dirname, 'dist'),
//     filename: '[name].js',
//   },
//   mode: 'production',
//   plugins: [
//     new SizePlugin(),
//   ],
// };