import { useTheme } from "@emotion/react";
import { ScrollView } from "react-native";
import useOportunidadesTrabalho from "logica/ganchos/pages/useOportunidades.page";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import { Paragraph } from "react-native-paper";
import ListaDeDados from "visual/componentes/exibe-dados/ListaDeDados/ListaDeDados";

const Oportunidades = () => {
	const cores = useTheme().colors,
		{
			movel,
			oportunidades,
			paginaAtual,
			alterarPaginaAtual,
			totalPaginas,
			itensPorPagina,
			oportunidadeSelecionada,
			alterarOportunidadeSelecionada,
			seCandidatar,
			mensagemFeedback,
			alterarMensagemFeedback,
			totalComodos,
			podeCandidatar,
		} = useOportunidadesTrabalho();
	return (
		<ScrollView>
			<TituloPagina titulo={"Oportunidades de trabalho"} />
		</ScrollView>
	);
};

export default Oportunidades;
