import "logica/servicos/RNEnv";
import "logica/servicos/RNPolyfills";
import ProvedorTema from "visual/temas/ProvedorTema";
import Roteador from "visual/roteador/Roteador";

export default function App() {
	return (
		<ProvedorTema>
			<Roteador />
		</ProvedorTema>
	);
}
