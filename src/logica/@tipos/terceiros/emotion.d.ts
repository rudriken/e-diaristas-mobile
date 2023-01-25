import { DefaultTheme as TemaPaper } from "react-native-paper";
import AppTema from "visual/temas/app-tema";

type AppTemaTipo = typeof AppTema;
type TemaPaperTipo = typeof TemaPaper;

declare module "@emotion/native" {
	export interface MD3Theme extends AppTemaTipo {}
}
