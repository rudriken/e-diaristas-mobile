import { useTheme } from "@emotion/react";
import useLogin from "logica/ganchos/pages/useLogin.page";
import { FormProvider } from "react-hook-form";
import { Paragraph } from "react-native-paper";
import Botao from "visual/componentes/entradas/Botao/Botao";
import {
	FormularioLogin,
	FormularioUsuarioContainer,
} from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";

const Login = () => {
	const {
			formularioMetodos,
			mensagemDeErro,
			aoSubmeter,
			estadoServicosExternos,
		} = useLogin(),
		cores = useTheme().colors;
	return (
		<FormularioUsuarioContainer>
			<FormProvider {...formularioMetodos}>
				<TituloPagina titulo={"Informe seu e-mail e senha"} />
				<FormularioLogin />
				<Paragraph
					style={{
						textAlign: "center",
						marginTop: 40,
						color: cores.error,
					}}
				>
					{mensagemDeErro}
				</Paragraph>
				<Botao
					uppercase={false}
					dark
					mode={"contained"}
					buttonColor={cores.accent}
					larguraTotal
					style={{ marginTop: 32, marginBottom: 24 }}
					onPress={formularioMetodos.handleSubmit(aoSubmeter)}
					disabled={
						estadoServicosExternos?.servicosExternos?.length === 0
					}
				>
					Entrar
				</Botao>
			</FormProvider>
		</FormularioUsuarioContainer>
	);
};

export default Login;
