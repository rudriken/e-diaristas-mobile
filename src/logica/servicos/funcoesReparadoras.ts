export const stringParaObjeto = (cadeia: string) => {
	if (cadeia[0] === "[") {
		cadeia = cadeia + "]";
	} else if (cadeia[0] === "{") {
		cadeia = cadeia + "}";
	}

	let objeto = JSON.parse(cadeia);
	console.log("string convertida em objeto");
	return objeto;

	// let tamanhoDaCadeia = cadeia.length;
	// let cadeiaRascunho = cadeia;

	// for (let c = 0; c < tamanhoDaCadeia; c++) {
	// 	if (cadeia[c] === "{") {
	// 		cadeiaRascunho[c+1] = ",";
	// 	}
	// }

	// // chave é o que vem ANTES de ":"
	// let chave: string;
	// let chaves = [];

	// // valor é o que vem DEPOIS de ":" e ANTES de ","
	// let valor: string;
	// let valores = [];

	// let nivel1 = [];
	// let nivel2 = [];

	// let virgula = 0;
	// let virgulas = [];
	// let doisPontos = 0;
	// let doisPontoss = [];
	// for (let c = 0; c < cadeia.length; c++) {
	// 	if (cadeia[c] === ",") {
	// 		virgula = c;
	// 		virgulas.push(virgula);
	// 	}
	// 	if (cadeia[c] === ":") {
	// 		doisPontos = c;
	// 		doisPontoss.push(doisPontos);
	// 	}
	// }

	// for (let c = 0; c < doisPontoss.length; c++) {
	// 	valor = cadeia.substring(doisPontoss[c] + 1, virgulas[c]);
	// 	valores.push(valor);
	// 	// chave = cadeia.substring(virgulas[c])
	// }

	// console.log("doisPontoss:", doisPontoss);
	// console.log("virgulas:", virgulas);
	// console.log("valores:", valores);
};
