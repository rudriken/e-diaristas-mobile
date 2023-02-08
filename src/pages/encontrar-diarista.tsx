import { View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { listaDeParametrosDaPilhaRaiz } from "visual/roteador/Roteador";
import { useNavigation } from "@react-navigation/native";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import CampoDeTextoComMascara from "visual/componentes/entradas/CampoDeTextoComMascara/CampoDeTextoComMascara";
import { useState } from "react";

type NavegacaoProp = StackNavigationProp<
	listaDeParametrosDaPilhaRaiz,
	"EncontrarDiarista"
>;

const EncontrarDiarista: React.FC = () => {
	const navegacao = useNavigation<NavegacaoProp>();
	const [texto, alterarTexto] = useState("");
	return (
		<View>
			<Text>Encontrar Diarista</Text>
			<TituloPagina
				titulo={"React Native"}
				subtitulo={
					"Projeto mobile 'e-diaristas-mobile' da imersão Multi-stack"
				}
			/>
			<CampoDeTextoComMascara
				mascara={"99.999-999"}
				label={"CEP"}
				value={texto}
				onChangeText={alterarTexto}
				keyboardType={"number-pad"}
			/>
		</View>
	);
};

export default EncontrarDiarista;
