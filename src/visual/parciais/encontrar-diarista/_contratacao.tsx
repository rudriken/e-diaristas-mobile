import { Text } from "react-native";
import Botao from "visual/componentes/entradas/Botao/Botao";
import ListaDeDados from "visual/componentes/exibe-dados/ListaDeDados/ListaDeDados";

const Contratacao: React.FC = () => {
	return (
		<>
			<ListaDeDados
				cabecalho={<Text>Título</Text>}
				corpo={
					<>
						<Text style={{ color: "white" }}>texto</Text>
						<Text style={{ color: "yellow" }}>texto</Text>
						<Text style={{ color: "pink" }}>texto</Text>
						<Text style={{ color: "#11e91c" }}>texto</Text>
						<Text style={{ color: "#aaa" }}>texto</Text>
						<Text>texto</Text>
					</>
				}
				acoes={
					<>
						<Botao mode={"contained"} uppercase={false} dark>
							Não
						</Botao>
						<Botao mode={"contained"} uppercase={false} dark>
							Sim
						</Botao>
					</>
				}
			/>
		</>
	);
};

export default Contratacao;
