import { useTheme } from "@emotion/react";
import { DiariaInterface } from "logica/@tipos/DiariaInterface";
import { ServicoData } from "logica/servicos/ServicoData";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import { Text, View, ScrollView } from "react-native";
import InformacaoDoUsuario from "visual/componentes/exibe-dados/InformacaoDoUsuario/InformacaoDoUsuario";
import Dialogo from "visual/componentes/retorno/Dialogo/Dialogo";

interface DialogoProps {
	diaria: DiariaInterface;
	aoConfirmar: (diaria: DiariaInterface) => void;
	aoCancelar: () => void;
}

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

export const SelecaoDialogo: React.FC<DialogoProps> = (propriedades) => {
	const { diarista } = propriedades.diaria;
	return (
		<Dialogo
			aberto={true}
			aoFechar={propriedades.aoCancelar}
			aoConfirmar={() => propriedades.aoConfirmar(propriedades.diaria)}
			rotuloCancelar={"Fechar"}
			naoTerBotaoConfirmar
			subtitulo={
				diarista
					? "Selecionamos o(a) seguinte profissional para a sua diária"
					: "Detalhes da diária"
			}
		>
			<ScrollView>
				<CaixinhaDeTrabalho diaria={propriedades.diaria} />
				{diarista ? (
					<InformacaoDoUsuario
						nome={diarista?.nome_completo || ""}
						avaliacao={diarista?.reputacao || 1}
						foto={diarista?.foto_usuario || ""}
						descricao={
							"Telefone: " +
							ServicoFormatadorDeTexto.formatarTelefone(
								diarista?.telefone || ""
							)
						}
					/>
				) : (
					<Text style={{ textAlign: "center", marginTop: 32 }}>
						Diarista ainda não selecionado(a)
					</Text>
				)}
			</ScrollView>
		</Dialogo>
	);
};
