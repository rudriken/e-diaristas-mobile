import { View, Platform } from "react-native";
import { useEffect, useState } from "react";
import { Avatar } from "react-native-paper";
import Botao from "../Botao/Botao";
import { useTheme } from "@emotion/react";
import * as ImagemSelecionada from "expo-image-picker";
import { ImagePickerResult } from "expo-image-picker/build/ImagePicker.types";
import { ArquivoDoCampoDeArquivoInterface } from "logica/@tipos/ArquivoInterface";

export interface CampoDeArquivoProps {
	aoAlterar: (arquivo: ArquivoDoCampoDeArquivoInterface) => void;
	valorPadrao?: string;
}

const CampoDeArquivo: React.FC<CampoDeArquivoProps> = ({
	aoAlterar,
	valorPadrao,
}) => {
	const cores = useTheme().colors;
	const [caminhoDoArquivo, alterarCaminhoDoArquivo] = useState("");

	useEffect(() => {
		permissao();
	}, []);

	useEffect(() => {
		if (valorPadrao && !caminhoDoArquivo) {
			alterarCaminhoDoArquivo(valorPadrao);
		}
	}, [valorPadrao]);

	async function permissao(): Promise<boolean> {
		const { status } =
			await ImagemSelecionada.requestMediaLibraryPermissionsAsync();
		return status === "granted";
	}

	async function pegarImagem() {
		const resultado = await ImagemSelecionada.launchImageLibraryAsync({
			mediaTypes: ImagemSelecionada.MediaTypeOptions.Images,
			quality: 1,
		});
		if (!resultado.canceled) {
			tratarEscolhaArquivo(resultado);
		}
	}

	function tratarEscolhaArquivo(imagem: ImagePickerResult) {
		if (imagem.assets !== null) {
			alterarCaminhoDoArquivo(imagem.assets[0].uri);
			const arquivo = {
				tipo: "image/png",
				nome: "foto.png",
				caminho:
					Platform.OS === "android"
						? imagem.assets[0].uri
						: "file://" + imagem.assets[0].uri,
			};
			aoAlterar(arquivo);
		}
	}

	return (
		<View style={{ alignItems: "center" }}>
			{caminhoDoArquivo ? (
				<Avatar.Image size={120} source={{ uri: caminhoDoArquivo }} />
			) : (
				<Avatar.Text size={120} label={"?"} />
			)}

			<Botao
				uppercase={false}
				dark
				mode={"contained"}
				buttonColor={cores.accent}
				style={{ marginTop: 16 }}
				onPress={pegarImagem}
			>
				Escolher arquivo
			</Botao>
		</View>
	);
};

export default CampoDeArquivo;
