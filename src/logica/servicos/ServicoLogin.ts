import { CredenciaisInterface } from "logica/@tipos/FormularioInterface";
import { InterfaceDoUsuario } from "logica/@tipos/InterfaceDoUsuario";
import { LocalStorage } from "./ServicoArmazenamento";
import { ServicoAPI, stringParaObjeto_ServicoAPI } from "./ServicoAPI";

export const ServicoLogin = {
	async entrar(credenciais: CredenciaisInterface): Promise<boolean> {
		try {
			const data: {
				acesso: string;
				refresh: string;
				token_tipo: string;
				expira_em: number;
			} = stringParaObjeto_ServicoAPI(
				(
					await ServicoAPI.post<{
						acesso: string;
						refresh: string;
						token_tipo: string;
						expira_em: number;
					}>("/autenticacao/token", credenciais)
				).data,
				"data de 'ServicoLogin.entrar'"
			);
			LocalStorage.gravar("token", data.acesso);
			LocalStorage.gravar("token_refresh", data.refresh);
			ServicoAPI.defaults.headers.common["Authorization"] =
				"Bearer " + data.acesso;
			return true;
		} catch (erro) {
			return false;
		}
	},
	sair() {
		ServicoAPI.post("/autenticacao/logout", {
			refresh: LocalStorage.pegar("token_refresh", ""),
		});
		LocalStorage.apagar("token");
		LocalStorage.apagar("token_refresh");
	},
	async informacoes(): Promise<InterfaceDoUsuario | undefined> {
		const token = await LocalStorage.pegar("token", "");
		if (token) {
			ServicoAPI.defaults.headers.common.Authorization =
				"Bearer " + token;
			const resposta: InterfaceDoUsuario = stringParaObjeto_ServicoAPI(
				(await ServicoAPI.get<InterfaceDoUsuario>("/api/eu")).data,
				"resposta de 'ServicoLogin.informacoes'"
			);
			return resposta;
		}
		return undefined;
	},
};
