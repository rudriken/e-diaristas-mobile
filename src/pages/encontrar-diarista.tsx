import { StackNavigationProp } from "@react-navigation/stack";
import { listaDeParametrosDaPilhaRaiz } from "visual/roteador/Roteador";
import { useNavigation } from "@react-navigation/native";
import VerificarProfissionais from "@parciais/encontrar-diarista/_verificar-profissionais";
import Contratacao from "@parciais/encontrar-diarista/_contratacao";
import useEncontrarDiarista from "logica/ganchos/pages/useEncontrarDiarista.page";

type NavegacaoProp = StackNavigationProp<
	listaDeParametrosDaPilhaRaiz,
	"EncontrarDiarista"
>;

const EncontrarDiarista: React.FC = () => {
	const navegacao = useNavigation<NavegacaoProp>();
	const { podeContratar, alterarPodeContratar } = useEncontrarDiarista();

	function aoFinalizar() {}

	return (
		<>
			{!podeContratar ? (
				<VerificarProfissionais
					aoContratarProfissional={() => alterarPodeContratar(true)}
				/>
			) : (
				<Contratacao aoFinalizar={aoFinalizar} />
			)}
		</>
	);
};

export default EncontrarDiarista;
