import { ApiLinksInterface } from "logica/@tipos/ApiLinksInterface";
import { DiariaInterface } from "logica/@tipos/DiariaInterface";
import {
	CidadeInterface,
	EnderecoInterface,
} from "logica/@tipos/EnderecoInterface";
import {
	ForcarEstadoUsuario,
	InterfaceDoUsuario,
} from "logica/@tipos/InterfaceDoUsuario";
import { ContextoDiaria } from "logica/contextos/ContextoDiarias";
import { ContextoServicosExternos } from "logica/contextos/ContextoServicosExternos";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import { DiariaAcoesTipo } from "logica/redutores/RedutorDiarias";
import { TipoDaAcaoDosServicosExternos } from "logica/redutores/RedutorServicosExternos";
import { TipoDaAcaoDoUsuario } from "logica/redutores/RedutorUsuario";
import { useContext } from "react";

export const stringParaObjeto = (cadeia: any, variavel = "PADRÃO") => {
	if (cadeia && typeof cadeia === "string") {
		if (cadeia[0] === "[") {
			cadeia = cadeia + "]";
		} else if (cadeia[0] === "{") {
			cadeia = cadeia + "}";
		}

		let objeto: any = JSON.parse(cadeia);
		console.log(`string '${variavel}' convertida para objeto`);
		return objeto;
	} else {
		return cadeia;
	}

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

export function repararObjeto_EstadoUsuario() {
	let [estadoUsuario, despachoUsuario]: [
		{
			usuario: InterfaceDoUsuario;
			listaDeEnderecos: CidadeInterface[];
			enderecoUsuario: EnderecoInterface;
			logando: boolean;
			forcarEstadoUsuario: ForcarEstadoUsuario;
		},
		React.Dispatch<TipoDaAcaoDoUsuario>
	] = [
		stringParaObjeto(
			useContext(ContextoUsuario).estadoUsuario,
			"estadoUsuario"
		),
		useContext(ContextoUsuario).despachoUsuario,
	];

	const usuario: InterfaceDoUsuario = stringParaObjeto(
		estadoUsuario.usuario,
		"usuario"
	);
	const listaDeEnderecos: CidadeInterface[] = stringParaObjeto(
		estadoUsuario.listaDeEnderecos,
		"listaDeEnderecos"
	);
	const enderecoUsuario: EnderecoInterface = stringParaObjeto(
		estadoUsuario.enderecoUsuario,
		"enderecoUsuario"
	);
	const logando: boolean = estadoUsuario.logando;
	const forcarEstadoUsuario: ForcarEstadoUsuario =
		estadoUsuario.forcarEstadoUsuario;
	estadoUsuario = {
		usuario,
		listaDeEnderecos,
		enderecoUsuario,
		logando,
		forcarEstadoUsuario,
	};
	return { estadoUsuario, despachoUsuario };
}

export function repararObjeto_EstadoDiaria() {
	let [estadoDiaria, despachoDiaria]: [
		{
			diarias: DiariaInterface[];
			buscando: boolean;
		},
		React.Dispatch<DiariaAcoesTipo>
	] = [
		stringParaObjeto(
			useContext(ContextoDiaria).estadoDiaria,
			"estadoDiaria"
		),
		useContext(ContextoDiaria).despachoDiaria,
	];
	const diarias: DiariaInterface[] = stringParaObjeto(
		estadoDiaria.diarias,
		"diarias"
	);
	const buscando: boolean = estadoDiaria.buscando;
	estadoDiaria = {
		diarias,
		buscando,
	};
	return { estadoDiaria, despachoDiaria };
}

export function repararObjeto_ServicosExternos() {
	let [estadoServicosExternos, despachoServicosExternos]: [
		{
			servicosExternos: ApiLinksInterface[];
		},
		React.Dispatch<TipoDaAcaoDosServicosExternos>
	] = [
		stringParaObjeto(
			useContext(ContextoServicosExternos).estadoServicosExternos,
			"estadoServicosExternos"
		),
		useContext(ContextoServicosExternos).despachoServicosExternos,
	];
	const servicosExternos: ApiLinksInterface[] = stringParaObjeto(
		estadoServicosExternos.servicosExternos,
		"servicosExternos"
	);
	estadoServicosExternos = { servicosExternos };
	return { estadoServicosExternos, despachoServicosExternos };
}
