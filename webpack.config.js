const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
      rules: [
         {
           test: /\.scss$/i,
           use: ['style-loader', 'css-loader', "sass-loader",],
         },
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			 },
       ],
	},
	devtool: 'inline-source-map',
	plugins: [
		new Dotenv()
	],
};
