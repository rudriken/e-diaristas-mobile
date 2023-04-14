import { View } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import { repararObjeto_EstadoUsuario } from "logica/servicos/funcoesReparadoras";

export const FormularioContato: React.FC = () => {
	const {
		control,
		formState: { errors },
	} = useFormContext<{
		usuario: {
			email: string;
			password: string;
			new_password: string;
			password_confirmation: string;
		};
	}>();
	const { usuario } = repararObjeto_EstadoUsuario().estadoUsuario;
	return (
		<View>
			<Controller
				control={control}
				name={"usuario.email"}
				defaultValue={usuario.email}
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
							label={"Senha Antiga"}
							secureTextEntry
							error={errors?.usuario?.password !== undefined}
							textoDeAjuda={errors?.usuario?.password?.message}
						/>
					);
				}}
			/>
			<Controller
				control={control}
				name={"usuario.new_password"}
				defaultValue={""}
				render={({ field }) => {
					return (
						<CampoDeTexto
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							label={"Nova Senha"}
							secureTextEntry
							error={errors?.usuario?.new_password !== undefined}
							textoDeAjuda={
								errors?.usuario?.new_password?.message
							}
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
							label={"Nova Senha Confirmação"}
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
