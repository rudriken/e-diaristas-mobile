import { useTheme } from "@emotion/react";
import IconeDeFonte from "visual/componentes/exibe-dados/IconeDeFonte/IconeDeFonte";
import {
	ContainerContadorDeItens,
	ContainerTextoContador,
	BotaoCircular,
} from "./ContadorDeItens.style";

export interface ContadorDeItensProps {
	rotulo: string;
	plural: string;
	contador: number;
	incrementar: () => void;
	decrementar: () => void;
}

const ContadorDeItens: React.FC<ContadorDeItensProps> = ({
	rotulo,
	plural,
	contador,
	incrementar,
	decrementar,
}) => {
	const cores = useTheme().colors;

	return (
		<ContainerContadorDeItens>
			<BotaoCircular
				icon={() => <IconeDeFonte icone={"minus"} cor={cores.accent} />}
				onPress={decrementar}
			/>
			<ContainerTextoContador>
				{contador} {contador > 1 ? plural : rotulo}
			</ContainerTextoContador>
			<BotaoCircular
				icon={() => <IconeDeFonte icone={"plus"} cor={cores.accent} />}
				onPress={incrementar}
			/>
		</ContainerContadorDeItens>
	);
};

export default ContadorDeItens;
