import { ContainerLasca, LascaEstilizada } from "./CampoDeLasca.style";
import { Paragraph } from "react-native-paper";

export interface CampoDeLascaProps {
	listaDeItens: string[];
	mensagemQuandoVazio?: string;
	paraDeletar?: (item: string) => void;
}

const CampoDeLasca: React.FC<CampoDeLascaProps> = ({
	listaDeItens,
	mensagemQuandoVazio = "Nada selecionado ainda",
	...outras
}) => {
	function paraExcluir(item: string) {
		if (outras.paraDeletar) {
			outras.paraDeletar(item);
		}
	}

	return (
		<ContainerLasca>
			{listaDeItens.length ? (
				listaDeItens.map((item, indice) => {
					return (
						<LascaEstilizada
							key={indice}
							onClose={() => paraExcluir(item)}
						>
							{item}
						</LascaEstilizada>
					);
				})
			) : (
				<Paragraph>{mensagemQuandoVazio}</Paragraph>
			)}
		</ContainerLasca>
	);
};

export default CampoDeLasca;
