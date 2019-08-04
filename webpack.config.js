const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
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
          'style-loader', // 읽어온 css 내용을 style태그를 만들어 추가한다.
          'css-loader'  // css file을 읽어온다.
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
          publicPath: './dist/', // url을 만나게 되면 해당 자원을 번들된 파일로 이동시키는데 이에따른 경로도 변경해준다
          name: '[name].[ext]?[hash]', // 기본적으로 파일이름을 해시코드값으로 변경되는데 본래의 이름을 적용하도록
        }
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        loader:'url-loader',
        options: {
          publicPath: './dist/',
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 번들된 파일 삭제후 설치
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common' 
    // })
    new HtmlWebpackPlugin({ // template에 설정해둔 파일을 빌드시에 filename으로 설정해둔곳으로 복사하고 번들된 파일 경로가 설정된 script 태그를 추가한다.
      template: './index.html',
      filename: './index.html'
    })
  ]
};