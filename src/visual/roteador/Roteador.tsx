import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Logo from "@assets/img/logos/e-diaristas-logo.png";
import { NavigationTema } from "visual/temas/app-tema";
import Index from "pages";
import EncontrarDiarista from "pages/encontrar-diarista";
import IconeDeFonte from "visual/componentes/exibe-dados/IconeDeFonte/IconeDeFonte";

// export type listaDeParametrosDaPilhaRaiz = {
// 	Index: undefined;
// 	EncontrarDiarista: undefined;
// };

export type listaDeParametrosDaGuiaInferiorRaiz = {
	Index: undefined;
	EncontrarDiarista: undefined;
};

// const Pilha = createStackNavigator<listaDeParametrosDaPilhaRaiz>();
const GuiaInferior =
	createBottomTabNavigator<listaDeParametrosDaGuiaInferiorRaiz>();

function pegarIcone(
	nomeDoIcone: TwIcon
): (propriedades: { color: string; size: number }) => JSX.Element {
	return ({ color, size }) => {
		return <IconeDeFonte icone={nomeDoIcone} cor={color} tamanho={size} />;
	};
}

export default function Roteador() {
	return (
		<NavigationContainer theme={NavigationTema}>
			<GuiaInferior.Navigator
				screenOptions={{
					headerTitleAlign: "center",
					headerTitle: () => (
						<Image
							source={Logo}
							style={{
								width: 150,
								height: 50,
								resizeMode: "contain",
							}}
						/>
					),
				}}
			>
				<GuiaInferior.Screen name="Index" component={Index} />
				<GuiaInferior.Screen
					name="EncontrarDiarista"
					component={EncontrarDiarista}
					options={{
						title: "Encontrar Diaristas",
						tabBarIcon: pegarIcone("bars"),
						tabBarBadge: 15,
					}}
				/>
			</GuiaInferior.Navigator>
		</NavigationContainer>
	);
}
