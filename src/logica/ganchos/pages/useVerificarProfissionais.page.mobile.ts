import { useState, useEffect } from "react";
import * as Local from "expo-location";

export default function useVerificarProfissionaisMobile() {
	const [cepAutomatico, alterarCepAutomatico] = useState(""),
		[coordenadas, alterarCoordenadas] = useState<{
			latitude: number;
			longitude: number;
		}>();

	useEffect(() => {
		(async () => {
			try {
				const gpsPermitido = await pedirPermissao();
				if (gpsPermitido) {
					alterarCoordenadas(await pegarCoordenadas());
				}
			} catch (erro) {}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			try {
				if (coordenadas) {
					alterarCepAutomatico(await pegarCep());
				}
			} catch (erro) {}
		})();
	}, [coordenadas]);

	async function pedirPermissao(): Promise<boolean> {
		try {
			const { status } = await Local.requestForegroundPermissionsAsync();
			return status === "granted";
		} catch (erro) {
			return false;
		}
	}

	async function pegarCoordenadas(): Promise<{
		latitude: number;
		longitude: number;
	}> {
		const localizacao = await Local.getCurrentPositionAsync({
			accuracy: Local.Accuracy.Highest,
		});
		return localizacao.coords;
	}

	async function pegarCep(): Promise<string> {
		if (coordenadas) {
			const endereco = await Local.reverseGeocodeAsync(coordenadas);
			if (endereco.length > 0) {
				return endereco[0].postalCode || "";
			}
		}
		return "";
	}

	return { cepAutomatico };
}
