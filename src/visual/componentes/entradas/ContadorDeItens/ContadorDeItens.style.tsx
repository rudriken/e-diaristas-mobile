import styled from "@emotion/native";
import { IconButton } from "react-native-paper";

export const ContainerContadorDeItens = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 50%;
`;

export const ContainerTextoContador = styled.Text`
	background-color: ${({ theme }) => theme.colors.grey[100]};
	color: ${({ theme }) => theme.colors.text};
	text-align: center;
	padding: ${({ theme }) => theme.spacing() + " " + theme.spacing(4)};
	margin: ${({ theme }) => theme.spacing(2) + " " + theme.spacing(-3)};
	flex: 1;
`;

export const BotaoCircular = styled(IconButton)`
	border: 2px ${({ theme }) => theme.colors.accent};
	background-color: ${({ theme }) => theme.colors.background};
	z-index: 2;
`;
