import { View, Text } from "react-native";
import useFormularioCidades from "logica/ganchos/componentes/entradas/FormularioUsuario/Formularios/useFormularioCidades";
import AutoCompletar from "../../AutoCompletar/AutoCompletar";
import { useState } from "react";
import CampoDeLasca from "visual/componentes/exibe-dados/CampoDeLasca/CampoDeLasca";

export const FormularioCidades: React.FC<{ estado: string }> = ({ estado }) => {
	const [cidade, alterarCidade] = useState(""),
		{
			listaDeCidades,
			cidadesASeremSelecionadas,
			cidadesSelecionadas,
			aoSelecionarCidade,
			aoDesselecionarCidade,
		} = useFormularioCidades(estado);
	return (
		<View>
			<AutoCompletar
				valor={cidade}
				aoMudarTexto={alterarCidade}
				limparAoSelecionar
				aoSelecionarItem={aoSelecionarCidade}
				opcoes={cidadesASeremSelecionadas.map((item) => item.cidade)}
				rotulo={"Busque pelo nome da cidade"}
				carregando={listaDeCidades.length === 0}
				mensagemDeCarregando={"Carregando cidades ..."}
				textoQuandoNaoHaOpcoes={"Nenhuma cidade com esse nome"}
			/>
			<Text style={{ marginTop: 0, marginBottom: -8 }}>
				Cidades selecionadas
			</Text>
			<CampoDeLasca
				listaDeItens={cidadesSelecionadas}
				paraDeletar={aoDesselecionarCidade}
				mensagemQuandoVazio={"Nenhuma cidade selecionada ainda"}
			/>
		</View>
	);
};
