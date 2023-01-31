import { useFonts } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import iconesMapeados from "@assets/fonts/tw-icons/selection.json";
import { useTheme } from "@emotion/react";

const Icone = createIconSetFromIcoMoon(iconesMapeados, "TWF", "twf.ttf");

export interface IconeDeFonteProps {
	icone: TwIcon;
	cor?: string;
	tamanho?: number;
}
/* ( . . . ) */
const IconeDeFonte: React.FC<IconeDeFonteProps> = ({ icone, cor, tamanho }) => {
	const { colors } = useTheme(),
		[fontesCarregadas] = useFonts({
			TWF: require("@assets/fonts/tw-icons/fonts/twf.ttf"),
		});
	if (!fontesCarregadas) {
		return null;
	}
	return (
		<Icone name={icone} color={cor || colors.text} size={tamanho || 16} />
	);
};

export default IconeDeFonte;
