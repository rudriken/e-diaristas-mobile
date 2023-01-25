import { View, Text } from "react-native";
import Botao from "visual/componentes/entradas/Botao/Botao";

const Index = () => {
	return (
		<View>
			<Text>Tela Index</Text>
			<Botao mode={"outlined"} onPress={() => {}}>
				Botão 1
			</Botao>
			<Botao mode={"contained"} onPress={() => {}}>
				Botão 2
			</Botao>
			<Botao mode={"elevated"} onPress={() => {}}>
				Botão 3
			</Botao>
		</View>
	);
};

export default Index;
