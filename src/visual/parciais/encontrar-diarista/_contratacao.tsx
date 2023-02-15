import MigalhaDePao from "visual/componentes/navegacao/MigalhaDePao/MigalhaDePao";

const Contratacao: React.FC = () => {
	return (
		<>
			<MigalhaDePao
				itens={["Detalhes", "Identificação", "Pagamento"]}
				selecionado={"Identificação"}
			/>
		</>
	);
};

export default Contratacao;
