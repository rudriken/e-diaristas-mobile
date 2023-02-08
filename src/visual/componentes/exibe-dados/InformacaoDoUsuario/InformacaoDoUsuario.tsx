import {
	InformacaoDoUsuarioContainer,
	NomeAvaliacaoDescricaoContainer,
	NomeUsuario,
	AvaliacaoUsuario,
	DescricaoUsuario,
} from "./InformacaoDoUsuario.style";
import { Avatar } from "react-native-paper";

export interface InformacaoDoUsuarioProps {
	nome: string;
	foto: string;
	avaliacao: number;
	descricao?: string;
	fundoUmPoucoMaisEscuro?: boolean;
}

const InformacaoDoUsuario: React.FC<InformacaoDoUsuarioProps> = ({
	nome,
	foto,
	avaliacao,
	descricao,
	fundoUmPoucoMaisEscuro,
}) => {
	return (
		<InformacaoDoUsuarioContainer
			maisEscuro={Boolean(fundoUmPoucoMaisEscuro)}
		>
			{foto ? (
				<Avatar.Image size={50} source={{ uri: foto }} />
			) : (
				<Avatar.Text size={50} label={nome[0]} />
			)}
			<NomeAvaliacaoDescricaoContainer>
				<NomeUsuario>{nome}</NomeUsuario>
				<AvaliacaoUsuario defaultRating={avaliacao} />
				<DescricaoUsuario>{descricao}</DescricaoUsuario>
			</NomeAvaliacaoDescricaoContainer>
		</InformacaoDoUsuarioContainer>
	);
};

export default InformacaoDoUsuario;
