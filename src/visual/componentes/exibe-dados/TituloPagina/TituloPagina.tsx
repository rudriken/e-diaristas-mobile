import {
	ContainerTituloPagina,
	TituloPaginaEstilizado,
	SubtituloPaginaEstilizado,
} from "./TituloPagina.style";

export interface TituloPaginaProps {
	titulo: string;
	subtitulo?: string | JSX.Element;
}

const TituloPagina: React.FC<TituloPaginaProps> = ({ titulo, subtitulo }) => {
	return (
		<ContainerTituloPagina>
			<TituloPaginaEstilizado>{titulo}</TituloPaginaEstilizado>
			{subtitulo && (
				<SubtituloPaginaEstilizado>
					{subtitulo}
				</SubtituloPaginaEstilizado>
			)}
		</ContainerTituloPagina>
	);
};

export default TituloPagina;
