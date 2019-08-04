const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['@babel/polyfill', './index.js'], // ArrayFrom, Object.assign, Promise는 balbel로 트랜스파일링이 안되어 polyfill을 따로 추가해야한다. 설치하는 경우 실제 개발환경에서 사용해야하므로 --save-dev로 설치 하지 않는다.
  mode: "production",
  // devtool: 'inline-source-map', // 콘솔창에서 해당 에러가 어디서 나는지 정확하게 파악하기 위해 설정
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // devServer: { // 소스가 변경되면 자동으로 build되고 브라우저가 refresh 되게 하기 위해, watch모드는 자동으로 build는 되나 브라우저가 refresh안됨
  //   contentBase: path.resolve("./dist"), // 해당 위치에 번들된것을 읽어온다.
  //   index: "index.html",
  //   port: 9000
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 해당 내용 제외
        use: {
          loader: 'babel-loader', // es6문법을 es5로 바꿔준다
          options: {
              presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // 해당하는 css 파일을 읽어서 하나의 css파일로 만들어 추가한다.
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          // 'style-loader', // 읽어온 css 내용을 style태그를 만들어 추가한다.
          'css-loader'  // css file을 읽어서 js파일에 추가한다.
        ]
      },
      {
        test: /\.scss$/, // sass 파일 로더
        use: [
          'style-loader','css-loader','sass-loader',
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        loader:'file-loader', // 정적자원들을 읽어오고 관리한다/
        options: {
          publicPath: './dist', // url을 만나게 되면 해당 자원을 번들된 파일로 이동시키는데 이에따른 경로도 변경해준다
          name: '[name].[ext]?[hash]', // 기본적으로 파일이름을 해시코드값으로 변경되는데 본래의 이름을 적용하도록
        }
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        loader:'url-loader',
        options: {
          publicPath: './dist',
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 번들된 파일 삭제후 설치
    new HtmlWebpackPlugin({ // template에 설정해둔 파일을 빌드시에 filename으로 설정해둔곳으로 복사하고 번들된 파일 경로가 설정된 script 태그를 추가한다.
      template: './index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'style/[name].css',
      chunkFilename: 'style/[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ]
};