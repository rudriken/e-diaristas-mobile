import styled from "@emotion/native";

export const FormularioContainer = styled.View`
	padding: 0 ${({ theme }) => theme.spacing(2)};
`;

export const TextoContainer = styled.Text`
	text-align: center;
	padding: ${({ theme }) => theme.spacing(4) + " " + theme.spacing()};
`;

export const TextoDeAjuda = styled(TextoContainer)`
	color: ${({ theme }) => theme.colors.error};
`;

export const RespostaContainer = styled.View`
	padding: ${({ theme }) => theme.spacing(5) + " 0 " + theme.spacing(8)};
`;
