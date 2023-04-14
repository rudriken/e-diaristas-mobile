import { useTheme } from "@emotion/react";
import { DiariaInterface } from "logica/@tipos/DiariaInterface";
import { TipoDoUsuario } from "logica/@tipos/InterfaceDoUsuario";
import { ServicoData } from "logica/servicos/ServicoData";
import { ServicoFormatadorDeTexto } from "logica/servicos/ServicoFormatadorDeTexto";
import { repararObjeto_EstadoUsuario } from "logica/servicos/funcoesReparadoras";
import { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { Caption, Subheading, Title } from "react-native-paper";
import { Rating } from "react-native-ratings";
import CampoDeTexto from "visual/componentes/entradas/CampoDeTexto/CampoDeTexto";
import InformacaoDoUsuario from "visual/componentes/exibe-dados/InformacaoDoUsuario/InformacaoDoUsuario";
import Dialogo from "visual/componentes/retorno/Dialogo/Dialogo";

interface DialogoProps {
	diaria: DiariaInterface;
	aoConfirmar: (diaria: DiariaInterface) => void;
	aoCancelar: () => void;
}

export const CaixinhaDeTrabalho: React.FC<{ diaria: DiariaInterface }> = ({
	diaria,
}) => {
	const cores = useTheme().colors;

	return (
		<View>
			<Text style={{ color: cores.textSecondary }}>
				Data:{" "}
				<Text style={{ fontWeight: "bold" }}>
					{ServicoFormatadorDeTexto.reverterFormatoDeData(
						diaria.data_atendimento as string
					)}{" "}
					às{" "}
					{ServicoData.pegarTempoDeData(
						diaria.data_atendimento as string
					)}
				</Text>
			</Text>
			<Text style={{ color: cores.textSecondary }}>
				Endereço: {ServicoFormatadorDeTexto.pegarEndereco(diaria)}
			</Text>
			<Text style={{ color: cores.textSecondary, fontWeight: "bold" }}>
				Valor: {ServicoFormatadorDeTexto.formatarMoeda(diaria.preco)}
			</Text>
		</View>
	);
};

export const SelecaoDialogo: React.FC<DialogoProps> = (propriedades) => {
	const { diarista } = propriedades.diaria;
	return (
		<Dialogo
			aberto={true}
			aoFechar={propriedades.aoCancelar}
			aoConfirmar={() => propriedades.aoConfirmar(propriedades.diaria)}
			rotuloCancelar={"Fechar"}
			naoTerBotaoConfirmar
			subtitulo={
				diarista
					? "Selecionamos o(a) seguinte profissional para a sua diária"
					: "Detalhes da diária"
			}
		>
			<ScrollView>
				<CaixinhaDeTrabalho diaria={propriedades.diaria} />
				{diarista ? (
					<InformacaoDoUsuario
						nome={diarista?.nome_completo || ""}
						avaliacao={diarista?.reputacao || 1}
						foto={diarista?.foto_usuario || ""}
						descricao={
							"Telefone: " +
							ServicoFormatadorDeTexto.formatarTelefone(
								diarista?.telefone || ""
							)
						}
					/>
				) : (
					<Text style={{ textAlign: "center", marginTop: 32 }}>
						Diarista ainda não selecionado(a)
					</Text>
				)}
			</ScrollView>
		</Dialogo>
	);
};

export const ConfirmarDialogo: React.FC<DialogoProps> = (propriedades) => {
	const { diarista } = propriedades.diaria;
	return (
		<Dialogo
			aberto={true}
			aoFechar={propriedades.aoCancelar}
			aoConfirmar={() => propriedades.aoConfirmar(propriedades.diaria)}
			rotuloCancelar={"Fechar"}
			subtitulo={
				"Você confirma a presença do(a) diarista na diária abaixo?"
			}
		>
			<ScrollView>
				<CaixinhaDeTrabalho diaria={propriedades.diaria} />
				<InformacaoDoUsuario
					nome={diarista?.nome_completo || ""}
					avaliacao={diarista?.reputacao || 1}
					foto={diarista?.foto_usuario || ""}
					descricao={
						"Telefone: " +
						ServicoFormatadorDeTexto.formatarTelefone(
							diarista?.telefone || ""
						)
					}
				/>
				<Caption style={{ paddingTop: 16, paddingBottom: 16 }}>
					Ao confirmar a presença do(a) diarista, você está definindo
					que o serviço foi realizado em sua residência e autoriza a
					plataforma a fazer o repasse do valor para o(a)
					profissional. Caso você tenha algum problema, pode entrar em
					contato com a nossa equipe pelo e-mail
					sac@e-diaristas.com.br
				</Caption>
			</ScrollView>
		</Dialogo>
	);
};

interface AvaliarDialogoProps extends Omit<DialogoProps, "aoConfirmar"> {
	aoConfirmar: (
		diaria: DiariaInterface,
		avaliacao: { descricao: string; nota: number }
	) => void;
}

export const AvaliarDialogo: React.FC<AvaliarDialogoProps> = (propriedades) => {
	const cores = useTheme().colors,
		[descricao, alterarDescricao] = useState(""),
		[nota, alterarNota] = useState(3),
		[erro, alterarErro] = useState(""),
		{ usuario } = repararObjeto_EstadoUsuario().estadoUsuario,
		usuarioAvaliado =
			usuario.tipo_usuario === TipoDoUsuario.Cliente
				? propriedades.diaria.diarista
				: propriedades.diaria.cliente;

	function tentarAvaliar() {
		if (descricao.length > 3) {
			propriedades.aoConfirmar(propriedades.diaria, { descricao, nota });
		} else {
			alterarErro("Escreva um depoimento");
		}
	}

	return (
		<Dialogo
			aberto={true}
			aoFechar={propriedades.aoCancelar}
			aoConfirmar={tentarAvaliar}
			rotuloCancelar={"Fechar"}
			subtitulo={"Avalie a diária abaixo"}
		>
			<ScrollView>
				<CaixinhaDeTrabalho diaria={propriedades.diaria} />
				<InformacaoDoUsuario
					nome={usuarioAvaliado?.nome_completo || ""}
					avaliacao={usuarioAvaliado?.reputacao || 1}
					foto={usuarioAvaliado?.foto_usuario || ""}
					descricao={
						"Telefone: " +
						ServicoFormatadorDeTexto.formatarTelefone(
							usuarioAvaliado?.telefone || ""
						)
					}
				/>
				<Title>Deixe a sua avaliação</Title>
				<Subheading>Nota:</Subheading>
				<Rating
					minValue={1}
					imageSize={30}
					tintColor={cores.grey[100]}
					startingValue={nota}
					onFinishRating={alterarNota}
				/>
				<Subheading style={{ marginTop: 32 }}>Depoimento:</Subheading>
				<CampoDeTexto
					placeholder={"Digite aqui seu depoimento"}
					multiline
					numberOfLines={5}
					value={descricao}
					onChangeText={alterarDescricao}
				/>
				<Text style={{ color: cores.error }}>{erro}</Text>
			</ScrollView>
		</Dialogo>
	);
};

interface CancelarDialogoProps extends Omit<DialogoProps, "aoConfirmar"> {
	aoConfirmar: (diaria: DiariaInterface, motivo: string) => void;
}

export const CancelarDialogo: React.FC<CancelarDialogoProps> = (
	propriedades
) => {
	const [motivo, alterarMotivo] = useState(""),
		[erro, alterarErro] = useState(""),
		{ usuario } = repararObjeto_EstadoUsuario().estadoUsuario;

	function tentarCancelar() {
		if (motivo.length > 3) {
			propriedades.aoConfirmar(propriedades.diaria, motivo);
		} else {
			alterarErro("Digite o motivo do cancelamento");
		}
	}

	function pegarAviso(): string {
		if (usuario.id) {
			if (usuario.tipo_usuario === TipoDoUsuario.Diarista) {
				return (
					"Ao cancelar uma diária, você pode ser penalizado(a) com a " +
					"diminuição da sua reputação. Quanto menor a sua reputação, menos " +
					"chance de ser selecionado(a) para as próximas oportunidades. " +
					"O cancelamento de diárias deve ser feito somente em situações de " +
					"exceção."
				);
			} else {
				const dataAtendimento = new Date(
					propriedades.diaria.data_atendimento
				);
				if (ServicoData.pegarDiferencaDeHoras(dataAtendimento) < 24) {
					return (
						"Ao cancelar a diária, devido à proximidade com o horário de " +
						"agendamento do serviço, o sistema cobrará uma multa de 50% " +
						"sobre o valor da diária. O cancelamento de diárias deve ser " +
						"feito somente em situações de exceção."
					);
				}
				return (
					"Ao cancelar uma diária o(a) profissional que já havia agendado " +
					"um dia na sua agenda acaba sendo prejudicado(a). O cancelamento de " +
					"diárias deve ser feito somente em situações de exceção."
				);
			}
		}
		return "";
	}

	return (
		<Dialogo
			aberto={true}
			aoFechar={propriedades.aoCancelar}
			aoConfirmar={tentarCancelar}
			rotuloCancelar={"Fechar"}
			subtitulo={"Tem certeza que deseja cancelar a diária abaixo?"}
		>
			<ScrollView>
				<CaixinhaDeTrabalho diaria={propriedades.diaria} />
				<CampoDeTexto
					placeholder={"Digite o motivo do cancelamento"}
					multiline
					numberOfLines={5}
					value={motivo}
					onChangeText={alterarMotivo}
					style={{ marginTop: 32 }}
					error={erro !== ""}
					textoDeAjuda={erro}
				/>
				<Caption>{pegarAviso()}</Caption>
			</ScrollView>
		</Dialogo>
	);
};
