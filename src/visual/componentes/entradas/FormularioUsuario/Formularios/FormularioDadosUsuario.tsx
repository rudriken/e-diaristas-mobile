import { useContext } from "react";
import { View } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { ContextoUsuario } from "logica/contextos/ContextoUsuario";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import CampoDeTextoComMascara from "../../CampoDeTextoComMascara/CampoDeTextoComMascara";

export interface FormularioDadosUsuarioProps {
	cadastro?: boolean;
}

export const FormularioDadosUsuario: React.FC<FormularioDadosUsuarioProps> = ({
	cadastro = false,
}) => {
	const {
		formState: { errors },
		control,
	} = useFormContext<{
		usuario: {
			nome_completo: string;
			nascimento: string;
			cpf: string;
			telefone: string;
		};
	}>();
	const { usuario } = useContext(ContextoUsuario).estadoUsuario;
	return (
		<View>
			<Controller
				control={control}
				name={"usuario.nome_completo"}
				defaultValue={usuario.nome_completo}
				render={({ field }) => {
					return (
						<CampoDeTexto
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							label={"Nome completo"}
							error={errors?.usuario?.nome_completo !== undefined}
							textoDeAjuda={
								errors?.usuario?.nome_completo?.message
							}
						/>
					);
				}}
			/>
			<Controller
				control={control}
				name={"usuario.nascimento"}
				defaultValue={ServicoFormatadorDeTexto.reverterFormatoDeData(
					usuario.nascimento as string
				)}
				render={({ field }) => {
					return (
						<CampoDeTextoComMascara
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							label={"Data de nascimento"}
							mascara={"99/99/9999"}
							keyboardType={"number-pad"}
							error={errors?.usuario?.nascimento !== undefined}
							textoDeAjuda={errors?.usuario?.nascimento?.message}
						/>
					);
				}}
			/>
			<Controller
				control={control}
				name={"usuario.cpf"}
				defaultValue={usuario.cpf}
				render={({ field }) => {
					return (
						<CampoDeTextoComMascara
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							label={"CPF"}
							mascara={"999.999.999-99"}
							keyboardType={"number-pad"}
							error={errors?.usuario?.cpf !== undefined}
							textoDeAjuda={errors?.usuario?.cpf?.message}
							disabled={!cadastro}
						/>
					);
				}}
			/>
			<Controller
				control={control}
				name={"usuario.telefone"}
				defaultValue={usuario.telefone}
				render={({ field }) => {
					return (
						<CampoDeTextoComMascara
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							label={"Telefone"}
							mascara={"(99) 99999-9999"}
							keyboardType={"number-pad"}
							error={errors?.usuario?.telefone !== undefined}
							textoDeAjuda={errors?.usuario?.telefone?.message}
						/>
					);
				}}
			/>
		</View>
	);
};
