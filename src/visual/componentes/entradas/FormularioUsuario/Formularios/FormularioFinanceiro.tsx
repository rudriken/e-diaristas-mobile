import { View } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import { repararObjeto_EstadoUsuario } from "logica/servicos/funcoesReparadoras";

export const FormularioFinanceiro: React.FC = () => {
	const { control } = useFormContext<{ usuario: { chave_pix: string } }>(),
		{ usuario } = repararObjeto_EstadoUsuario().estadoUsuario;
	return (
		<View>
			<Controller
				name={"usuario.chave_pix"}
				defaultValue={usuario.chave_pix}
				control={control}
				render={({ field }) => (
					<CampoDeTexto
						label={"Chave Pix"}
						value={field.value}
						onChangeText={(valor) => field.onChange(valor)}
					/>
				)}
			/>
		</View>
	);
};
