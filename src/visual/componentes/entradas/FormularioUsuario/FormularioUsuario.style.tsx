import styled from "@emotion/native";
import { Subheading } from "react-native-paper";

export const ContainerFormularioEstilizado = styled.View`
	padding: 0 ${({ theme }) => theme.spacing(2) + " " + theme.spacing(4)};
`;

export const TituloDoGrupoDeCampoFormularioEstilizado = styled(Subheading)`
	font-size: 14px;
	font-weight: bold;
	text-align: center;
	margin: ${({ theme }) => theme.spacing(4) + " 0 " + theme.spacing(2)};
`;
