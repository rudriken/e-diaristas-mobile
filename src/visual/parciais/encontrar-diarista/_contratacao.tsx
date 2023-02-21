import { useState } from "react";
import { Text } from "react-native";
import AutoCompletar from "visual/componentes/entradas/AutoCompletar/AutoCompletar";

const Contratacao: React.FC = () => {
	const [valor, alterarValor] = useState("");
	const [valorEscolhido, alterarValorEscolhido] = useState("");
	return (
		<>
			<AutoCompletar
				valor={valor}
				aoMudarTexto={alterarValor}
				limparAoSelecionar
				aoSelecionarItem={alterarValorEscolhido}
				rotulo={"Escolha o valor"}
				opcoes={["Chocolate", "Morango", "Creme", "Chocolate", "Côco"]}
				textoQuandoNaoHaOpcoes={"Nenhum produto encontrado"}
			/>
			<Text>{valorEscolhido}</Text>
		</>
	);
};

export default Contratacao;
