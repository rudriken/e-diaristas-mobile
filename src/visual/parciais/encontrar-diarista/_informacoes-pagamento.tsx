import { useTheme } from "@emotion/react";
import { View } from "react-native";
import Botao from "visual/componentes/entradas/Botao/Botao";
import {
	FormularioPagamento,
	TituloDoGrupoDeCampoFormulario,
} from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";

interface InformacoesPagamentoProps {
	aoSubmeter: () => void;
}

const InformacoesPagamento: React.FC<InformacoesPagamentoProps> = ({
	aoSubmeter,
}) => {
	const cores = useTheme().colors;
	return (
		<View>
			<TituloDoGrupoDeCampoFormulario style={{ marginTop: 0 }}>
				Informações de pagamento
			</TituloDoGrupoDeCampoFormulario>
			<FormularioPagamento />

			<Botao
				uppercase={false}
				dark
				mode={"contained"}
				buttonColor={cores.accent}
				style={{ marginTop: 16 }}
				onPress={aoSubmeter}
			>
				Fazer Pagamento
			</Botao>
		</View>
	);
};

export default InformacoesPagamento;
