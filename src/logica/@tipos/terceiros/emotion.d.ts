import { DefaultTheme as TemaPaper } from "react-native-paper";
import AppTema from "visual/temas/app-tema";

type AppTemaTipo = typeof AppTema;

declare module "@emotion/react" {
	export interface Theme extends AppTemaTipo {}
}
