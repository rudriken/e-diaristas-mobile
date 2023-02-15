import CampoDeLasca from "visual/componentes/exibe-dados/CampoDeLasca/CampoDeLasca";

const Contratacao: React.FC = () => {
	return (
		<>
			<CampoDeLasca
				paraDeletar={() => {}}
				listaDeItens={[
					"Uberlândia - MG",
					"Uberaba - MG",
					"Sertãozinho - SP",
					"Franca - SP",
					"Curitiba - PR",
				]}
			/>
			<CampoDeLasca
				listaDeItens={[]}
				mensagemQuandoVazio={"Nenhuma cidade ainda!"}
			/>
		</>
	);
};

export default Contratacao;
