module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
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
