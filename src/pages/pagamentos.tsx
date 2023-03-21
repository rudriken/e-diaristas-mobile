import { BotoesContainer } from "@parciais/diarias/_minhas-diarias.styled";
import usePagamentos from "logica/ganchos/pages/usePagamentos.page";
import { ScrollView } from "react-native";
import { Paragraph } from "react-native-paper";
import Botao from "visual/componentes/entradas/Botao/Botao";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";

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

			{dadosFiltrados.length > 0 ? (
				<></>
			) : (
				<Paragraph style={{ paddingTop: 80, textAlign: "center" }}>
					Nenhum pagamento ainda
				</Paragraph>
			)}
		</ScrollView>
	);
};

export default Pagamentos;
