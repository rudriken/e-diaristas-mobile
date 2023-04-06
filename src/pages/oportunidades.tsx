import { useTheme } from "@emotion/react";
import useOportunidadesTrabalho from "logica/ganchos/pages/useOportunidades.page";
import { ScrollView, View, Text } from "react-native";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import { stringParaObjeto } from "logica/servicos/funcoesReparadoras";
import { Paragraph } from "react-native-paper";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import ListaDeDados from "visual/componentes/exibe-dados/ListaDeDados/ListaDeDados";

const Oportunidades = () => {
	const cores = useTheme().colors;
	const { oportunidades, totalComodos } = useOportunidadesTrabalho();

	let oportunidadesC = oportunidades;
	if (typeof oportunidades === "string") {
		oportunidadesC = stringParaObjeto(oportunidades);
	}

	return (
		<ScrollView>
			<TituloPagina titulo={"Oportunidades de trabalho"} />

			{oportunidadesC.length > 0 ? (
				<>
					{oportunidadesC.map((item) => {
						return (
							<ListaDeDados
								key={item.id}
								cabecalho={
									<View>
										<Text>
											Data:{" "}
											{ServicoFormatadorDeTexto.reverterFormatoDeData(
												item.data_atendimento as string
											)}
										</Text>
										<Text>{item.nome_servico}</Text>
										<Text>
											{ServicoFormatadorDeTexto.formatarMoeda(
												item.preco
											)}
										</Text>
									</View>
								}
								corpo={
									<>
										<Text style={{ color: "white" }}>
											Cidade: {item.cidade}
										</Text>
										<Text style={{ color: "white" }}>
											Número de cômodos:{" "}
											{totalComodos(item)}
										</Text>
									</>
								}
							/>
						);
					})}
				</>
			) : (
				<Paragraph style={{ paddingTop: 80, textAlign: "center" }}>
					Nenhuma oportunidade ainda
				</Paragraph>
			)}
		</ScrollView>
	);
};

export default Oportunidades;
