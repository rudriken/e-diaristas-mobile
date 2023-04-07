import { useContext } from "react";
import { Image, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import {
	createStackNavigator,
	StackNavigationOptions,
} from "@react-navigation/stack";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import { useTheme } from "@emotion/react";
import {
	BottomTabNavigationOptions,
	createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { ServicoLogin } from "logica/servicos/ServicoLogin";
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
import {
	ForcarEstadoUsuario,
	InterfaceDoUsuario,
	TipoDoUsuario,
} from "logica/@tipos/InterfaceDoUsuario";
import Botao from "visual/componentes/entradas/Botao/Botao";
import { stringParaObjeto } from "logica/servicos/funcoesReparadoras";
import {
	CidadeInterface,
	EnderecoInterface,
} from "logica/@tipos/EnderecoInterface";

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

function repararChaveUsuario() {
	const { estadoUsuario } = useContext(ContextoUsuario);
	let estadoUsuarioCopia = {} as {
		usuario: InterfaceDoUsuario;
		listaDeEnderecos: CidadeInterface[];
		enderecoUsuario: EnderecoInterface;
		logando: boolean;
		forcarEstadoUsuario: ForcarEstadoUsuario;
	};
	if (estadoUsuario && typeof estadoUsuario.usuario === "string") {
		let usuario = stringParaObjeto(estadoUsuario.usuario as string);
		estadoUsuarioCopia = { ...estadoUsuario, usuario };
	} else {
		estadoUsuarioCopia = estadoUsuario;
	}
	console.log(
		"estadoUsuarioCopia em 'repararChaveUsuario':",
		estadoUsuarioCopia
	);
	return estadoUsuarioCopia;
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
	const cores = useTheme().colors;
	const { usuario } = repararChaveUsuario();

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
	const estadoUsuario = repararChaveUsuario();
	const logado = estadoUsuario.usuario.nome_completo.length > 0;
	const logando = estadoUsuario.logando;
	const { forcarEstadoUsuario } = estadoUsuario;

	if (logando && forcarEstadoUsuario === ForcarEstadoUsuario.nao) {
		return (
			<View style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size={100} />
				<Botao onPress={ServicoLogin.sair}>Sair</Botao>
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
