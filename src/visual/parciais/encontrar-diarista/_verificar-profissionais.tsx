import { useEffect } from "react";
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
import useVerificarProfissionais from "logica/ganchos/pages/useVerificarProfissionais.page";
import useVerificarProfissionaisMobile from "logica/ganchos/pages/useVerificarProfissionais.page.mobile";

interface VerificarProfissionaisProps {
	aoContratarProfissional: () => void;
}

const VerificarProfissionais: React.FC<VerificarProfissionaisProps> = (
	propriedades
) => {
	const { colors } = useTheme();
	const {
		cep,
		definirCep,
		cepValido,
		buscarProfissionais,
		erro,
		listaDiaristas,
		buscaFeita,
		carregando,
		diaristasRestantes,
	} = useVerificarProfissionais();
	const { cepAutomatico } = useVerificarProfissionaisMobile();

	useEffect(() => {
		if (cepAutomatico && !cep) {
			definirCep(cepAutomatico);
			buscarProfissionais(cepAutomatico);
		}
	}, [cepAutomatico]);

	return (
		<ScrollView>
			<TituloPagina
				titulo={"Conheça os profissionais"}
				subtitulo={
					"Preencha seu endereço e veja todos os profissionais da sua localida-de"
				}
			/>
			<FormularioContainer>
				<CampoDeTextoComMascara
					label={"Digite seu CEP"}
					mascara={"99.999-999"}
					keyboardType={"number-pad"}
					value={cep}
					onChangeText={definirCep}
				/>
				{erro ? <TextoDeAjuda>CEP não encontrado</TextoDeAjuda> : null}
				<Botao
					mode={"contained"}
					larguraTotal
					dark
					uppercase={false}
					style={{ marginTop: 32 }}
					buttonColor={colors.accent}
					onPress={() => buscarProfissionais(cep)}
					loading={carregando}
					disabled={!cepValido || carregando}
				>
					Buscar
				</Botao>
			</FormularioContainer>

			{buscaFeita &&
				(listaDiaristas.length > 0 ? (
					<RespostaContainer>
						{listaDiaristas.map((item, indice) => {
							return (
								<InformacaoDoUsuario
									key={indice}
									nome={item.nome}
									foto={item.foto_do_usuario || ""}
									avaliacao={item.reputacao || 0}
									descricao={item.cidade}
									fundoUmPoucoMaisEscuro={indice % 2 === 1}
								/>
							);
						})}

						{diaristasRestantes > 0 && (
							<TextoContainer>
								... e mais {diaristasRestantes}{" "}
								{diaristasRestantes > 1
									? "profissionais atendem"
									: "profissional atende"}{" "}
								ao seu endereço.
							</TextoContainer>
						)}

						<Botao
							mode={"contained"}
							larguraTotal
							dark
							uppercase={false}
							style={{ marginTop: 32 }}
							buttonColor={colors.accent}
							onPress={propriedades.aoContratarProfissional}
						>
							Contratar um(a) profissional
						</Botao>
					</RespostaContainer>
				) : (
					<TextoContainer>
						Ainda não temos nenhum(a) diarista disponível em sua
						região.
					</TextoContainer>
				))}
		</ScrollView>
	);
};

export default VerificarProfissionais;
