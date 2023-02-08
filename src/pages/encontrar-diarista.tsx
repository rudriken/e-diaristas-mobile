import { View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { listaDeParametrosDaPilhaRaiz } from "visual/roteador/Roteador";
import { useNavigation } from "@react-navigation/native";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import CampoDeTexto from "visual/componentes/entradas/CampoDeTexto/CampoDeTexto";

type NavegacaoProp = StackNavigationProp<
	listaDeParametrosDaPilhaRaiz,
	"EncontrarDiarista"
>;

const EncontrarDiarista: React.FC = () => {
	const navegacao = useNavigation<NavegacaoProp>();
	return (
		<View>
			<Text>Encontrar Diarista</Text>
			<TituloPagina
				titulo={"React Native"}
				subtitulo={
					"Projeto mobile 'e-diaristas-mobile' da imersão Multi-stack"
				}
			/>
			<CampoDeTexto label={"CEP"} />
		</View>
	);
};

export default EncontrarDiarista;
