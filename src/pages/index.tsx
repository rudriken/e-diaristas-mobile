import { View, Text } from "react-native";
import Botao from "visual/componentes/entradas/Botao/Botao";
import IconeDeFonte from "visual/componentes/exibe-dados/IconeDeFonte/IconeDeFonte";

const Index = () => {
	return (
		<View>
			<Text>Tela Index</Text>
			<Botao onPress={() => {}} uppercase={false} mode={"text"}	>Botão 1</Botao>
			<Botao onPress={() => {}} mode={"outlined"}					>Botão 2</Botao>
			<Botao onPress={() => {}} mode={"contained"}				>Botão 3</Botao>
			<Botao onPress={() => {}} larguraTotal mode={"elevated"}	>Botão 4</Botao>
			<Botao onPress={() => {}} mode={"contained-tonal"}			>Botão 5</Botao>
			<IconeDeFonte icone={"camera"} cor={"red"} tamanho={60} />
		</View>
	);
};

export default Index;
