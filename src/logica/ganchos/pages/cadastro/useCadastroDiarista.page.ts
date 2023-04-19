import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LocalStorage } from "logica/servicos/ServicoArmazenamento";
import {
	linksResolver,
	ServicoAPI,
	ServicoAPIHateoas,
} from "logica/servicos/ServicoAPI";
import { ServicoUsuario } from "logica/servicos/ServicoUsuario";
import { ApiLinksInterface } from "logica/@tipos/ApiLinksInterface";
import { EnderecoInterface } from "logica/@tipos/EnderecoInterface";
import { CadastroDiaristaFormularioDeDadosInterface } from "logica/@tipos/FormularioInterface";
import {
	InterfaceDoUsuario,
	TipoDoUsuario,
} from "logica/@tipos/InterfaceDoUsuario";
import { ServicoEstruturaFormulario } from "logica/servicos/ServicoEstruturaFormulario";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import {
	repararObjeto_ServicosExternos,
	stringParaObjeto,
} from "logica/servicos/funcoesReparadoras";

export default function useCadastroDiarista() {
	const [passo, alterarPasso] = useState(1),
		[esperandoResposta, alterarEsperandoResposta] = useState(false),
		[novoUsuario, alterarNovoUsuario] = useState<InterfaceDoUsuario>(),
		[novoEndereco, alterarNovoEndereco] = useState<EnderecoInterface>(),
		[sucessoCadastro, alterarSucessoCadastro] = useState(false),
		{ estadoServicosExternos } = repararObjeto_ServicosExternos(),
		migalhaDePaoItens = ["Identificação", "Cidades atendidas"],
		formularioUsuario = useForm<CadastroDiaristaFormularioDeDadosInterface>(
			{
				resolver: yupResolver(
					ServicoEstruturaFormulario.dadosUsuario()
						.concat(ServicoEstruturaFormulario.endereco())
						.concat(ServicoEstruturaFormulario.novoContato())
				),
			}
		),
		formularioListaDeCidades =
			useForm<CadastroDiaristaFormularioDeDadosInterface>(),
		cidadesAtendidas = formularioListaDeCidades.watch("cidadesAtendidas");

	async function aoSubmeterUsuario(
		dados: CadastroDiaristaFormularioDeDadosInterface
	) {
		alterarEsperandoResposta(true);
		const novoUsuarioLink = linksResolver(
			estadoServicosExternos.servicosExternos,
			"cadastrar_usuario"
		);
		if (novoUsuarioLink) {
			try {
				await cadastrarUsuario(dados, novoUsuarioLink);
			} catch (erro) {
				tratarErroDeCadastroDeUsuario(erro);
			}
		}
	}

	async function cadastrarUsuario(
		dados: CadastroDiaristaFormularioDeDadosInterface,
		link: ApiLinksInterface
	) {
		const novoUsuario: InterfaceDoUsuario | undefined = stringParaObjeto(
			await ServicoUsuario.cadastrar(
				dados.usuario,
				TipoDoUsuario.Diarista,
				link
			),
			"novoUsuario de 'cadastrarUsuario'"
		);

		if (novoUsuario) {
			alterarNovoUsuario(novoUsuario);
			cadastrarEndereco(dados, novoUsuario);
			alterarEsperandoResposta(false);
			alterarPasso(2);
		}
	}

	async function cadastrarEndereco(
		dados: CadastroDiaristaFormularioDeDadosInterface,
		novoUsuario: InterfaceDoUsuario
	) {
		ServicoAPI.defaults.headers.common.Authorization =
			"Bearer " + novoUsuario?.token?.acesso;
		LocalStorage.gravar("token", novoUsuario.token?.acesso);
		LocalStorage.gravar("token_refresh", novoUsuario.token?.refresh);
		ServicoAPIHateoas(
			novoUsuario.links,
			"cadastrar_endereco",
			async (requisicao) => {
				const novoEndereco = (
					await requisicao<EnderecoInterface>({
						data: {
							...dados?.endereco,
							cep: ServicoFormatadorDeTexto.pegarNumerosParaTexto(
								dados?.endereco.cep
							),
						},
					})
				).data;
				novoEndereco && alterarNovoEndereco(novoEndereco);
			}
		);
	}

	function tratarErroDeCadastroDeUsuario(erro: any) {
		ServicoUsuario.tratarErroNovosUsuarios(erro, formularioUsuario);
		alterarEsperandoResposta(false);
	}

	async function aoSubmeterEndereco(
		dados: CadastroDiaristaFormularioDeDadosInterface
	) {
		if (novoUsuario) {
			ServicoAPIHateoas(
				novoUsuario.links,
				"relacionar_cidades",
				async (requerimento) => {
					try {
						alterarEsperandoResposta(true);
						await requerimento({
							data: { cidades: dados?.cidadesAtendidas },
						});
						alterarSucessoCadastro(true);
					} catch (erro) {}
				}
			);
		}
	}

	return {
		passo,
		esperandoResposta,
		migalhaDePaoItens,
		formularioUsuario,
		formularioListaDeCidades,
		novoEndereco,
		sucessoCadastro,
		cidadesAtendidas,
		aoSubmeterUsuario,
		aoSubmeterEndereco,
	};
}
