import { useContext } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { FormProvider, Controller } from "react-hook-form";
import useAlterarDados from "logica/ganchos/pages/useAlterarDados.page";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import { ServicoLogin } from "logica/servicos/ServicoLogin";
import {
	InterfaceDoUsuario,
	TipoDoUsuario,
} from "logica/@tipos/InterfaceDoUsuario";
import {
	FormularioDadosUsuario,
	FormularioFinanceiro,
	FormularioUsuarioContainer,
	TituloDoGrupoDeCampoFormulario,
} from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";
import Botao from "visual/componentes/entradas/Botao/Botao";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import CampoDeArquivo from "visual/componentes/entradas/CampoDeArquivo/CampoDeArquivo";
import { FormularioContainer } from "@parciais/encontrar-diarista/_verificar-profissionais.styled";

const AlterarDados = () => {
	const { despachoUsuario } = useContext(ContextoUsuario);
	const { usuario, formularioMetodos, foto, alterarArquivoDaFoto } =
		useAlterarDados();

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
						<Botao onPress={sair}>Sair</Botao>
					</FormProvider>
				</FormularioUsuarioContainer>
			</ScrollView>
		</>
	);
};

export default AlterarDados;
