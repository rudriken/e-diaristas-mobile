import AsyncStorage from "@react-native-async-storage/async-storage";

export const LocalStorage = {
	async pegar<T>(chave: string, valorPadrao: T): Promise<T | string> {
		const valor = await AsyncStorage.getItem(chave);
		if (valor === null) {
			return valorPadrao;
		}
		try {
			return JSON.parse(valor);
		} catch (erro) {
			return valor;
		}
	},
	gravar<T>(chave: string, valor: T) {
		if (typeof valor !== "string") {
			AsyncStorage.setItem(chave, JSON.stringify(valor));
		} else {
			AsyncStorage.setItem(chave, valor);
		}
	},
	apagar(chave: string) {
		AsyncStorage.removeItem(chave);
	},
	apagarTudo() {
		AsyncStorage.clear();
	},
};
