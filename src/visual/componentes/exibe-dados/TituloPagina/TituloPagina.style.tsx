import styled from "@emotion/native";

export const ContainerTituloPagina = styled.View`
	margin: ${({ theme }) => theme.spacing(4) + " " + 0};
`;

export const TituloPaginaEstilizado = styled.Text`
	margin: 0;
	color: ${({ theme }) => theme.colors.primary};
	font-size: 16px;
	text-align: center;
	font-weight: bold;
`;

export const SubtituloPaginaEstilizado = styled.Text`
	margin: ${({ theme }) => theme.spacing(1.5) + " auto"};
	color: ${({ theme }) => theme.colors.text};
	font-size: 14px;
	text-align: center;
	font-weight: normal;
	max-width: 275px;
`;
