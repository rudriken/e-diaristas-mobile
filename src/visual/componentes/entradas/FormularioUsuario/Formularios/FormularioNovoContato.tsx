import { View } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";

export const FormularioNovoContato: React.FC = () => {
	const {
		control,
		formState: { errors },
	} = useFormContext<{
		usuario: {
			email: string;
			password: string;
			password_confirmation: string;
		};
	}>();
	return (
		<View>
			<Controller
				control={control}
				name={"usuario.email"}
				defaultValue={""}
				render={({ field }) => {
					return (
						<CampoDeTexto
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							label={"E-mail"}
							keyboardType={"email-address"}
							error={errors?.usuario?.email !== undefined}
							textoDeAjuda={errors?.usuario?.email?.message}
						/>
					);
				}}
			/>
			<Controller
				control={control}
				name={"usuario.password"}
				defaultValue={""}
				render={({ field }) => {
					return (
						<CampoDeTexto
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							label={"Senha"}
							secureTextEntry
							error={errors?.usuario?.password !== undefined}
							textoDeAjuda={errors?.usuario?.password?.message}
						/>
					);
				}}
			/>
			<Controller
				control={control}
				name={"usuario.password_confirmation"}
				defaultValue={""}
				render={({ field }) => {
					return (
						<CampoDeTexto
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							label={"Confirmação da Senha"}
							secureTextEntry
							error={
								errors?.usuario?.password_confirmation !==
								undefined
							}
							textoDeAjuda={
								errors?.usuario?.password_confirmation?.message
							}
						/>
					);
				}}
			/>
		</View>
	);
};
