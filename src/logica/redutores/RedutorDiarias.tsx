import React, { useReducer, useEffect, useContext } from "react";
import produce from "immer";
import { DiariaInterface } from "logica/@tipos/DiariaInterface";
import { useApiHateoas } from "logica/ganchos/useApi.hook";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";

export const estadoInicial = {
	diarias: [] as DiariaInterface[],
	buscando: true,
};

type EstadoInicialTipo = typeof estadoInicial;

type DiariaAcoes = "ATUALIZAR_DIARIAS" | "ATUALIZAR_BUSCANDO";

export type DiariaAcoesTipo = {
	tipo: DiariaAcoes;
	carregarObjeto?: unknown;
};

export interface RedutorDiariaInterface {
	estadoDiaria: EstadoInicialTipo;
	despachoDiaria: React.Dispatch<DiariaAcoesTipo>;
}

const redutor = (
	estadoAtual: EstadoInicialTipo,
	acao: DiariaAcoesTipo
): EstadoInicialTipo => {
	const proximoEstado = produce(estadoAtual, (estadoRascunho) => {
		switch (acao.tipo) {
			case "ATUALIZAR_DIARIAS":
				estadoRascunho.diarias =
					acao.carregarObjeto as DiariaInterface[];
				estadoRascunho.buscando = false;
				break;
			case "ATUALIZAR_BUSCANDO":
				estadoRascunho.buscando = acao.carregarObjeto as boolean;
				break;
		}
	});
	return proximoEstado;
};

export function useRedutorDiaria(): RedutorDiariaInterface {
	const [estado, despacho] = useReducer(redutor, estadoInicial),
		{ estadoUsuario } = useContext(ContextoUsuario),
		{ usuario } = estadoUsuario,
		diarias = useApiHateoas<DiariaInterface[]>(
			usuario.links,
			"lista_diarias"
		).data;

	useEffect(() => {
		if (diarias) {
			despacho({ tipo: "ATUALIZAR_DIARIAS", carregarObjeto: diarias });
		}
	}, [diarias]);

	return {
		estadoDiaria: estado,
		despachoDiaria: despacho,
	};
}
