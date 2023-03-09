import {
	InterfaceDoUsuario,
	TipoDoUsuario,
} from "logica/@tipos/InterfaceDoUsuario";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import { ServicoLogin } from "logica/servicos/ServicoLogin";
import { useContext } from "react";
import { Text } from "react-native";
import Botao from "visual/componentes/entradas/Botao/Botao";

const AlterarDados = () => {
	const { despachoUsuario } = useContext(ContextoUsuario);

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

	return (
		<>
			<Text>Tela 'AlterarDados'</Text>
			<Botao onPress={sair}>Sair</Botao>
		</>
	);
};

export default AlterarDados;
