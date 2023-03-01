import { ServicoInterface } from "logica/@tipos/ServicoInterface";
import { useFormContext, Controller } from "react-hook-form";
import { NovaDiariaFormularioDeDadosInterface } from "logica/@tipos/FormularioInterface";
import { View, Text } from "react-native";
import {
	FormularioEndereco,
	TituloDoGrupoDeCampoFormulario,
} from "visual/componentes/entradas/FormularioUsuario/FormularioUsuario";
import GrupoAlternadorDeBotao from "visual/componentes/entradas/GrupoAlternadorDeBotao/GrupoAlternadorDeBotao";
import ContadorDeItens from "visual/componentes/entradas/ContadorDeItens/ContadorDeItens";
import CampoDeTextoComMascara from "visual/componentes/entradas/CampoDeTextoComMascara/CampoDeTextoComMascara";
import CampoDeTexto from "visual/componentes/entradas/CampoDeTexto/CampoDeTexto";
import { useTheme } from "@emotion/react";
import Botao from "visual/componentes/entradas/Botao/Botao";

interface DetalhesServicoProps {
	servicos?: ServicoInterface[];
	comodos?: number;
	podemosAtender?: boolean;
	aoSubmeter: () => {};
}

export const comodosDaCasa = [
	{
		singular: "Quarto",
		plural: "Quartos",
		nome: "quantidade_quartos",
	},
	{
		singular: "Sala",
		plural: "Salas",
		nome: "quantidade_salas",
	},
	{
		singular: "Banheiro",
		plural: "Banheiros",
		nome: "quantidade_banheiros",
	},
	{
		singular: "Cozinha",
		plural: "Cozinhas",
		nome: "quantidade_cozinhas",
	},
	{
		singular: "Quintal",
		plural: "Quintais",
		nome: "quantidade_quintais",
	},
	{
		singular: "Outro",
		plural: "Outros",
		nome: "quantidade_outros",
	},
];

const nomesDasFaxinas =
	"quantidade_quartos" ||
	"quantidade_salas" ||
	"quantidade_banheiros" ||
	"quantidade_cozinhas" ||
	"quantidade_quintais" ||
	"quantidade_outros";

type nomesDasFaxinasTipo = typeof nomesDasFaxinas;

const DetalhesServico: React.FC<DetalhesServicoProps> = ({
	servicos = [],
	comodos = 0,
	podemosAtender,
	aoSubmeter,
}) => {
	const {
		control,
		formState: { errors },
	} = useFormContext<NovaDiariaFormularioDeDadosInterface>();
	const cores = useTheme().colors;

	return (
		<View>
			<TituloDoGrupoDeCampoFormulario style={{ marginTop: 0 }}>
				Qual tipo de limpeza você precisa?
			</TituloDoGrupoDeCampoFormulario>
			<Controller
				control={control}
				name={"faxina.servico"}
				defaultValue={servicos[0].id || 1}
				render={({ field }) => {
					return (
						<GrupoAlternadorDeBotao
							valor={field.value}
							aoAlterarValor={(valor) =>
								field.onChange(valor || servicos[0].id)
							}
							itens={[...servicos].map((item) => {
								return {
									rotulo: item.nome,
									icone: item.icone?.replace(
										"twf-",
										""
									) as TwIcon,
									valor: item.id,
								};
							})}
						/>
					);
				}}
			/>

			<TituloDoGrupoDeCampoFormulario>
				Qual o tamanho da sua casa?
			</TituloDoGrupoDeCampoFormulario>
			<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
				{comodosDaCasa.map((item) => {
					return (
						<Controller
							key={item.nome}
							control={control}
							name={`faxina.${item.nome as nomesDasFaxinasTipo}`}
							defaultValue={0}
							render={({ field }) => {
								return (
									<ContadorDeItens
										rotulo={item.singular}
										plural={item.plural}
										contador={field.value}
										incrementar={() =>
											field.onChange(field.value + 1)
										}
										decrementar={() =>
											field.onChange(
												Math.max(0, field.value - 1)
											)
										}
									/>
								);
							}}
						/>
					);
				})}
			</View>

			<TituloDoGrupoDeCampoFormulario>
				Qual a data que você gostaria de receber o(a) diarista?
			</TituloDoGrupoDeCampoFormulario>
			<Controller
				control={control}
				name={"faxina.data_atendimento"}
				defaultValue={""}
				render={({ field }) => {
					return (
						<CampoDeTextoComMascara
							value={field.value as string}
							onChangeText={(valor) => field.onChange(valor)}
							mascara={"99/99/9999"}
							keyboardType={"number-pad"}
							label={"Data"}
							error={
								errors?.faxina?.data_atendimento !== undefined
							}
							textoDeAjuda={
								errors?.faxina?.data_atendimento?.message
							}
						/>
					);
				}}
			/>

			<Controller
				control={control}
				name={"faxina.hora_inicio"}
				defaultValue={""}
				render={({ field }) => {
					return (
						<CampoDeTextoComMascara
							value={field.value as string}
							onChangeText={(valor) => field.onChange(valor)}
							mascara={"99:99"}
							keyboardType={"number-pad"}
							label={"Hora Início"}
							error={errors?.faxina?.hora_inicio !== undefined}
							textoDeAjuda={errors?.faxina?.hora_inicio?.message}
						/>
					);
				}}
			/>
			<Controller
				control={control}
				name={"faxina.hora_termino"}
				defaultValue={""}
				render={({ field }) => {
					return (
						<CampoDeTextoComMascara
							value={field.value as string}
							onChangeText={(valor) => field.onChange(valor)}
							mascara={"99:99"}
							label={"Hora Término (campo automático)"}
							error={errors?.faxina?.hora_termino !== undefined}
							textoDeAjuda={errors?.faxina?.hora_termino?.message}
							editable={false}
						/>
					);
				}}
			/>

			<TituloDoGrupoDeCampoFormulario>
				Observações
			</TituloDoGrupoDeCampoFormulario>
			<Controller
				control={control}
				name={"faxina.observacoes"}
				defaultValue={""}
				render={({ field }) => {
					return (
						<CampoDeTexto
							value={field.value as string}
							onChangeText={(valor) => field.onChange(valor)}
							label={"Quer acrescentar algum detalhe?"}
							multiline
						/>
					);
				}}
			/>

			<TituloDoGrupoDeCampoFormulario>
				Qual endereço onde será realizada a limpeza?
			</TituloDoGrupoDeCampoFormulario>
			<FormularioEndereco />

			{!podemosAtender && (
				<Text style={{ color: cores.error, marginBottom: 16 }}>
					Infelizmente ainda não atendemos na sua região
				</Text>
			)}

			<Botao
				uppercase={false}
				dark
				buttonColor={cores.accent}
				mode={"contained"}
				disabled={comodos === 0 || !podemosAtender}
				onPress={aoSubmeter}
			>
				Ir para identificação
			</Botao>
		</View>
	);
};

export default DetalhesServico;
