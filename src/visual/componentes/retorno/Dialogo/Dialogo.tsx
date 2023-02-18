import { useTheme } from "@emotion/react";
import { PropsWithChildren } from "react";
import { ScrollView } from "react-native";
import { Portal } from "react-native-paper";
import Botao from "visual/componentes/entradas/Botao/Botao";
import {
	DialogoContainer,
	DialogoTitulo,
	DialogoConteudo,
	DialogoConteudoSubtitulo,
	DialogoAcoes,
} from "./Dialogo.style";

export interface DialogoProps {
	titulo?: string;
	subtitulo?: string;
	aberto: boolean;
	rotuloConfirmar?: string;
	rotuloCancelar?: string;
	naoTerBotaoConfirmar?: boolean;
	naoTerBotaoCancelar?: boolean;
	aoConfirmar?: () => void;
	aoCancelar?: () => void;
	aoFechar: () => void;
	alturaTotal?: boolean;
}

const Dialogo: React.FC<DialogoProps & PropsWithChildren> = ({
	titulo,
	subtitulo,
	aberto,
	rotuloConfirmar,
	rotuloCancelar,
	naoTerBotaoConfirmar,
	naoTerBotaoCancelar,
	aoConfirmar,
	aoCancelar,
	aoFechar,
	children,
	alturaTotal,
}) => {
	const cores = useTheme().colors;
	return (
		<Portal>
			<DialogoContainer
				visible={aberto}
				dismissable={!naoTerBotaoCancelar}
				onDismiss={aoCancelar || (() => {})}
			>
				{titulo && <DialogoTitulo>{titulo}</DialogoTitulo>}
				<DialogoConteudo>
					{subtitulo && (
						<DialogoConteudoSubtitulo>
							{subtitulo}
						</DialogoConteudoSubtitulo>
					)}
					{alturaTotal ? (
						<ScrollView>{children}</ScrollView>
					) : (
						children
					)}
				</DialogoConteudo>
				{(!naoTerBotaoCancelar || !naoTerBotaoConfirmar) && (
					<DialogoAcoes>
						{!naoTerBotaoCancelar && (
							<Botao
								mode={"outlined"}
								onPress={aoCancelar || aoFechar}
							>
								{rotuloCancelar || "Cancelar"}
							</Botao>
						)}
						{!naoTerBotaoConfirmar && (
							<Botao
								mode={"contained"}
								dark
								buttonColor={cores.accent}
								onPress={aoConfirmar || aoFechar}
							>
								{rotuloConfirmar || "Confirmar"}
							</Botao>
						)}
					</DialogoAcoes>
				)}
			</DialogoContainer>
		</Portal>
	);
};

export default Dialogo;
