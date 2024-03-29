import { ScrollView, View, Text } from "react-native";
import { Paragraph } from "react-native-paper";
import usePagamentos from "logica/ganchos/pages/usePagamentos.page";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import { ServicoPagamento } from "logica/servicos/ServicoPagamento";
import { BotoesContainer } from "@parciais/diarias/_minhas-diarias.styled";
import Botao from "visual/componentes/entradas/Botao/Botao";
import ListaDeDados from "visual/componentes/exibe-dados/ListaDeDados/ListaDeDados";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";

const Pagamentos = () => {
	const { dadosFiltrados, filtro, modificarFiltro } = usePagamentos();
	return (
		<ScrollView>
			<TituloPagina titulo={"Pagamentos"} />
			<BotoesContainer>
				<Botao
					uppercase={false}
					dark
					onPress={() => modificarFiltro("pago")}
					mode={filtro === "pago" ? "contained" : "outlined"}
				>
					Pago
				</Botao>
				<Botao
					uppercase={false}
					dark
					onPress={() => modificarFiltro("aguardando")}
					mode={filtro === "aguardando" ? "contained" : "outlined"}
				>
					Aguardando Transferência
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
												item.created_at
											)}
										</Text>
									</View>
								}
								corpo={
									<>
										<Text style={{ color: "white" }}>
											Status:{" "}
											{
												ServicoPagamento.pegarStatus(
													item.status
												).rotulo
											}
										</Text>
										<Text style={{ color: "white" }}>
											Valor diária:{" "}
											{ServicoFormatadorDeTexto.formatarMoeda(
												item.valor
											)}
										</Text>
										<Text style={{ color: "white" }}>
											Valor depósito:{" "}
											{ServicoFormatadorDeTexto.formatarMoeda(
												item.valor_deposito
											)}
										</Text>
									</>
								}
							/>
						);
					})}
				</>
			) : (
				<Paragraph style={{ paddingTop: 80, textAlign: "center" }}>
					Nenhum pagamento ainda
				</Paragraph>
			)}
		</ScrollView>
	);
};

export default Pagamentos;
