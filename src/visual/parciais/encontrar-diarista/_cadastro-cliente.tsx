import { View } from "react-native";
import { Paragraph } from "react-native-paper";
import {
	FormularioDadosUsuario,
	FormularioImagem,
	FormularioNovoContato,
	TituloDoGrupoDeCampoFormulario,
} from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";
import Botao from "visual/componentes/entradas/Botao/Botao";
import { useTheme } from "@emotion/react";

interface CadastroClienteProps {
	paraVoltar: () => void;
	aoSubmeter: () => void;
}

const CadastroCliente: React.FC<CadastroClienteProps> = ({
	paraVoltar,
	aoSubmeter,
}) => {
	const cores = useTheme().colors;

	return (
		<View>
			<TituloDoGrupoDeCampoFormulario style={{ marginTop: 0 }}>
				Dados pessoais
			</TituloDoGrupoDeCampoFormulario>
			<FormularioDadosUsuario cadastro />

			<TituloDoGrupoDeCampoFormulario>
				Hora da self! Envie uma self segurando o documento
			</TituloDoGrupoDeCampoFormulario>
			<Paragraph
				style={{
					marginTop: -16,
					marginBottom: 16,
					textAlign: "center",
				}}
			>
				Para sua segurança, todos os profissionais e clientes precisam
				enviar. Essa foto não será vista por ninguém.
			</Paragraph>
			<FormularioImagem />

			<TituloDoGrupoDeCampoFormulario>
				Dados de acesso
			</TituloDoGrupoDeCampoFormulario>
			<FormularioNovoContato />

			<View>
				<Botao
					uppercase={false}
					dark
					buttonColor={cores.accent}
					mode={"contained"}
					onPress={aoSubmeter}
					larguraTotal
					style={{ marginTop: 32, marginBottom: 24 }}
				>
					Ir para pagamento
				</Botao>
				<Botao
					uppercase={false}
					mode={"outlined"}
					onPress={aoSubmeter}
					larguraTotal
					// @ts-ignore
					onPress={paraVoltar}
				>
					Voltar para detalhes da diária
				</Botao>
			</View>
		</View>
	);
};

// export const LoginCliente: React.FC<{ paraVoltar: () => void }> = ({
// 	paraVoltar,
// }) => {
// 	return (
// 		<>

// 		</>
// 	);
// };

export default CadastroCliente;
