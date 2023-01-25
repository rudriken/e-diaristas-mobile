import styled from "@emotion/native";
import { Button } from "react-native-paper";

export const BotaoEstilizado = styled(Button)`
	margin: 0 auto;
	padding: ${({ theme }) => theme.spacing(0.5)};
	max-width: 300px;
`;
