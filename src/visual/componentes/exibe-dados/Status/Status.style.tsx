import { Text } from "react-native";
import styled from "@emotion/native";

export const StatusE = styled(Text, {
	shouldForwardProp: (propriedade) => propriedade !== "corDeFundo",
})<{
	corDeFundo: string;
}>`
	background-color: ${({ corDeFundo }) => corDeFundo};
	border-radius: ${({ theme }) => theme.shape.borderRadius};
	padding: ${({ theme }) => theme.spacing(0.5) + " " + theme.spacing(1.5)};
	font-size: 14px;
	color: white;
`;
