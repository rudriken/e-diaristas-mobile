import { View, VirtualizedList } from "react-native";
import CampoDeTexto from "../CampoDeTexto/CampoDeTexto";
import Dialogo from "visual/componentes/retorno/Dialogo/Dialogo";
import { useState, useMemo } from "react";
import Botao from "../Botao/Botao";

export interface AutoCompletarProps {
	rotulo: string;
	valor: string;
	opcoes: string[];
	desabilitado?: boolean;
	carregando?: boolean;
	mensagemDeCarregando?: string;
	textoQuandoNaoHaOpcoes?: string;
	aoMudarTexto: (valor: string) => void;
	aoSelecionarItem?: (valor: string) => void;
	limparAoSelecionar?: boolean;
}

const AutoCompletar: React.FC<AutoCompletarProps> = ({
	desabilitado = false,
	opcoes = [],
	...outrasProps
}) => {
	const [estaAberto, alterarEstaAberto] = useState(false);
	let chaves: string[] = [];
	const tamanho = opcoes.length;
	const opcoesFiltradas = useMemo(() => {
		return opcoes.filter((item) =>
			item.toLowerCase().includes(outrasProps.valor.toLowerCase() || "")
		);
	}, [opcoes, outrasProps.valor]);

	for (let c = 0; c < tamanho; c++) {
		chaves.push(`${c}`);
	}

	function selecionarItem(item: string) {
		outrasProps.aoMudarTexto(outrasProps.limparAoSelecionar ? "" : item);
		outrasProps.aoSelecionarItem && outrasProps.aoSelecionarItem(item);
		alterarEstaAberto(false);
	}

	return (
		<View>
			<CampoDeTexto
				onFocus={() => alterarEstaAberto(true)}
				label={outrasProps.rotulo}
				value={outrasProps.valor}
				disabled={desabilitado}
			/>
			<Dialogo
				aberto={estaAberto}
				aoFechar={() => alterarEstaAberto(false)}
				naoTerBotaoCancelar
				naoTerBotaoConfirmar
			>
				<CampoDeTexto
					autoFocus
					label={outrasProps.rotulo}
					value={outrasProps.valor}
					onChangeText={outrasProps.aoMudarTexto}
				/>
				<VirtualizedList
					data={opcoesFiltradas}
					getItemCount={(dados) => dados.length}
					initialNumToRender={10}
					getItem={(dados, indice) => dados[indice]}
					keyExtractor={(_item, indice) => chaves[indice] as string}
					renderItem={(dado) => {
						return (
							<Botao
								uppercase={false}
								larguraTotal
								onPress={() =>
									selecionarItem(dado.item as string)
								}
							>
								{dado.item as string}
							</Botao>
						);
					}}
					style={{ flex: 1 }}
				/>
			</Dialogo>
		</View>
	);
};

export default AutoCompletar;
