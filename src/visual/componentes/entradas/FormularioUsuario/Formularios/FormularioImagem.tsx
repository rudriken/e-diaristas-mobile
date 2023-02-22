import { View } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import CampoDeArquivo from "../../CampoDeArquivo/CampoDeArquivo";

export const FormularioImagem: React.FC = () => {
	const { control } = useFormContext<{
		usuario: { foto_documento: string };
	}>();
	return (
		<View>
			<Controller
				name={"usuario.foto_documento"}
				defaultValue={""}
				control={control}
				render={({ field }) => (
					<CampoDeArquivo
						aoAlterar={(arquivo) => field.onChange(arquivo)}
					/>
				)}
			/>
		</View>
	);
};
