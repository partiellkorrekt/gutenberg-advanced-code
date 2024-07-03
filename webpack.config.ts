import DependencyExtractionWebpackPlugin from "@wordpress/dependency-extraction-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

module.exports = {
	entry: "./src/index.ts",
	module: {
		rules: [
			{
				test: /\.(js|ts)x?$/,
				use: {
					loader: "swc-loader",
				},
			},
			{
				test: /\.s?css$/,
				exclude: /\.raw\.s?css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "",
						},
					},
					"css-loader",
				],
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
	output: {
		path: `${__dirname}/dist`,
		publicPath: "../wp-content/plugins/gutenberg-advanced-code/dist/",
		filename: "main.js",
	},
	devServer: {
		contentBase: "./dist",
	},
	externals: {
		react: "React",
		jquery: "jQuery",
		lodash: "lodash",
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
		new DependencyExtractionWebpackPlugin({}),
	],
	performance: { hints: false },
};
