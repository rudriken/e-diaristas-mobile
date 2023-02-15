import styled from "@emotion/native";
import { TouchableRipple } from "react-native-paper";

export const GrupoAlternadorDeBotaoEstilizado = styled.View`
	flex-flow: row;
	flex-wrap: wrap;
	width: 100%;
`;

export const AlternadorDeBotaoEstilizado = styled(TouchableRipple, {
	shouldForwardProp: (propriedade) => propriedade !== "escolhido",
})<{
	escolhido: boolean;
}>`
	flex: 1;
	min-width: 100px;
	align-items: center;
	background-color: ${({ theme, escolhido }) =>
		theme.colors[escolhido ? "accent" : "background"]};
	padding: ${({ theme }) => theme.spacing(2)};
	margin: ${({ theme }) => theme.spacing(0.5)};
	border-radius: ${({ theme }) => theme.shape.borderRadius};
	${({ escolhido, theme }) => {
		if (!escolhido) {
			return "border: 1px solid " + theme.colors.grey[200];
		}
	}}
`;

export const AlternadorDeBotaoTexto = styled.Text`
	text-align: center;
	margin-top: ${({ theme }) => theme.spacing()};
`;
