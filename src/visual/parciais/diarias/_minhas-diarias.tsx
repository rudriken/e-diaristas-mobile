import { ScrollView } from "react-native";
import useMinhasDiarias from "logica/ganchos/pages/diarias/useMinhasDiarias.page";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import Botao from "visual/componentes/entradas/Botao/Botao";
import { BotoesContainer } from "./_minhas-diarias.styled";

const MinhasDiarias = () => {
	const { filtro, modificarFiltro } = useMinhasDiarias();

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
		</ScrollView>
	);
};

export default MinhasDiarias;
