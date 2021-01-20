const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssLogical = require('postcss-logical');

const articles = require('./src/articles/articles.json');
const articleHTML = articles.articles.map((article) => {
	if (!article.path.endsWith('.html')) return;
	const p = path.resolve(__dirname, './src/articles/', article.path);
	if (!fs.existsSync(p)) return;
	return new HtmlWebpackPlugin({
		template: path.resolve(__dirname, './src/articles/', article.path),
		filename: `${article.title.toLowerCase().replace(/\s/g, '-')}.html`,
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