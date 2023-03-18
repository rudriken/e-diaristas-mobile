import { useEffect, useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import { FormProvider } from "react-hook-form";
import { ServicoMovel } from "logica/servicos/ServicoMovel";
import useCadastroDiarista from "logica/ganchos/pages/cadastro/useCadastroDiarista.page";
import { useTheme } from "@emotion/react";
import MigalhaDePao from "visual/componentes/navegacao/MigalhaDePao/MigalhaDePao";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import {
	FormularioCidades,
	FormularioDadosUsuario,
	FormularioEndereco,
	FormularioFinanceiro,
	FormularioImagem,
	FormularioNovoContato,
	FormularioUsuarioContainer,
	TituloDoGrupoDeCampoFormulario,
} from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";
import { Paragraph } from "react-native-paper";
import Botao from "visual/componentes/entradas/Botao/Botao";

const Diarista = () => {
	const scrollViewRef = useRef<ScrollView>(null),
		{
			passo,
			esperandoResposta,
			migalhaDePaoItens,
			formularioUsuario,
			formularioListaDeCidades,
			novoEndereco,
			cidadesAtendidas,
			aoSubmeterUsuario,
			aoSubmeterEndereco,
		} = useCadastroDiarista(),
		cores = useTheme().colors;

	useEffect(() => {
		setTimeout(() => {
			ServicoMovel.rolarParaCima(scrollViewRef.current);
		}, 100);
	}, [passo]);

	return (
		<ScrollView ref={scrollViewRef}>
			<MigalhaDePao
				itens={migalhaDePaoItens}
				selecionado={migalhaDePaoItens[passo - 1]}
			/>

			{passo === 1 && (
				<TituloPagina
					titulo={"Precisamos conhecer um pouco sobre você!"}
				/>
			)}

			{passo === 2 && (
				<TituloPagina
					titulo={"Quais cidades você atenderá?"}
					subtitulo={
						<Text>
							Você pode escolher se aceita ou não um serviço.
							Então, não se preocupe se mora em uma grande cidade.
						</Text>
					}
				/>
			)}

			<FormularioUsuarioContainer>
				<View style={{ display: passo !== 1 ? "none" : "flex" }}>
					<FormProvider {...formularioUsuario}>
						<TituloDoGrupoDeCampoFormulario
							style={{ marginTop: 0 }}
						>
							Dados pessoais
						</TituloDoGrupoDeCampoFormulario>
						<FormularioDadosUsuario cadastro />

						<TituloDoGrupoDeCampoFormulario>
							Financeiro
						</TituloDoGrupoDeCampoFormulario>
						<FormularioFinanceiro />

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
							Para sua segurança, todos os profissionais e
							clientes precisam enviar. Essa foto não será vista
							por ninguém.
						</Paragraph>
						<FormularioImagem />

						<TituloDoGrupoDeCampoFormulario>
							Endereço
						</TituloDoGrupoDeCampoFormulario>
						<FormularioEndereco />

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
								onPress={formularioUsuario.handleSubmit(
									aoSubmeterUsuario
								)}
								larguraTotal
								style={{ marginTop: 32, marginBottom: 24 }}
								disabled={esperandoResposta}
							>
								Cadastrar e escolher cidades
							</Botao>
						</View>
					</FormProvider>
				</View>

				<View style={{ display: passo !== 2 ? "none" : "flex" }}>
					<FormProvider {...formularioListaDeCidades}>
						<TituloDoGrupoDeCampoFormulario>
							Selecione a cidade
						</TituloDoGrupoDeCampoFormulario>
						{novoEndereco && (
							<FormularioCidades estado={novoEndereco.estado} />
						)}

						<Botao
							uppercase={false}
							dark
							buttonColor={cores.accent}
							mode={"contained"}
							onPress={formularioListaDeCidades.handleSubmit(
								aoSubmeterEndereco
							)}
							larguraTotal
							style={{ marginTop: 32, marginBottom: 24 }}
							disabled={
								esperandoResposta ||
								cidadesAtendidas === undefined ||
								cidadesAtendidas?.length === 0
							}
						>
							Finalizar o cadastro
						</Botao>
					</FormProvider>
				</View>
			</FormularioUsuarioContainer>
		</ScrollView>
	);
};

export default Diarista;
