
/**
 * Asst.Prof.Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory | ECC-Lab @ KMUTT
 * 06 November, 2019
 */



//--------------------------------------------------------------
/**
 * Application selection
 */
// const TARGET_APP = 'ex01-started';
// const TARGET_APP = 'ex02-button';
// const TARGET_APP = 'ex03-panel';
// const TARGET_APP = 'ex04-layout';
// const TARGET_APP = 'ex05-text';
// const TARGET_APP = 'ex06-led';
// const TARGET_APP = 'ex07-knob';
// const TARGET_APP = 'ex08-gauge';

const TARGET_APP = 'iot-app';

//--------------------------------------------------------------


/**
 * Main/Index file selection
 */
const TARGET_FILE = 'index.js';


//--------------------------------------------------------------

/**
 * Mode selection
 */
const __mode__ = 'app';	/** app dev */

//--------------------------------------------------------------
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const ROOT = (__mode__ === `app`) ? `./apps` : `.`;
const TARGET_DIR = (__mode__ === `app`) ? `${TARGET_APP}` : `dev`;

console.log(`\nRunning ${ROOT}/src/${TARGET_DIR}/${TARGET_FILE}\n`);


module.exports = {
	entry: `${ROOT}/src/${TARGET_DIR}/${TARGET_FILE}`,
	output: {
		path: path.resolve(__dirname, `dist/${TARGET_DIR}`),
		filename: 'bundle.js'
	},
	watch: true,
	devServer: {
		contentBase: path.join(__dirname, `dist/${TARGET_DIR}`),
		compress: true,
		port: 9000,
		watchContentBase: true,
		hot: true,
		stats: {
			modules: false,
		}
	},
	resolve: {
		//!! Add `.ts` and `.tsx` as a resolvable extension.
		extensions: [".ts", ".tsx", ".js"]
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'ts-loader',
				}
			},
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: "css-loader",
					},
					{
						loader: "postcss-loader"
					},
					{
						loader: "sass-loader",
						options: {
							implementation: require("sass")
						}
					}
				]
			},
			{
				//!! Now we apply rule for images
				test: /\.(png|jpe?g|gif|svg)$/,
				use: [
					{
						//!! Using file-loader for these files
						loader: "file-loader",

						//!! In options we can set different things like format
						//!! and directory to save
						options: {
							outputPath: 'images',
							name: '[name].[ext]',
						}
					}
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/'
						}
					}
				]
			}
		]
	},
	plugins: [

		new MiniCssExtractPlugin({
			filename: "bundle.css"
		}),
		new CopyPlugin([{
			from:  `${ROOT}/src/${TARGET_DIR}/index.html`,
			to: path.resolve(__dirname, `dist/${TARGET_DIR}/index.html`)
		}])
	]
};
