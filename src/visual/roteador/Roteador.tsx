import { View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Logo from "@assets/img/logos/e-diaristas-logo.png";
import { NavigationTema } from "visual/temas/app-tema";

const Pilha = createStackNavigator();

function Index() {
	return (
		<View>
			<Text>Tela Index</Text>
		</View>
	);
}

export default function Roteador() {
	return (
		<NavigationContainer theme={NavigationTema}>
			<Pilha.Navigator
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
				<Pilha.Screen name="Index" component={Index} />
			</Pilha.Navigator>
		</NavigationContainer>
	);
}
