import { useTheme } from "@emotion/react";
import { DiariaInterface } from "logica/@tipos/DiariaInterface";
import { ServicoData } from "logica/servicos/ServicoData";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import { Text, View } from "react-native";

export const CaixinhaDeTrabalho: React.FC<{ diaria: DiariaInterface }> = ({
	diaria,
}) => {
	const cores = useTheme().colors;

	return (
		<View>
			<Text style={{ color: cores.textSecondary }}>
				Data:{" "}
				<Text style={{ fontWeight: "bold" }}>
					{ServicoFormatadorDeTexto.reverterFormatoDeData(
						diaria.data_atendimento as string
					)}{" "}
					às{" "}
					{ServicoData.pegarTempoDeData(
						diaria.data_atendimento as string
					)}
				</Text>
			</Text>
			<Text style={{ color: cores.textSecondary }}>
				Endereço: {ServicoFormatadorDeTexto.pegarEndereco(diaria)}
			</Text>
			<Text style={{ color: cores.textSecondary, fontWeight: "bold" }}>
				Valor: {ServicoFormatadorDeTexto.formatarMoeda(diaria.preco)}
			</Text>
		</View>
	);
};
