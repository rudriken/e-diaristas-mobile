import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiLinksInterface } from "logica/@tipos/ApiLinksInterface";
import { LocalStorage } from "./ServicoArmazenamento";

export function stringParaObjeto_ServicoAPI(cadeia: any, variavel = "PADRÃO") {
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
}

const url = process.env.NEXT_PUBLIC_API;

export const ServicoAPI = axios.create({
	baseURL: url,
	headers: {
		"content-type": "application/json",
	},
});

ServicoAPI.interceptors.response.use(
	(resposta) => resposta,
	(erro) => {
		if (
			erro.response.HTTP === 401 &&
			erro.response.data.codigo === "token_nao_validado"
		) {
			lidarComAtualizacaoDoToken(erro);
		}
		return Promise.reject(erro);
	}
);

async function lidarComAtualizacaoDoToken(erro: {
	configuracao: AxiosRequestConfig;
}) {
	const tokenRefresh = await LocalStorage.pegar<string>("token_refresh", "");
	if (tokenRefresh) {
		LocalStorage.apagar("token_refresh");
		LocalStorage.apagar("token");
		try {
			const data: {
				acesso: string;
				refresh: string;
				token_tipo: string;
				expira_em: number;
			} = stringParaObjeto_ServicoAPI(
				(
					await ServicoAPI.post("/autenticacao/token/atualizar", {
						refresh: tokenRefresh,
					})
				).data,
				"data de 'lidarComAtualizacaoDoToken'"
			);
			LocalStorage.gravar("token", data.acesso);
			LocalStorage.gravar("token_refresh", data.refresh);
			ServicoAPI.defaults.headers.common.Authorization =
				"Bearer " + data.acesso;
			if (erro.configuracao.headers) {
				erro.configuracao.headers.Authorization =
					ServicoAPI.defaults.headers.common.Authorization;
			}
			return ServicoAPI(erro.configuracao);
		} catch (err) {
			return erro;
		}
	} else {
		return erro;
	}
}

export function linksResolver(
	links: ApiLinksInterface[] = [],
	nome: string
): ApiLinksInterface | undefined {
	return links.find((link) => link.rel === nome);
}

export function ServicoAPIHateoas(
	links: ApiLinksInterface[] = [],
	nome: string,
	aoPoderRequisitar: (
		requisicao: <T>(dado?: AxiosRequestConfig) => Promise<AxiosResponse<T>>
	) => void,
	aoNaoPoderRequisitar?: Function
) {
	const requisicaoLinks = linksResolver(links, nome);
	if (requisicaoLinks) {
		aoPoderRequisitar(<T>(dado?: AxiosRequestConfig) => {
			const resposta: Promise<AxiosResponse<T, any>> =
				stringParaObjeto_ServicoAPI(
					ServicoAPI.request<T>({
						method: requisicaoLinks.type,
						url: requisicaoLinks.uri,
						...dado,
					}),
					"resposta de 'ServicoAPIHateoas'"
				);
			return resposta;
		});
	} else {
		aoNaoPoderRequisitar?.();
	}
}
