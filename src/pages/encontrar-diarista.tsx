import { StackNavigationProp } from "@react-navigation/stack";
import { listaDeParametrosDaPilhaRaiz } from "visual/roteador/Roteador";
import { useNavigation } from "@react-navigation/native";
import VerificarProfissionais from "@parciais/encontrar-diarista/_verificar-profissionais";

type NavegacaoProp = StackNavigationProp<
	listaDeParametrosDaPilhaRaiz,
	"EncontrarDiarista"
>;

const EncontrarDiarista: React.FC = () => {
	const navegacao = useNavigation<NavegacaoProp>();
	return (
		<>
			<VerificarProfissionais aoContratarProfissional={() => {}} />
		</>
	);
};

export default EncontrarDiarista;
