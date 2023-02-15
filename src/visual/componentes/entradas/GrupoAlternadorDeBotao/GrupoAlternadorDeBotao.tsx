import { useTheme } from "@emotion/react";
import IconeDeFonte from "visual/componentes/exibe-dados/IconeDeFonte/IconeDeFonte";
import {
	GrupoAlternadorDeBotaoEstilizado,
	AlternadorDeBotaoEstilizado,
	AlternadorDeBotaoTexto,
} from "./GrupoAlternadorDeBotao.style";

export interface GrupoAlternadorDeBotaoProps {
	valor: any;
	aoAlterarValor: (valor: any) => void;
	itens: { rotulo: string; icone: TwIcon; valor: any }[];
}

const GrupoAlternadorDeBotao: React.FC<GrupoAlternadorDeBotaoProps> = ({
	valor,
	itens = [],
	aoAlterarValor,
}) => {
	const cores = useTheme().colors;
	return (
		<GrupoAlternadorDeBotaoEstilizado>
			{itens.map((item) => {
				return (
					<AlternadorDeBotaoEstilizado
						key={item.valor}
						escolhido={item.valor === valor}
						onPress={() => aoAlterarValor(item.valor)}
					>
						<>
							<IconeDeFonte
								icone={item.icone}
								tamanho={25}
								cor={
									item.valor === valor
										? "white"
										: cores.textSecondary
								}
							/>
							<AlternadorDeBotaoTexto
								style={{
									color:
										item.valor === valor
											? "white"
											: cores.textSecondary,
								}}
							>
								{item.rotulo}
							</AlternadorDeBotaoTexto>
						</>
					</AlternadorDeBotaoEstilizado>
				);
			})}
		</GrupoAlternadorDeBotaoEstilizado>
	);
};

export default GrupoAlternadorDeBotao;
