import { Image, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
	createStackNavigator,
	StackNavigationOptions,
} from "@react-navigation/stack";
import {
	BottomTabNavigationOptions,
	createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Logo from "@assets/img/logos/e-diaristas-logo.png";
import { NavigationTema } from "visual/temas/app-tema";
import Index from "pages";
import EncontrarDiarista from "pages/encontrar-diarista";
import IconeDeFonte from "visual/componentes/exibe-dados/IconeDeFonte/IconeDeFonte";
import Diarista from "pages/cadastro/diarista";
import AlterarDados from "pages/alterar-dados";
import Diarias from "pages/diarias";
import Login from "pages/login";
import Oportunidades from "pages/oportunidades";
import Pagamentos from "pages/pagamentos";
import { useContext } from "react";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import {
	ForcarEstadoUsuario,
	TipoDoUsuario,
} from "logica/@tipos/InterfaceDoUsuario";
import { useTheme } from "@emotion/react";
import { ActivityIndicator, Text } from "react-native-paper";
import Botao from "visual/componentes/entradas/Botao/Botao";
import { ServicoLogin } from "logica/servicos/ServicoLogin";

export type listaDeParametrosDaPilhaRaiz = {
	Index: undefined;
	EncontrarDiarista: undefined;
	CadastroDiarista: undefined;
	Login: undefined;
};

export type listaDeParametrosDaGuiaInferiorRaiz = {
	Diarias: undefined;
	AlterarDados: undefined;
	Oportunidades: undefined;
	Pagamentos: undefined;
	EncontrarDiarista: undefined;
};

const Pilha = createStackNavigator<listaDeParametrosDaPilhaRaiz>();
const GuiaInferior =
	createBottomTabNavigator<listaDeParametrosDaGuiaInferiorRaiz>();
const opcoesDaTela = {
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
};

function pegarIcone(
	nomeDoIcone: TwIcon
): (propriedades: { color: string; size: number }) => JSX.Element {
	return ({ color, size }) => {
		return <IconeDeFonte icone={nomeDoIcone} cor={color} tamanho={size} />;
	};
}

const RotasPublicas = () => {
	return (
		<Pilha.Navigator screenOptions={opcoesDaTela as StackNavigationOptions}>
			<Pilha.Screen name={"Index"} component={Index} />
			<Pilha.Screen
				name={"EncontrarDiarista"}
				component={EncontrarDiarista}
			/>
			<Pilha.Screen name={"CadastroDiarista"} component={Diarista} />
			<Pilha.Screen name={"Login"} component={Login} />
		</Pilha.Navigator>
	);
};

const RotasPrivadas = () => {
	const { usuario } = useContext(ContextoUsuario).estadoUsuario,
		cores = useTheme().colors;
	return (
		<GuiaInferior.Navigator
			screenOptions={
				{
					...opcoesDaTela,
					tabBarActiveTintColor: cores.grey["50"],
					tabBarActiveBackgroundColor: cores.primary,
					tabBarInactiveTintColor: cores.grey["300"],
					tabBarInactiveBackgroundColor: cores.primary,
					tabBarItemStyle: { paddingTop: 4, paddingBottom: 4 },
					tabBarHideOnKeyboard: true,
				} as BottomTabNavigationOptions
			}
		>
			{usuario.tipo_usuario === TipoDoUsuario.Diarista && (
				<GuiaInferior.Screen
					name={"Oportunidades"}
					component={Oportunidades}
					options={{ tabBarIcon: pegarIcone("search") }}
				/>
			)}

			<GuiaInferior.Screen
				name={"Diarias"}
				component={Diarias}
				options={{
					title: "Diárias",
					tabBarIcon: pegarIcone("check-circle"),
				}}
			/>

			{usuario.tipo_usuario === TipoDoUsuario.Diarista ? (
				<GuiaInferior.Screen
					name={"Pagamentos"}
					component={Pagamentos}
					options={{
						tabBarIcon: pegarIcone("credit-card"),
					}}
				/>
			) : (
				<GuiaInferior.Screen
					name={"EncontrarDiarista"}
					component={EncontrarDiarista}
					options={{
						title: "Encontrar Diaristas",
						tabBarIcon: pegarIcone("search"),
					}}
				/>
			)}

			<GuiaInferior.Screen
				name={"AlterarDados"}
				component={AlterarDados}
				options={{
					title: "Alterar Dados",
					tabBarIcon: pegarIcone("woman"),
				}}
			/>
		</GuiaInferior.Navigator>
	);
};

export default function Roteador() {
	const { estadoUsuario } = useContext(ContextoUsuario);
	const logado = estadoUsuario.usuario.nome_completo.length > 0;
	const logando = estadoUsuario.logando;
	const { forcarEstadoUsuario } = estadoUsuario;

	if (logando && forcarEstadoUsuario === ForcarEstadoUsuario.nao) {
		return (
			<View style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size={100} />
				{/* <Botao onPress={ServicoLogin.sair}>Sair</Botao> */}
			</View>
		);
	}

	return (
		<NavigationContainer theme={NavigationTema}>
			{(!logado ||
				forcarEstadoUsuario === ForcarEstadoUsuario.anonimo) && (
				<RotasPublicas />
			)}
			{logado && forcarEstadoUsuario === ForcarEstadoUsuario.nao && (
				<RotasPrivadas />
			)}
		</NavigationContainer>
	);
}
