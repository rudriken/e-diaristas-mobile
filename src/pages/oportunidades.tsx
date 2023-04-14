import { useTheme } from "@emotion/react";
import useOportunidadesTrabalho from "logica/ganchos/pages/useOportunidades.page";
import { ScrollView, View, Text } from "react-native";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import { stringParaObjeto } from "logica/servicos/funcoesReparadoras";
import { Caption, Paragraph } from "react-native-paper";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import ListaDeDados from "visual/componentes/exibe-dados/ListaDeDados/ListaDeDados";
import Botao from "visual/componentes/entradas/Botao/Botao";
import Dialogo from "visual/componentes/retorno/Dialogo/Dialogo";
import { CaixinhaDeTrabalho } from "@parciais/diarias/_minhas-diarias-dialogos";
import { DiariaInterface } from "logica/@tipos/DiariaInterface";
import InformacaoDoUsuario from "visual/componentes/exibe-dados/InformacaoDoUsuario/InformacaoDoUsuario";

const Oportunidades = () => {
	const cores = useTheme().colors;
	const {
		oportunidades,
		totalComodos,
		oportunidadeSelecionada,
		alterarOportunidadeSelecionada,
		podeCandidatar,
		seCandidatar,
	} = useOportunidadesTrabalho();

	return (
		<ScrollView>
			<TituloPagina titulo={"Oportunidades de trabalho"} />

			{oportunidades.length > 0 ? (
				<>
					{oportunidades.map((item) => {
						return (
							<ListaDeDados
								key={item.id}
								cabecalho={
									<View>
										<Text>
											Data:{" "}
											{ServicoFormatadorDeTexto.reverterFormatoDeData(
												item.data_atendimento as string
											)}
										</Text>
										<Text>{item.nome_servico}</Text>
										<Text>
											{ServicoFormatadorDeTexto.formatarMoeda(
												item.preco
											)}
										</Text>
									</View>
								}
								corpo={
									<>
										<Text style={{ color: "white" }}>
											Cidade: {item.cidade}
										</Text>
										<Text style={{ color: "white" }}>
											Número de cômodos:{" "}
											{totalComodos(item)}
										</Text>
									</>
								}
								acoes={
									<>
										{podeCandidatar(item) && (
											<Botao
												uppercase={false}
												dark
												buttonColor={cores.secondary}
												mode={"contained"}
												onPress={() =>
													alterarOportunidadeSelecionada(
														item
													)
												}
											>
												Se candidatar
											</Botao>
										)}
									</>
								}
							/>
						);
					})}
				</>
			) : (
				<Paragraph style={{ paddingTop: 80, textAlign: "center" }}>
					Nenhuma oportunidade ainda
				</Paragraph>
			)}

			{oportunidadeSelecionada !== undefined && (
				<Dialogo
					aberto={true}
					aoFechar={() => alterarOportunidadeSelecionada(undefined)}
					subtitulo={
						"Tem certeza que deseja se candidatar à diária abaixo?"
					}
					aoConfirmar={() =>
						oportunidadeSelecionada &&
						seCandidatar(oportunidadeSelecionada)
					}
				>
					<ScrollView>
						<CaixinhaDeTrabalho
							diaria={oportunidadeSelecionada as DiariaInterface}
						/>
						<InformacaoDoUsuario
							nome={
								oportunidadeSelecionada?.cliente
									.nome_completo || ""
							}
							avaliacao={
								oportunidadeSelecionada?.cliente.reputacao || 0
							}
							foto={
								oportunidadeSelecionada?.cliente.foto_usuario ||
								""
							}
						/>
						{oportunidadeSelecionada !== undefined &&
							oportunidadeSelecionada?.avaliacoes_cliente.length >
								0 && (
								<ListaDeDados
									cabecalho={
										<Text>
											Últimas avaliações do clien-te
										</Text>
									}
									corpo={
										<>
											{oportunidadeSelecionada?.avaliacoes_cliente.map(
												(item, indice) => {
													return (
														<InformacaoDoUsuario
															key={indice}
															nome={
																item.nome_avaliador
															}
															foto={
																item.foto_avaliador
															}
															avaliacao={
																item.nota
															}
															descricao={
																item.descricao
															}
														/>
													);
												}
											)}
										</>
									}
								/>
							)}
						<Caption style={{ paddingTop: 16, paddingBottom: 16 }}>
							Ao se candidatar você ainda não é o(a) diarista
							escolhido(a) para realizar o trabalho. Vamos
							analisar suas qualificações e a distância para o
							local da diária. Caso você seja a pessoa
							selecionada, receberá um e-mail avisando. Atente-se
							à sua caixa de entrada!
						</Caption>
					</ScrollView>
				</Dialogo>
			)}
		</ScrollView>
	);
};

export default Oportunidades;
