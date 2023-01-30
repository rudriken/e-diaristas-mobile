import { View, Text } from "react-native";
import Botao from "visual/componentes/entradas/Botao/Botao";

const Index = () => {
	return (
		<View>
			<Text>Tela Index</Text>
			<Botao onPress={() => {}} uppercase={false} mode={"text"}	>Botão 1</Botao>
			<Botao onPress={() => {}} mode={"outlined"}					>Botão 2</Botao>
			<Botao onPress={() => {}} mode={"contained"}				>Botão 3</Botao>
			<Botao onPress={() => {}} larguraTotal mode={"elevated"}		>Botão 4</Botao>
			<Botao onPress={() => {}} mode={"contained-tonal"}			>Botão 5</Botao>
		</View>
	);
};

export default Index;
