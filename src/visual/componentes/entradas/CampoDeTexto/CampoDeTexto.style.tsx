import styled from "@emotion/native";
import { TextInput, HelperText } from "react-native-paper";

export const CampoDeTextoEstilizado = styled(TextInput)`
	margin-bottom: ${({ theme }) => theme.spacing(1.5)};
`;
CampoDeTextoEstilizado.defaultProps = {
	mode: "outlined",
};

export const TextoDeAjuda = styled(HelperText)`
	margin-top: ${({ theme }) => theme.spacing(-1.5)};
	margin-bottom: ${({ theme }) => theme.spacing(2.5)};
`;
