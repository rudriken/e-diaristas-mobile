import { useTheme } from "@emotion/react";
import { View } from "react-native";
import {
	ContainerPrincipal,
	ContainerDeRegistro,
	TituloDoRegistro,
	ParagrafoDoRegistro,
	ContainerBotoesDeRegistro,
	BotaoDeRegistro,
	ContainerDeLogin,
	BotaoDeLogin,
	GradienteDeFundo,
	ImagemDeFundo,
} from "@estilos/pages/index.styled";
import ImagemDeFaxina from "@assets/img/background/cleaning.jpg";

const Index = () => {
	const { colors } = useTheme();
	return (
		<View style={{ flex: 1 }}>
			<ContainerPrincipal>
				<ContainerDeRegistro>
					<View>
						<TituloDoRegistro>Crie uma conta</TituloDoRegistro>
						<ParagrafoDoRegistro>
							Você quer encontrar profissionais ou cadastrar seus
							serviços?
						</ParagrafoDoRegistro>
					</View>
					<ContainerBotoesDeRegistro>
						<BotaoDeRegistro
							uppercase={false}
							mode={"contained"}
							larguraTotal
							dark
						>
							Encontrar Diarista
						</BotaoDeRegistro>
						<BotaoDeRegistro
							uppercase={false}
							mode={"contained"}
							larguraTotal
							dark
						>
							Ser Diarista
						</BotaoDeRegistro>
					</ContainerBotoesDeRegistro>
				</ContainerDeRegistro>
				<ContainerDeLogin>
					<BotaoDeLogin uppercase={false} larguraTotal>
						Já possuo uma conta
					</BotaoDeLogin>
				</ContainerDeLogin>
			</ContainerPrincipal>
			<ImagemDeFundo source={ImagemDeFaxina}>
				<GradienteDeFundo colors={[colors.secondary, colors.primary]} />
			</ImagemDeFundo>
		</View>
	);
};

export default Index;
