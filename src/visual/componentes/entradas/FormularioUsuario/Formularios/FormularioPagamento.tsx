import { View } from "react-native";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CampoDeTextoComMascara from "../../CampoDeTextoComMascara/CampoDeTextoComMascara";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import { useTheme } from "@emotion/react";
import { Paragraph } from "react-native-paper";
import {
	CartaoDadosInterface,
	PagamentoFormularioDeDadosInterface,
} from "logica/@tipos/FormularioInterface";

export const FormularioPagamento: React.FC = () => {
	const {
		register,
		formState: { errors },
		control,
	} = useFormContext<
		PagamentoFormularioDeDadosInterface<CartaoDadosInterface> & {
			pagamento_recusado: object;
		}
	>();
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
				name={"pagamento.nome_cartao"}
				defaultValue={""}
				render={({ field }) => {
					return (
						<CampoDeTexto
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							label={"Nome impresso no cartão"}
							error={errors?.pagamento?.nome_cartao !== undefined}
							textoDeAjuda={
								errors?.pagamento?.nome_cartao?.message
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
				name={"pagamento.codigo"}
				defaultValue={""}
				render={({ field }) => {
					return (
						<CampoDeTextoComMascara
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							label={"CVV"}
							mascara={"9999"}
							keyboardType={"number-pad"}
							error={errors?.pagamento?.codigo !== undefined}
							textoDeAjuda={errors?.pagamento?.codigo?.message}
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
