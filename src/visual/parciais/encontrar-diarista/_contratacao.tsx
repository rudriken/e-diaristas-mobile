import GrupoAlternadorDeBotao from "visual/componentes/entradas/GrupoAlternadorDeBotao/GrupoAlternadorDeBotao";

const Contratacao: React.FC = () => {
	return (
		<>
			<GrupoAlternadorDeBotao
				itens={[
					{
						rotulo: "Limpeza de rotina",
						icone: "cleaning-1",
						valor: "10",
					},
					{
						rotulo: "Limpeza pesada",
						icone: "cleaning-2",
						valor: "20",
					},
					{
						rotulo: "Limpeza pós obra",
						icone: "cleaning-3",
						valor: "30",
					},
				]}
				valor={"20"}
				aoAlterarValor={() => {}}
			/>
		</>
	);
};

export default Contratacao;
