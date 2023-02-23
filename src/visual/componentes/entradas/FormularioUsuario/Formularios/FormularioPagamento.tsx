import { View } from "react-native";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CampoDeTextoComMascara from "../../CampoDeTextoComMascara/CampoDeTextoComMascara";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import { useTheme } from "@emotion/react";
import { Paragraph } from "react-native-paper";

export const FormularioPagamento: React.FC = () => {
	const {
		register,
		formState: { errors },
		control,
	} = useFormContext<{
		pagamento: {
			numero_cartao: string;
			nome_titular_cartao: string;
			validade: string;
			codigo_cvv: string;
		};
		pagamento_recusado: object;
	}>();
	const cores = useTheme().colors;

	useEffect(() => {
		register("pagamento_recusado");
	}, []);

	return (
		<View>
			<Controller
				control={control}
				name={"pagamento.numero_cartao"}
				defaultValue={""}
				render={({ field }) => {
					return (
						<CampoDeTextoComMascara
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							label={"Número do cartão"}
							mascara={"9999 9999 9999 9999"}
							keyboardType={"number-pad"}
							error={
								errors?.pagamento?.numero_cartao !== undefined
							}
							textoDeAjuda={
								errors?.pagamento?.numero_cartao?.message
							}
						/>
					);
				}}
			/>
			<Controller
				control={control}
				name={"pagamento.nome_titular_cartao"}
				defaultValue={""}
				render={({ field }) => {
					return (
						<CampoDeTexto
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							label={"Nome impresso no cartão"}
							error={
								errors?.pagamento?.nome_titular_cartao !==
								undefined
							}
							textoDeAjuda={
								errors?.pagamento?.nome_titular_cartao?.message
							}
						/>
					);
				}}
			/>
			<Controller
				control={control}
				name={"pagamento.validade"}
				defaultValue={""}
				render={({ field }) => {
					return (
						<CampoDeTextoComMascara
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							label={"Validade"}
							mascara={"99/99"}
							keyboardType={"number-pad"}
							error={errors?.pagamento?.validade !== undefined}
							textoDeAjuda={errors?.pagamento?.validade?.message}
						/>
					);
				}}
			/>
			<Controller
				control={control}
				name={"pagamento.codigo_cvv"}
				defaultValue={""}
				render={({ field }) => {
					return (
						<CampoDeTextoComMascara
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							label={"CVV"}
							mascara={"9999"}
							keyboardType={"number-pad"}
							error={errors?.pagamento?.codigo_cvv !== undefined}
							textoDeAjuda={
								errors?.pagamento?.codigo_cvv?.message
							}
						/>
					);
				}}
			/>
			{errors.pagamento_recusado !== undefined && (
				<Paragraph style={{ color: cores.error, textAlign: "center" }}>
					{errors?.pagamento_recusado.message}
				</Paragraph>
			)}
		</View>
	);
};
