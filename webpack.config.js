const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Load *package.json* so we can use `dependencies` from there.
const pkg = require('./package.json');
// Detect run environment and branch based on that.
const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build'),
	style: path.join(__dirname, 'app/main.css')
};

process.env.BABEL_ENV = TARGET;

const common = {
	// Entry accepts a path or an object of entries.
	// We'll be using the latter form given it's
	// convenient with more complex configurations.
	entry: {
		app: PATHS.app,
		style: PATHS.style
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: PATHS.build,
		filename: '[name].js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
			loader: 'babel', // The module to load. "babel" is short for "babel-loader"
			include: PATHS.app
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'SART'
		})
	]
};

// Default configuration. We will return this if
// Webpack is called outside of npm.
if(TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
		devServer: {
			// Follows the `requires` for debuggging?
			devtool: 'eval-source-map',

			// Enable history API fallback so HTML5 History API based
			// routing works. This is a good default that will come
			// in handy in more complicated setups.
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,

			// Display only errors to reduce the amount of output.
			stats: 'errors-only',

			// Parse host and port from env to allow customization.
			//
			// If you use Vagrant or Cloud9, set
			// host: process.env.HOST || '0.0.0.0';
			//
			// 0.0.0.0 is available to all network devices
			// unlike default localhost
			host: process.env.HOST,
			port: process.env.PORT
		},
		module: {
			loaders: [
				// Define development specific CSS setup
				{
					test: /\.css$/,
					loaders: ['style', 'css'],
					include: PATHS.app
				}
			]
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	});
}

if(TARGET === 'build' || TARGET === 'stats') {
	module.exports = merge(common, {
		// Define vendor entry point needed for splitting
		entry: {
			// Set up an entry chunk for our vendor bundle.
			// You can filter out dependencies here if needed with
			// `.filter(...)`.
			vendor: Object.keys(pkg.dependencies)
		},
		output: {
			path: PATHS.build,
			filename: '[name].[chunkhash].js',
			chunkFilename: '[chunkhash].js'
		},
		module: {
			loaders: [
				// Extract CSS during build
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract('style', 'css'),
					include: PATHS.app
				}
			]
		},
		plugins: [
			// Output extracted CSS to a file
			new ExtractTextPlugin('[name].[chunkhash].css'),
			new CleanWebpackPlugin([PATHS.build]),
			// Extract vendor and manifest files
			new webpack.optimize.CommonsChunkPlugin({
				names: ['vendor', 'manifest']
			}),
			// Setting DefinePlugin affects React library size!
			// DefinePlugin replaces content "as is" so we need some
			// extra quotes for the generated code to make sense
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': '"production"'

				// You can set this to '"development"' or
				// JSON.stringify('development') for your
				// development target to force NODE_ENV to development mode
				// no matter what
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			})
		]
	});
}
