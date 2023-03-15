import { ScrollView, View, Text } from "react-native";
import useMinhasDiarias from "logica/ganchos/pages/diarias/useMinhasDiarias.page";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import Botao from "visual/componentes/entradas/Botao/Botao";
import { BotoesContainer } from "./_minhas-diarias.styled";
import { Paragraph } from "react-native-paper";
import ListaDeDados from "visual/componentes/exibe-dados/ListaDeDados/ListaDeDados";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import { ServicoDiaria } from "logica/servicos/ServicoDiaria";
import { DiariaInterface, DiariaStatus } from "logica/@tipos/DiariaInterface";
import { useTheme } from "@emotion/react";
import { SelecaoDialogo } from "./_minhas-diarias-dialogos";

const MinhasDiarias = () => {
	const {
		dadosFiltrados,
		diariaVisualizar,
		alterarDiariaVisualizar,
		podeVisualizar,
		alterarDiariaConfirmar,
		podeConfirmar,
		alterarDiariaAvaliar,
		podeAvaliar,
		podeCancelar,
		alterarDiariaCancelar,
		filtro,
		modificarFiltro,
	} = useMinhasDiarias();
	const cores = useTheme().colors;

	return (
		<ScrollView>
			<TituloPagina titulo={"Minhas Diárias"} />
			<BotoesContainer>
				<Botao
					uppercase={false}
					dark
					onPress={() => modificarFiltro("pendentes")}
					mode={filtro === "pendentes" ? "contained" : "outlined"}
					style={{ width: 133 }}
				>
					Pendentes
				</Botao>
				<Botao
					uppercase={false}
					dark
					onPress={() => modificarFiltro("avaliadas")}
					mode={filtro === "avaliadas" ? "contained" : "outlined"}
					style={{ width: 133 }}
				>
					Avaliadas
				</Botao>
				<Botao
					uppercase={false}
					dark
					onPress={() => modificarFiltro("canceladas")}
					mode={filtro === "canceladas" ? "contained" : "outlined"}
					style={{ width: 133 }}
				>
					Canceladas
				</Botao>
			</BotoesContainer>

			{dadosFiltrados.length > 0 ? (
				<>
					{dadosFiltrados.map((item) => {
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
									</View>
								}
								corpo={
									<>
										<Text style={{ color: "white" }}>
											Status:{" "}
											{
												ServicoDiaria.pegarStatus(
													item.status as DiariaStatus
												).rotulo
											}
										</Text>
										<Text style={{ color: "white" }}>
											Valor:{" "}
											{ServicoFormatadorDeTexto.formatarMoeda(
												item.preco
											)}
										</Text>
									</>
								}
								acoes={
									<>
										{podeVisualizar(item) && (
											<Botao
												uppercase={false}
												dark
												mode={"contained"}
												buttonColor={cores.secondary}
												onPress={() =>
													alterarDiariaVisualizar(
														item
													)
												}
											>
												Detalhes
											</Botao>
										)}
										{podeConfirmar(item) && (
											<Botao
												uppercase={false}
												dark
												mode={"contained"}
												buttonColor={cores.success}
												onPress={() =>
													alterarDiariaConfirmar(item)
												}
											>
												Confirmar Presença
											</Botao>
										)}
										{podeAvaliar(item) && (
											<Botao
												uppercase={false}
												dark
												mode={"contained"}
												buttonColor={cores.success}
												onPress={() =>
													alterarDiariaAvaliar(item)
												}
											>
												Avaliar
											</Botao>
										)}
										{podeCancelar(item) && (
											<Botao
												uppercase={false}
												dark
												mode={"contained"}
												buttonColor={cores.error}
												onPress={() =>
													alterarDiariaCancelar(item)
												}
											>
												Cancelar
											</Botao>
										)}
									</>
								}
							/>
						);
					})}
				</>
			) : (
				<Paragraph style={{ textAlign: "center", paddingTop: 80 }}>
					Nenhuma diária ainda
				</Paragraph>
			)}

			{diariaVisualizar.id && (
				<SelecaoDialogo
					diaria={diariaVisualizar}
					aoConfirmar={() =>
						alterarDiariaVisualizar({} as DiariaInterface)
					}
					aoCancelar={() =>
						alterarDiariaVisualizar({} as DiariaInterface)
					}
				/>
			)}
		</ScrollView>
	);
};

export default MinhasDiarias;
