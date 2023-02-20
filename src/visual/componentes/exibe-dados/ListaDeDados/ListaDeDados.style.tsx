import styled from "@emotion/native";
import { List } from "react-native-paper";

export const AcordeonEstilizado = styled(List.Accordion)`
	background-color: ${({ theme }) => theme.colors.grey[100]};
`;

export const AcordeonDetalhes = styled.View`
	background-color: ${({ theme }) => theme.colors.primary};
	padding: ${({ theme }) => theme.spacing(2)};
`;

export const AcordeonAcoes = styled.View`
	margin-top: ${({ theme }) => theme.spacing(2)};
	flex-direction: row;
	flex-wrap: wrap;
`;
