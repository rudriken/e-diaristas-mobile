import { ScrollView, View } from "react-native";
import useContratacao from "logica/ganchos/pages/useContratacao.page";
import MigalhaDePao from "visual/componentes/navegacao/MigalhaDePao/MigalhaDePao";
import { ActivityIndicator } from "react-native";
import TituloPagina from "visual/componentes/exibe-dados/TituloPagina/TituloPagina";
import { FormularioUsuarioContainer } from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";
import { FormProvider } from "react-hook-form";
import DetalhesServico from "./_detalhes-servico";

const Contratacao: React.FC = () => {
	const {
		passo,
		migalhaDePaoItens,
		formularioServico,
		aoSubmeterFormularioServico,
		servicos,
		podemosAtender,
		tamanhoCasa,
	} = useContratacao();

	if (!servicos || servicos.length < 1 || !Array.isArray(servicos)) {
		return (
			<View style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size={100} />
			</View>
		);
	}

	return (
		<ScrollView>
			{passo < 4 && (
				<MigalhaDePao
					itens={migalhaDePaoItens}
					selecionado={migalhaDePaoItens[passo - 1]}
				/>
			)}
			{passo === 1 && (
				<TituloPagina titulo="Nos conte um pouco sobre o serviço!" />
			)}
			<FormularioUsuarioContainer>
				<View style={{ display: passo !== 1 ? "none" : "flex" }}>
					<FormProvider {...formularioServico}>
						<DetalhesServico
							servicos={servicos}
							comodos={tamanhoCasa.length}
							podemosAtender={podemosAtender}
							aoSubmeter={formularioServico.handleSubmit(
								aoSubmeterFormularioServico
							)}
						/>
					</FormProvider>
				</View>
			</FormularioUsuarioContainer>
		</ScrollView>
	);
};

export default Contratacao;
