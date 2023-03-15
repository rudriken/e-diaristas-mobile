import { ProvedorDiaria } from "logica/contextos/ContextoDiarias";
import MinhasDiarias from "@parciais/diarias/_minhas-diarias";

const Diarias = () => {
	return (
		<ProvedorDiaria>
			<MinhasDiarias />
		</ProvedorDiaria>
	);
};

export default Diarias;
