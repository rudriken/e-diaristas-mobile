import React from "react";
import { View, TextInputAndroidProps } from "react-native";
import { CampoDeTextoEstilizado, TextoDeAjuda } from "./CampoDeTexto.style";

export type CampoDeTextoProps = Omit<
	React.ComponentProps<typeof CampoDeTextoEstilizado>,
	"autoComplete"
> & {
	textoDeAjuda?: string;
	autoComplete?: TextInputAndroidProps["autoComplete"];
};

const CampoDeTexto: React.FC<CampoDeTextoProps> = ({
	textoDeAjuda,
	autoComplete,
	...outrasPropriedades
}) => {
	return (
		<View>
			<CampoDeTextoEstilizado
				autoComplete={autoComplete}
				{...outrasPropriedades}
			/>
			{textoDeAjuda ? (
				<TextoDeAjuda type={"error"}>{textoDeAjuda}</TextoDeAjuda>
			) : null}
		</View>
	);
};

const CampoDeTextoRef = React.forwardRef(
	(propriedades: CampoDeTextoProps, referencia: any) => {
		return (
			<View ref={referencia}>
				<CampoDeTexto {...propriedades} />
			</View>
		);
	}
);

export default CampoDeTextoRef;
