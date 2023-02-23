import { Text, View, Linking } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import {
	CredenciaisInterface,
	LoginFormularioDeDadosInterface,
} from "logica/@tipos/FormularioInterface";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import { useTheme } from "@emotion/react";

export const FormularioLogin: React.FC = () => {
	const {
		control,
		formState: { errors },
	} = useFormContext<LoginFormularioDeDadosInterface<CredenciaisInterface>>();
	const cores = useTheme().colors;
	return (
		<View>
			<Controller
				control={control}
				name={"login.email"}
				defaultValue={""}
				render={({ field }) => {
					return (
						<CampoDeTexto
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							keyboardType={"email-address"}
							label={"E-mail"}
							error={errors?.login?.email !== undefined}
							textoDeAjuda={errors?.login?.email?.message}
						/>
					);
				}}
			/>
			<Controller
				control={control}
				name={"login.password"}
				defaultValue={""}
				render={({ field }) => {
					return (
						<CampoDeTexto
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							secureTextEntry
							label={"Senha"}
							error={errors?.login?.password !== undefined}
							textoDeAjuda={errors?.login?.password?.message}
						/>
					);
				}}
			/>
			<Text
				style={{
					textAlign: "right",
					textDecorationLine: "underline",
					color: cores.textSecondary,
				}}
				onPress={() =>
					Linking.openURL(
						process.env["NEXT_PUBLIC_RECUPERAR_SENHA"] as string
					)
				}
			>
				Esqueci minha senha
			</Text>
		</View>
	);
};
