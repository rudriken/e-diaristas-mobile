import { useTheme } from "@emotion/react";
import { ScrollView } from "react-native";
import useOportunidadesTrabalho from "logica/ganchos/pages/useOportunidades.page";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";

const Oportunidades = () => {
	const cores = useTheme().colors,
		{} = useOportunidadesTrabalho();
	return (
		<ScrollView>
			<TituloPagina titulo={"Oportunidades de trabalho"} />
		</ScrollView>
	);
};

export default Oportunidades;
