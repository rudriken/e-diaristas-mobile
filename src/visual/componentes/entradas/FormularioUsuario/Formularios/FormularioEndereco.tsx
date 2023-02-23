import { View, ActivityIndicator } from "react-native";
import { Controller } from "react-hook-form";
import useFormularioEndereco from "logica/ganchos/componentes/entradas/FormularioUsuario/Formularios/useFormularioEndereco";
import { TipoDoUsuario } from "logica/@tipos/InterfaceDoUsuario";
import CampoDeTextoComMascara from "../../CampoDeTextoComMascara/CampoDeTextoComMascara";
import AutoCompletar from "../../AutoCompletar/AutoCompletar";
import CampoDeTexto from "../../CampoDeTexto/CampoDeTexto";

export const FormularioEndereco: React.FC = () => {
	const {
		enderecoUsuario,
		usuario,
		control,
		errors,
		estados,
		opcoesCidades,
		enderecoEstado,
	} = useFormularioEndereco();

	if (
		usuario.nome_completo &&
		usuario.tipo_usuario === TipoDoUsuario.Diarista &&
		!enderecoUsuario.estado
	) {
		return (
			<View style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size={"large"} />
			</View>
		);
	}

	return (
		<View>
			<Controller
				control={control}
				name={"endereco.cep"}
				defaultValue={enderecoUsuario.cep}
				render={({ field }) => {
					return (
						<CampoDeTextoComMascara
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							label={"CEP"}
							mascara={"99.999-999"}
							keyboardType={"number-pad"}
							error={errors?.endereco?.cep !== undefined}
							textoDeAjuda={errors?.endereco?.cep?.message}
						/>
					);
				}}
			/>
			<Controller
				control={control}
				name={"endereco.estado"}
				defaultValue={enderecoUsuario.estado}
				render={({ field }) => {
					return (
						<AutoCompletar
							valor={field.value}
							aoMudarTexto={field.onChange}
							rotulo={"Estado"}
							opcoes={estados.map((item) => item.sigla)}
							carregando={estados.length === 0}
							mensagemDeCarregando={"Carregando estados ..."}
							textoQuandoNaoHaOpcoes={
								"Nenhum estado com esse nome!"
							}
						/>
					);
				}}
			/>
			<Controller
				control={control}
				name={"endereco.cidade"}
				defaultValue={enderecoUsuario.cidade}
				render={({ field }) => {
					return (
						<AutoCompletar
							valor={field.value}
							aoMudarTexto={field.onChange}
							rotulo={"Cidade"}
							opcoes={opcoesCidades}
							carregando={opcoesCidades.length === 0}
							mensagemDeCarregando={"Carregando cidades ..."}
							textoQuandoNaoHaOpcoes={
								"Nenhuma cidade com esse nome!"
							}
							desabilitado={
								enderecoEstado === "" ||
								opcoesCidades.length === 0
							}
						/>
					);
				}}
			/>
			<Controller
				control={control}
				name={"endereco.bairro"}
				defaultValue={enderecoUsuario.bairro}
				render={({ field }) => {
					return (
						<CampoDeTexto
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							label={"Bairro"}
							error={errors?.endereco?.bairro !== undefined}
							textoDeAjuda={errors?.endereco?.bairro?.message}
						/>
					);
				}}
			/>
			<Controller
				control={control}
				name={"endereco.logradouro"}
				defaultValue={enderecoUsuario.logradouro}
				render={({ field }) => {
					return (
						<CampoDeTexto
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							label={"Logradouro"}
							error={errors?.endereco?.logradouro !== undefined}
							textoDeAjuda={errors?.endereco?.logradouro?.message}
						/>
					);
				}}
			/>
			<Controller
				control={control}
				name={"endereco.numero"}
				defaultValue={enderecoUsuario.numero}
				render={({ field }) => {
					return (
						<CampoDeTexto
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							label={"Número"}
							error={errors?.endereco?.numero !== undefined}
							textoDeAjuda={errors?.endereco?.numero?.message}
						/>
					);
				}}
			/>
			<Controller
				control={control}
				name={"endereco.complemento"}
				defaultValue={enderecoUsuario.complemento}
				render={({ field }) => {
					return (
						<CampoDeTexto
							value={field.value}
							onChangeText={(valor) => field.onChange(valor)}
							label={"Complemento"}
							error={errors?.endereco?.complemento !== undefined}
							textoDeAjuda={
								errors?.endereco?.complemento?.message
							}
						/>
					);
				}}
			/>
		</View>
	);
};
