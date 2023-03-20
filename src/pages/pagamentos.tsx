import { ScrollView, Text } from "react-native";
import { Paragraph } from "react-native-paper";
import usePagamentos from "logica/ganchos/pages/usePagamentos.page";
import { ServicoPagamento } from "logica/servicos/ServicoPagamento";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import ListaDeDados from "visual/componentes/exibe-dados/ListaDeDados/ListaDeDados";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import Botao from "visual/componentes/entradas/Botao/Botao";
import { BotoesContainer } from "@parciais/diarias/_minhas-diarias.styled";

const Pagamentos = () => {
	const { dadosFiltrados } = usePagamentos();
	return (
		<ScrollView>
			<TituloPagina titulo={"Pagamentos"} />
			<BotoesContainer>
				<Botao uppercase={false} dark>
					Pago
				</Botao>
				<Botao uppercase={false} dark>
					Aguardando Transferência
				</Botao>
			</BotoesContainer>

			{true ? (
				<>
					{dadosFiltrados.map((item) => {
						return (
							<ListaDeDados
								key={item.id}
								cabecalho={
									<Text>
										Data:{" "}
										{ServicoFormatadorDeTexto.reverterFormatoDeData(
											item.created_at
										)}
									</Text>
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
