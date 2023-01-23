module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module:react-native-dotenv",
				{
					moduleName: "@env",
					path: ".env",
				},
			],
			[
				"module-resolver",
				{
					alias: {
						logica: "./src/logica",
						pages: "./src/pages",
						visual: "./src/visual",
						"@assets": "./assets",
						"@parciais": "./src/visual/parciais",
						"@estilos": "./src/visual/estilos",
					},
				},
			],
		],
	};
};
