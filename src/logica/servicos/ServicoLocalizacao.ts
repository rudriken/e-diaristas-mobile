import {
	CepResposta,
	CidadeInterface,
	EstadoInterface,
} from "logica/@tipos/EnderecoInterface";
import { ServicoAPI } from "./ServicoAPI";
import { AxiosResponse } from "axios";

function stringParaObjeto_ServicoLocalizacao(cadeia: any, variavel = "PADRÃO") {
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

export const ServicoLocalizacao = {
	listarEstados(): EstadoInterface[] {
		return [
			{ nome: "Acre", sigla: "AC" },
			{ nome: "Alagoas", sigla: "AL" },
			{ nome: "Amapá", sigla: "AP" },
			{ nome: "Amazonas", sigla: "AM" },
			{ nome: "Bahia", sigla: "BA" },
			{ nome: "Ceará", sigla: "CE" },
			{ nome: "Distrito Federal", sigla: "DF" },
			{ nome: "Espírito Santo", sigla: "ES" },
			{ nome: "Goiás", sigla: "GO" },
			{ nome: "Maranhão", sigla: "MA" },
			{ nome: "Mato Grosso", sigla: "MT" },
			{ nome: "Mato Grosso do Sul", sigla: "MS" },
			{ nome: "Minas Gerais", sigla: "MG" },
			{ nome: "Paraná", sigla: "PR" },
			{ nome: "Paraíba", sigla: "PB" },
			{ nome: "Pará", sigla: "PA" },
			{ nome: "Pernambuco", sigla: "PE" },
			{ nome: "Piauí", sigla: "PI" },
			{ nome: "Rio Grande do Norte", sigla: "RN" },
			{ nome: "Rio Grande do Sul", sigla: "RS" },
			{ nome: "Rio de Janeiro", sigla: "RJ" },
			{ nome: "Rondônia", sigla: "RO" },
			{ nome: "Roraima", sigla: "RR" },
			{ nome: "Santa Catarina", sigla: "SC" },
			{ nome: "Sergipe", sigla: "SE" },
			{ nome: "São Paulo", sigla: "SP" },
			{ nome: "Tocantins", sigla: "TO" },
		];
	},
	async listarCidades(
		estado: string
	): Promise<CidadeInterface[] | undefined> {
		try {
			const resposta: AxiosResponse<
				{
					nome: string;
					id: number;
				}[],
				any
			> = stringParaObjeto_ServicoLocalizacao(
				await ServicoAPI.request<{ nome: string; id: number }[]>({
					/* usando a chave 'baseURL' aqui isso irá sobrescrever a URL base que está
					 * no 'ServicoAPI', que, no caso, é o endereço do servidor local
					 */
					baseURL:
						"https://servicodados.ibge.gov.br/api/v1/localidades/estados/",
					url: `${estado}/municipios`,
				}),
				"resposta"
			);
			return resposta.data.map((cidade) => ({
				cidade: cidade.nome,
				codigo_ibge: cidade.id,
			}));
		} catch (erro) {}
	},
	async localizarCEP(cep: string): Promise<CepResposta | undefined> {
		try {
			const resposta: AxiosResponse<CepResposta, any> =
				stringParaObjeto_ServicoLocalizacao(
					await ServicoAPI.request<CepResposta>({
						url: "api/enderecos?cep=" + cep.replace(/\D/g, ""),
					}),
					"resposta"
				);
			return resposta.data;
		} catch (erro) {}
	},
};
