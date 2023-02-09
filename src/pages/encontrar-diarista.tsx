import { View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { listaDeParametrosDaPilhaRaiz } from "visual/roteador/Roteador";
import { useNavigation } from "@react-navigation/native";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import CampoDeTextoComMascara from "visual/componentes/entradas/CampoDeTextoComMascara/CampoDeTextoComMascara";
import { useState } from "react";
import InformacaoDoUsuario from "visual/componentes/exibe-dados/InformacaoDoUsuario/InformacaoDoUsuario";

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
			<InformacaoDoUsuario
				nome={"Rodrigo Mendonça"}
				foto={"https://github.com/rudriken.png"}
				avaliacao={2}
				descricao={"Uberlândia"}
			/>
			<InformacaoDoUsuario
				nome={"Akira Hanashiro"}
				foto={"https://github.com/hanashiro.png"}
				avaliacao={5}
				descricao={"São Paulo"}
				fundoUmPoucoMaisEscuro
			/>
			<InformacaoDoUsuario
				nome={"Almeida"}
				foto={"https://github.com/almeida.png"}
				avaliacao={4}
				descricao={"Curitiba"}
			/>
		</View>
	);
};

export default EncontrarDiarista;
