import styled, { css } from "@emotion/native";
import { View } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import AppTema from "visual/temas/app-tema";

export const InformacaoDoUsuarioContainer = styled(View, {
	shouldForwardProp: (propriedade) => propriedade !== "maisEscuro",
})<{ maisEscuro: boolean }>`
	flex-flow: row;
	align-items: center;
	padding: ${({ theme }) => theme.spacing(3) + " " + theme.spacing(2)};
	background-color: ${({ theme, maisEscuro }) =>
		theme.colors.grey[maisEscuro ? 100 : 50]};
`;

export const NomeAvaliacaoDescricaoContainer = styled.View`
	flex: 1;
	padding-left: ${({ theme }) => theme.spacing(2)};
`;

export const NomeUsuario = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-weight: bold;
`;

export const AvaliacaoUsuario = styled(AirbnbRating)``;
AvaliacaoUsuario.defaultProps = {
	isDisabled: true,
	showRating: false,
	size: 10,
	count: 5,
	selectedColor: AppTema.colors.warning,
	starContainerStyle: css`
		width: 100%;
		justify-content: flex-start;
	`,
};

export const DescricaoUsuario = styled.Text`
	color: ${({ theme }) => theme.colors.text};
`;
