import { useTheme } from "@emotion/react";
import { ScrollView } from "react-native";
import Botao from "visual/componentes/entradas/Botao/Botao";
import CampoDeTextoComMascara from "visual/componentes/entradas/CampoDeTextoComMascara/CampoDeTextoComMascara";
import InformacaoDoUsuario from "visual/componentes/exibe-dados/InformacaoDoUsuario/InformacaoDoUsuario";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import {
	FormularioContainer,
	TextoContainer,
	TextoDeAjuda,
	RespostaContainer,
} from "./_verificar-profissionais.styled";

interface VerificarProfissionaisProps {}

const VerificarProfissionais: React.FC<VerificarProfissionaisProps> = () => {
	const { colors } = useTheme();
	return (
		<ScrollView>
			<TituloPagina
				titulo={"Conheça os profissionais"}
				subtitulo={
					"Preencha seu endereço e veja todos os profissionais da sua localidade"
				}
			/>
			<FormularioContainer>
				<CampoDeTextoComMascara
					label={"Digite seu CEP"}
					mascara={"99.999-999"}
					keyboardType={"number-pad"}
				/>
				<TextoDeAjuda>CEP não encontrado</TextoDeAjuda>
				<Botao
					mode={"contained"}
					larguraTotal
					dark
					uppercase={false}
					style={{ marginTop: 32 }}
					buttonColor={colors.accent}
				>
					Buscar
				</Botao>
			</FormularioContainer>
			<RespostaContainer>
				<InformacaoDoUsuario
					nome={"Rodrigo Mendonça"}
					foto={"https://github.com/rudriken.png"}
					avaliacao={2}
					descricao={"Uberlândia"}
				/>
				<InformacaoDoUsuario
					nome={"Akira Hanashiro"}
					foto={"https://github.com/hanashiro.png"}
					avaliacao={5}
					descricao={"São Paulo"}
					fundoUmPoucoMaisEscuro
				/>
				<InformacaoDoUsuario
					nome={"Almeida"}
					foto={"https://github.com/almeida.png"}
					avaliacao={4}
					descricao={"Curitiba"}
				/>
				<TextoContainer>
					... e mais 5 profissionais atendem ao seu endereço
				</TextoContainer>
				<Botao
					mode={"contained"}
					larguraTotal
					dark
					uppercase={false}
					style={{ marginTop: 32 }}
					buttonColor={colors.accent}
				>
					Contratar um(a) profissional
				</Botao>
			</RespostaContainer>
			<TextoContainer>
				Ainda não temos nenhum(a) diarista disponível em sua região.
			</TextoContainer>
		</ScrollView>
	);
};

export default VerificarProfissionais;
