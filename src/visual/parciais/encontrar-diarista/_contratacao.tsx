import ContadorDeItens from "visual/componentes/entradas/ContadorDeItens/ContadorDeItens";

const Contratacao: React.FC = () => {
	return (
		<>
			<ContadorDeItens
				rotulo={"Sala"}
				plural={"Salas"}
				contador={3}
				incrementar={() => {}}
				decrementar={() => {}}
			/>
		</>
	);
};

export default Contratacao;
