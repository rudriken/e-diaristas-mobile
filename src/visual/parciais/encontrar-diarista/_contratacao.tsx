import { ScrollView, Text, View } from "react-native";
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
import { useEffect, useRef } from "react";
import { ServicoMovel } from "logica/servicos/ServicoMovel";
import ListaDeDados from "visual/componentes/exibe-dados/ListaDeDados/ListaDeDados";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";

interface ContratacaoProps {
	aoFinalizar: () => void;
}

const Contratacao: React.FC<ContratacaoProps> = ({ aoFinalizar }) => {
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
		tipoLimpeza,
		totalPreco,
		tamanhoCasa,
	} = useContratacao();
	const cores = useTheme().colors;
	const scrollViewRef = useRef<ScrollView>(null);
	const dataAtendimento = formularioServico.watch(
		"faxina.data_atendimento",
		""
	);

	useEffect(() => {
		setTimeout(() => {
			ServicoMovel.rolarParaCima(scrollViewRef.current);
		}, 100);
	}, [passo]);

	if (!servicos || servicos.length < 1 || !Array.isArray(servicos)) {
		return (
			<View style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size={100} />
			</View>
		);
	}

	return (
		<ScrollView ref={scrollViewRef}>
			{passo < 4 && (
				<MigalhaDePao
					itens={migalhaDePaoItens}
					selecionado={migalhaDePaoItens[passo - 1]}
				/>
			)}

			{[2, 3].includes(passo) && (
				<ListaDeDados
					cabecalho={
						<Text>
							O valor total do serviço é:{" "}
							{ServicoFormatadorDeTexto.formatarMoeda(totalPreco)}
						</Text>
					}
					corpo={
						<>
							<Text style={{ color: "white" }}>
								{tipoLimpeza?.nome}
							</Text>
							<Text style={{ color: "white" }}>
								Tamanho: {tamanhoCasa.join(" ,")}
							</Text>
							<Text style={{ color: "white" }}>
								Data: {dataAtendimento as string}
							</Text>
						</>
					}
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
								onPress={aoFinalizar}
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
