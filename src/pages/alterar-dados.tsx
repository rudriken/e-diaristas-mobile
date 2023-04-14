import { ScrollView, View } from "react-native";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import { FormProvider, Controller } from "react-hook-form";
import { useTheme } from "@emotion/react";
import useAlterarDados from "logica/ganchos/pages/useAlterarDados.page";
import { ServicoLogin } from "logica/servicos/ServicoLogin";
import {
	InterfaceDoUsuario,
	TipoDoUsuario,
} from "logica/@tipos/InterfaceDoUsuario";
import {
	FormularioCidades,
	FormularioContato,
	FormularioDadosUsuario,
	FormularioEndereco,
	FormularioFinanceiro,
	FormularioUsuarioContainer,
	TituloDoGrupoDeCampoFormulario,
} from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";
import Botao from "visual/componentes/entradas/Botao/Botao";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import CampoDeArquivo from "visual/componentes/entradas/CampoDeArquivo/CampoDeArquivo";
import { FormularioContainer } from "@parciais/encontrar-diarista/_verificar-profissionais.styled";
import { repararObjeto_EstadoUsuario } from "logica/servicos/funcoesReparadoras";

const AlterarDados = () => {
	const { despachoUsuario } = repararObjeto_EstadoUsuario();
	const {
		usuario,
		formularioMetodos,
		foto,
		alterarArquivoDaFoto,
		enderecoUsuario,
		aoSubmeterFormulario,
		mensagemDeFeedback,
		alterarMensagemDeFeedback,
	} = useAlterarDados();
	const cores = useTheme().colors;

	function sair() {
		ServicoLogin.sair();
		despachoUsuario({
			tipo: "SET_USER",
			carregarObjeto: {
				nome_completo: "",
				nascimento: "",
				cpf: "",
				email: "",
				foto_usuario: "",
				telefone: "",
				tipo_usuario: TipoDoUsuario.Cliente,
				reputacao: 0,
				chave_pix: "",
			} as InterfaceDoUsuario,
		});
	}

	console.log(formularioMetodos);
	if (!usuario.nome_completo) {
		return (
			<View style={{ marginTop: 40 }}>
				<ActivityIndicator size={100} />
				<Botao onPress={sair}>Sair</Botao>
			</View>
		);
	}

	return (
		<>
			<ScrollView>
				<TituloPagina titulo={"Alterar dados cadastrais"} />
				<FormularioUsuarioContainer>
					<FormProvider {...formularioMetodos}>
						<View style={{ marginBottom: 40 }}>
							<Controller
								control={formularioMetodos.control}
								name={"usuario.foto_usuario"}
								defaultValue={foto}
								render={({ field }) => {
									return (
										<CampoDeArquivo
											valorPadrao={foto}
											aoAlterar={(arquivo) => {
												field.onChange([arquivo]);
												alterarArquivoDaFoto(arquivo);
											}}
										/>
									);
								}}
							/>
							<TituloDoGrupoDeCampoFormulario
								style={{ marginTop: 40 }}
							>
								Dados Pessoais
							</TituloDoGrupoDeCampoFormulario>
							<FormularioContainer>
								<FormularioDadosUsuario />
							</FormularioContainer>
						</View>

						{usuario.tipo_usuario === TipoDoUsuario.Diarista && (
							<View style={{ marginBottom: 40 }}>
								<TituloDoGrupoDeCampoFormulario
									style={{ marginTop: 40 }}
								>
									Financeiro
								</TituloDoGrupoDeCampoFormulario>
								<FormularioContainer>
									<FormularioFinanceiro />
								</FormularioContainer>
							</View>
						)}

						<View style={{ marginBottom: 40 }}>
							<TituloDoGrupoDeCampoFormulario
								style={{ marginTop: 40 }}
							>
								Dados de acesso
							</TituloDoGrupoDeCampoFormulario>
							<FormularioContainer>
								<FormularioContato />
							</FormularioContainer>
						</View>

						{usuario.tipo_usuario === TipoDoUsuario.Diarista && (
							<>
								<View style={{ marginBottom: 40 }}>
									<TituloDoGrupoDeCampoFormulario
										style={{ marginTop: 40 }}
									>
										Endereço
									</TituloDoGrupoDeCampoFormulario>
									<FormularioContainer>
										<FormularioEndereco />
									</FormularioContainer>
								</View>
								<View style={{ marginBottom: 40 }}>
									<TituloDoGrupoDeCampoFormulario
										style={{ marginTop: 40 }}
									>
										Cidades
									</TituloDoGrupoDeCampoFormulario>
									<FormularioContainer>
										<FormularioCidades
											estado={enderecoUsuario.estado}
										/>
									</FormularioContainer>
								</View>
							</>
						)}

						<Botao
							uppercase={false}
							dark
							mode={"contained"}
							buttonColor={cores.accent}
							larguraTotal
							style={{ marginBottom: 16 }}
							onPress={formularioMetodos.handleSubmit(
								aoSubmeterFormulario
							)}
						>
							Salvar
						</Botao>
						<Botao uppercase={false} larguraTotal onPress={sair}>
							Sair
						</Botao>
					</FormProvider>
				</FormularioUsuarioContainer>
			</ScrollView>

			<Snackbar
				visible={mensagemDeFeedback.length > 0}
				duration={4000}
				onDismiss={() => alterarMensagemDeFeedback("")}
			>
				{mensagemDeFeedback}
			</Snackbar>
		</>
	);
};

export default AlterarDados;
