import { TextInputMask } from "react-native-masked-text";
import CampoDeTexto, { CampoDeTextoProps } from "../CampoDeTexto/CampoDeTexto";

export type CampoDeTextoComMascaraProps = CampoDeTextoProps & {
	mascara: string;
};

const CampoDeTextoComMascara: React.FC<CampoDeTextoComMascaraProps> = ({
	mascara,
	value,
	onChangeText,
	...outrasPropriedades
}) => {
	return (
		<TextInputMask
			type={"custom"}
			options={{ mask: mascara }}
			customTextInput={CampoDeTexto}
			customTextInputProps={{ ...outrasPropriedades }}
			value={value}
			onChangeText={onChangeText}
		/>
	);
};

export default CampoDeTextoComMascara;
