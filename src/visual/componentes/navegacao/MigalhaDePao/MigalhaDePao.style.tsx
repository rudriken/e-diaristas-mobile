import styled from "@emotion/native";
import { Text } from "react-native";

export const ContainerMigalhaDePao = styled.View`
	flex-direction: row;
	justify-content: center;
	padding: 0;
	margin-bottom: ${({ theme }) => theme.spacing(-1)};
`;

export const ItemMigalhaDePao = styled(Text, {
	shouldForwardProp: (propriedade) => propriedade !== "estaSelecionado",
})<{
	estaSelecionado?: boolean;
}>`
	flex: 1;
	text-align: center;
	color: ${({ theme }) => theme.colors.textSecondary};
	background-color: ${({ theme, estaSelecionado }) =>
		theme.colors.grey[estaSelecionado ? 200 : 100]};
	padding: ${({ theme }) => theme.spacing()};
`;
