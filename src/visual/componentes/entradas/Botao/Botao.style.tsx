import styled from "@emotion/native";
import { Button } from "react-native-paper";

export const BotaoEstilizado = styled(Button, {
	shouldForwardProp: (propriedade) => propriedade !== "larguraTotal",
})<{ larguraTotal?: boolean }>`
	${(propriedades) => {
		if (propriedades.mode === "outlined") {
			return `border: 2px solid ${
				propriedades.buttonColor || propriedades.theme.colors.primary
			};`;
		}
	}}
	margin: 0 auto;
	padding: ${({ theme }) => theme.spacing(0.5)};
	max-width: 300px;
	border-radius: ${({ theme }) => theme.shape.borderRadius};
	${({ larguraTotal }) => (larguraTotal ? "width: 100%;" : "")}
`;

BotaoEstilizado.defaultProps = {
	uppercase: true,
	dark: false,
};
