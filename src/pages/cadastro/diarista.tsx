import { useEffect, useRef } from "react";
import { ScrollView, Text } from "react-native";
import { ServicoMovel } from "logica/servicos/ServicoMovel";
import useCadastroDiarista from "logica/ganchos/pages/cadastro/useCadastroDiarista.page";
import { useTheme } from "@emotion/react";
import MigalhaDePao from "visual/componentes/navegacao/MigalhaDePao/MigalhaDePao";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import { FormularioUsuarioContainer } from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";

const Diarista = () => {
	const scrollViewRef = useRef<ScrollView>(null),
		{ passo, migalhaDePaoItens } = useCadastroDiarista(),
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

			<FormularioUsuarioContainer></FormularioUsuarioContainer>
		</ScrollView>
	);
};

export default Diarista;
