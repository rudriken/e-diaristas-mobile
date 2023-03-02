import { ScrollView } from "react-native";

export const ServicoMovel = {
	rolarParaCima(componenteScrollView?: ScrollView | null): void {
		if (componenteScrollView) {
			componenteScrollView.scrollTo({ x: 0, y: 0, animated: true });
		}
	},
};
