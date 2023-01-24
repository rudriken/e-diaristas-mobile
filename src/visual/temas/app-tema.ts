import { DefaultTheme as TemaPadraoPaper } from "react-native-paper";
import { DefaultTheme as TemaPadraoNavigation } from "@react-navigation/native";

const AppTema = {
	...TemaPadraoPaper,
	colors: {
		...TemaPadraoPaper.colors,
		primary: "#6B2AEE",
		secondary: "#02E7D9",
		accent: "#02E7D9",
		text: "#707070",
		textSecondary: "#9B9B9B",
		backdrop: "rgba(107, 42, 238, .75)",
		background: "#FFF",
		surface: "#FAFAFA",
		error: "#FC3C00",
		warning: "#FCA600",
		success: "#00D34D",
		grey: {
			50: "#FAFAFA",
			100: "#F0F0F0",
			200: "#D7D9DD",
			300: "#C4C4C4",
			400: "#9B9B9B",
		},
	},
	shape: { borderRadius: "3px" },
	spacing(tamanho = 1): string { return tamanho * 8 + "px"; },
};

export const NavigationTema = {
	...TemaPadraoNavigation,
	colors: {
		...TemaPadraoNavigation.colors,
		primary: AppTema.colors.primary,
		background: AppTema.colors.background,
		text: AppTema.colors.text,
		card: AppTema.colors.background,
		border: AppTema.colors.grey[300],
	},
};

export default AppTema;
