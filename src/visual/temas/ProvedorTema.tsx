import { ThemeProvider as ProvedorEmotion } from "@emotion/react";
import { Provider as ProvedorPaper } from "react-native-paper";
import AppTema from "./app-tema";

function ProvedorTema({ children }: React.PropsWithChildren) {
	return (
		<ProvedorEmotion theme={AppTema}>
			<ProvedorPaper theme={AppTema}>{children}</ProvedorPaper>
		</ProvedorEmotion>
	);
}

export default ProvedorTema;
