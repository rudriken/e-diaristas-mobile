import styled from "@emotion/native";
import { Dialog, Subheading } from "react-native-paper";

export const DialogoContainer = styled(Dialog)`
	flex: 1;
`;

export const DialogoTitulo = styled(Dialog.Title)``;

export const DialogoConteudo = styled(Dialog.Content)`
	flex: 1.3;
	padding-top: ${({ theme }) => theme.spacing(2)};
`;

export const DialogoConteudoSubtitulo = styled(Subheading)`
	color: ${({ theme }) => theme.colors.primary};
	font-size: 14px;
	font-weight: bold;
	margin: ${({ theme }) => 0 + " " + 0 + " " + theme.spacing(3)};
`;

export const DialogoAcoes = styled(Dialog.Actions)`
	flex: 0.2;
	padding: 0;
`;
