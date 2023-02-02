import styled from "@emotion/native";
import { View, ImageBackground } from "react-native";
import { Title, Paragraph } from "react-native-paper";
import Botao from "visual/componentes/entradas/Botao/Botao";
import { LinearGradient } from "expo-linear-gradient";

export const ContainerPrincipal = styled(View)`
	flex: 1;
	justify-content: center;
	padding: ${({ theme }) => theme.spacing(10) + " " + theme.spacing()};
	z-index: 1;
`;

export const ContainerDeRegistro = styled(View)`
	flex: 2;
	justify-content: space-between;
`;

export const TituloDoRegistro = styled(Title)`
	text-align: center;
	text-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
	color: white;
`;

export const ParagrafoDoRegistro = styled(Paragraph)`
	text-align: center;
	width: 300px;
	margin: ${({ theme }) => theme.spacing(2) + " auto"};
	color: white;
`;

export const ContainerBotoesDeRegistro = styled(View)`
	height: 120px;
	justify-content: space-between;
`;

export const BotaoDeRegistro = styled(Botao)`
	border-radius: 50px;
`;

export const ContainerDeLogin = styled(View)`
	flex: 1;
	justify-content: flex-end;
`;

export const BotaoDeLogin = styled(BotaoDeRegistro)`
	background-color: white;
`;

export const GradienteDeFundo = styled(LinearGradient)`
	flex: 1;
	opacity: 0.9;
`;

export const ImagemDeFundo = styled(ImageBackground)`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;
