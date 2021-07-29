const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");

module.exports = {
  mode: 'development',
  //entry: {
  //  "bundle.js": glob.sync("build/static/?(js|css)/main.*.?(js|css)").map(f => path.resolve(__dirname, f)),
  //},
  
  
  entry: './src/index.js',
  output: {
    filename: "hpe-service.js",
  },
  module: {
    rules: [
      //{
       // test: /\.css$/,
        //use: ["style-loader", "css-loader"],
      //},
		{
		  test: /\.s?css$/,
		  oneOf: [
			{
			  test: /\.module\.s?css$/,
			  use: [
				MiniCssExtractPlugin.loader,
				{
				  loader: "css-loader",
				  options: { modules: false, exportOnlyLocals: false, localIdentName:'[local]' }
				},
				"sass-loader"
			  ]
			},
			{
			  use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
			}
		  ]
		},
      {
        test: /\.(js)$/,
        exclude: [/node_modules/, /react-dom.development/],
        use: ['babel-loader']
      },
    ],
  },

 plugins: [
   new HtmlWebpackPlugin({ // plugin for inserting scripts into html
         title: 'Custom template',
         template: 'public/index.html'
     }),
   new MiniCssExtractPlugin({ // plugin for controlling how compiled css will be outputted and named
    // filename: "css/[name].css",
//chunkFilename: "css/[id].css"
   })
 ]
 
}