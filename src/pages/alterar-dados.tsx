import {
	InterfaceDoUsuario,
	TipoDoUsuario,
} from "logica/@tipos/InterfaceDoUsuario";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import useAlterarDados from "logica/ganchos/pages/useAlterarDados.page";
import { ServicoLogin } from "logica/servicos/ServicoLogin";
import { useContext } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Botao from "visual/componentes/entradas/Botao/Botao";
import { FormularioUsuarioContainer } from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";

const AlterarDados = () => {
	const { despachoUsuario } = useContext(ContextoUsuario);
	const { usuario } = useAlterarDados();

	function sair() {
		ServicoLogin.sair();
		despachoUsuario({
			tipo: "SET_USER",
			carregarObjeto: {
				nome_completo: "",
				nascimento: "",
				cpf: "",
				email: "",
				foto_usuario: "",
				telefone: "",
				tipo_usuario: TipoDoUsuario.Cliente,
				reputacao: 0,
				chave_pix: "",
			} as InterfaceDoUsuario,
		});
	}

	if (!usuario.nome_completo) {
		return (
			<View style={{ marginTop: 40 }}>
				<ActivityIndicator size={100} />
			</View>
		);
	}

	return (
		<>
			<ScrollView>
				<TituloPagina titulo={"Alterar dados cadastrais"} />
				<FormularioUsuarioContainer>
					<Botao onPress={sair}>Sair</Botao>
				</FormularioUsuarioContainer>
			</ScrollView>
		</>
	);
};

export default AlterarDados;
