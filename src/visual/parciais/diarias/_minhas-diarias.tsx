import { ScrollView, View, Text } from "react-native";
import useMinhasDiarias from "logica/ganchos/pages/diarias/useMinhasDiarias.page";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import Botao from "visual/componentes/entradas/Botao/Botao";
import { BotoesContainer } from "./_minhas-diarias.styled";
import { Paragraph } from "react-native-paper";
import ListaDeDados from "visual/componentes/exibe-dados/ListaDeDados/ListaDeDados";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import { ServicoDiaria } from "logica/servicos/ServicoDiaria";
import { DiariaStatus } from "logica/@tipos/DiariaInterface";

const MinhasDiarias = () => {
	const { dadosFiltrados, filtro, modificarFiltro } = useMinhasDiarias();

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
							/>
						);
					})}
				</>
			) : (
				<Paragraph style={{ textAlign: "center", paddingTop: 80 }}>
					Nenhuma diária ainda
				</Paragraph>
			)}
		</ScrollView>
	);
};

export default MinhasDiarias;
