import { ContainerMigalhaDePao, ItemMigalhaDePao } from "./MigalhaDePao.style";

export interface MigalhaDePaoProps {
	selecionado: string;
	itens: string[];
}

const MigalhaDePao: React.FC<MigalhaDePaoProps> = ({ selecionado, itens }) => {
	return (
		<ContainerMigalhaDePao>
			{itens.map((item, indice) => {
				return (
					<ItemMigalhaDePao
						key={indice}
						estaSelecionado={selecionado === item}
					>
						{item}
					</ItemMigalhaDePao>
				);
			})}
		</ContainerMigalhaDePao>
	);
};

export default MigalhaDePao;
