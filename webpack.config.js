const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssLogical = require('postcss-logical');

const articles = require('./src/articles/articles.json');
const usedTitles = new Set();
const usedFiles = new Set();
const articleHTML = articles.articles.map((article) => {

	// Ensure the path is an HTML file
	if (!article.path.endsWith('.html')) return;

	// Ensure the path exists
	const p = path.resolve(__dirname, './src/articles/', article.path);
	if (!fs.existsSync(p)) return;

	// Ensure the file hasn't been used before
	if (usedFiles.has(p)) {
		throw Error(`Duplicate file usage detected: '${p}'.`);
	} else {
		usedFiles.add(p);
	}

	// Ensure the title hasn't been used before
	const title = article.title.toLowerCase().replace(/\s/g, '-');
	if (usedTitles.has(title)) {
		throw Error(`Duplicate title detected: '${title}'.`)
	} else {
		usedTitles.add(title);
	}

	// Add the article to webpack to be processed
	return new HtmlWebpackPlugin({
		template: path.resolve(__dirname, './src/articles/', article.path),
		filename: `${title}.html`,
		chunks: ['article'],
		title: `Tech Founder Connect | ${article.title}`,
		favicon: './src/assets/img/favicon.ico',
	})
});

const babelLoader = {
	loader: 'babel-loader',
	options: {
		babelrc: false,
		presets: [
			[
				'@babel/preset-env',
				{
					useBuiltIns: 'entry',
					corejs: { version: 3 },
					targets: '> 1%',
					debug: false,
				},
			],
			'@babel/preset-react',
		],
		plugins: ['@babel/syntax-dynamic-import'],
	},
};

module.exports = {
    entry: {main: './src/index', article: './src/articles/shared/article'},
    mode: 'production',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[name].js',
		chunkFilename: '[chunkhash].bundle.js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				include: /src/,
				use: [
					babelLoader,
					{
						loader: 'ts-loader',
					},
				],
            },
            {
                test: /\.s?css$/,
                use: [
                    { loader: 'style-loader' },
					{ loader: 'css-loader', options: { modules: false, sourceMap: true } },
					{
						loader: 'postcss-loader', 
						options: {
							postcssOptions: {
								plugins: [postcssLogical({dir: 'ltr'})]
							},
							sourceMap: true
						},
						
					},
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            }
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			favicon: './src/assets/img/favicon.ico',
			chunks: ['main']
		}),
		...articleHTML,
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
        }),
		new CopyWebpackPlugin({
			patterns: [
				{ from: './src/assets', to: './assets' },
			],
		}),
	],
	devServer: {
		historyApiFallback: true,
	},
};