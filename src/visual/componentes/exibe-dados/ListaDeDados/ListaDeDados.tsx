import { ReactNode } from "react";
import { List } from "react-native-paper";
import {
	AcordeonEstilizado,
	AcordeonDetalhes,
	AcordeonAcoes,
} from "./ListaDeDados.style";

export interface ListaDeDadosProps {
	cabecalho?: ReactNode;
	corpo?: ReactNode;
	acoes?: ReactNode;
}

const ListaDeDados: React.FC<ListaDeDadosProps> = ({
	cabecalho,
	corpo,
	acoes,
}) => {
	return (
		<List.Section>
			<AcordeonEstilizado title={cabecalho}>
				<AcordeonDetalhes>
					{corpo}
					{acoes && <AcordeonAcoes>{acoes}</AcordeonAcoes>}
				</AcordeonDetalhes>
			</AcordeonEstilizado>
		</List.Section>
	);
};

export default ListaDeDados;
