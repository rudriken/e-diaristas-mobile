import { ScrollView, View } from "react-native";
import useContratacao from "logica/ganchos/pages/useContratacao.page";
import MigalhaDePao from "visual/componentes/navegacao/MigalhaDePao/MigalhaDePao";
import { ActivityIndicator } from "react-native";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import { FormularioUsuarioContainer } from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";
import { FormProvider } from "react-hook-form";
import DetalhesServico from "./_detalhes-servico";
import CadastroCliente from "./_cadastro-cliente";
import InformacoesPagamento from "./_informacoes-pagamento";
import {
	ConfirmacaoContainer,
	ConfirmacaoTitulo,
	ConfirmacaoParagrafo,
} from "./_contratacao.styled";
import IconeDeFonte from "visual/componentes/exibe-dados/IconeDeFonte/IconeDeFonte";
import { useTheme } from "@emotion/react";
import Botao from "visual/componentes/entradas/Botao/Botao";
import { Portal } from "react-native-paper";

const Contratacao: React.FC = () => {
	const {
		passo,
		alterarPasso,
		migalhaDePaoItens,
		formularioServico,
		formularioCliente,
		formularioPagamento,
		aoSubmeterFormularioServico,
		aoSubmeterFormularioCliente,
		aoSubmeterFormularioPagamento,
		servicos,
		podemosAtender,
		tamanhoCasa,
	} = useContratacao();
	const cores = useTheme().colors;

	if (!servicos || servicos.length < 1 || !Array.isArray(servicos)) {
		return (
			<View style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size={100} />
			</View>
		);
	}

	return (
		<ScrollView>
			{passo < 4 && (
				<MigalhaDePao
					itens={migalhaDePaoItens}
					selecionado={migalhaDePaoItens[passo - 1]}
				/>
			)}
			{passo === 1 && (
				<TituloPagina titulo="Nos conte um pouco sobre o serviço!" />
			)}

			{passo === 2 && (
				<TituloPagina titulo="Precisamos conhecer um pouco sobre você!" />
			)}

			{passo === 3 && (
				<TituloPagina
					titulo={"Informe os dados do cartão para pagamento"}
					subtitulo={
						"Será feita uma reserva, mas o valor só será descontado quando " +
						"você confirmar a presença do/da diarista"
					}
				/>
			)}

			<FormularioUsuarioContainer>
				<View style={{ display: passo !== 1 ? "none" : "flex" }}>
					<FormProvider {...formularioServico}>
						<DetalhesServico
							servicos={servicos}
							comodos={tamanhoCasa.length}
							podemosAtender={podemosAtender}
							aoSubmeter={formularioServico.handleSubmit(
								aoSubmeterFormularioServico
							)}
						/>
					</FormProvider>
				</View>

				<View style={{ display: passo !== 2 ? "none" : "flex" }}>
					<FormProvider {...formularioCliente}>
						<CadastroCliente
							paraVoltar={() => alterarPasso(1)}
							aoSubmeter={formularioCliente.handleSubmit(
								aoSubmeterFormularioCliente
							)}
						/>
					</FormProvider>
				</View>

				{passo === 3 && (
					<FormProvider {...formularioPagamento}>
						<InformacoesPagamento
							aoSubmeter={formularioPagamento.handleSubmit(
								aoSubmeterFormularioPagamento
							)}
						/>
					</FormProvider>
				)}

				{passo === 4 && (
					<Portal>
						<ConfirmacaoContainer>
							<ConfirmacaoTitulo>
								Pagamento realizado com sucesso!
							</ConfirmacaoTitulo>
							<ConfirmacaoParagrafo>
								Vamos escolher o/a melhor diarista para lhe
								atender. Aguarde nossa confirmação!
							</ConfirmacaoParagrafo>
							<IconeDeFonte
								icone={"check-circle"}
								cor={cores.accent}
								tamanho={145}
							/>
							<Botao
								uppercase={false}
								dark
								buttonColor={cores.accent}
								mode={"contained"}
								style={{ marginTop: 40 }}
								larguraTotal
							>
								Ir para minhas diárias
							</Botao>
						</ConfirmacaoContainer>
					</Portal>
				)}
			</FormularioUsuarioContainer>
		</ScrollView>
	);
};

export default Contratacao;
