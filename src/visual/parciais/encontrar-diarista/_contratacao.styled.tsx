import styled from "@emotion/native";
import { Title, Paragraph } from "react-native-paper";

export const ConfirmacaoContainer = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.primary};
	justify-content: center;
	align-items: center;
`;

export const ConfirmacaoTitulo = styled(Title)`
	color: ${({ theme }) => theme.colors.accent};
	text-align: center;
	font-size: 30px;
	max-width: 300px;
`;

export const ConfirmacaoParagrafo = styled(Paragraph)`
	color: white;
	text-align: center;
	font-size: 18px;
	max-width: 300px;
	margin: ${({ theme }) => theme.spacing(2) + " 0 " + theme.spacing(8)};
`;
