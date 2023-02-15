import "logica/servicos/RNEnv";
import "logica/servicos/RNPolyfills";
import ProvedorTema from "visual/temas/ProvedorTema";
import Roteador from "visual/roteador/Roteador";
import { ProvedorPrincipal } from "logica/contextos/ContextoPrincipal";

export default function App() {
	return (
		<ProvedorPrincipal>
			<ProvedorTema>
				<Roteador />
			</ProvedorTema>
		</ProvedorPrincipal>
	);
}
