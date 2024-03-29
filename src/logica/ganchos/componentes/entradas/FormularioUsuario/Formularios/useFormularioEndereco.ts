import useCidades from "logica/ganchos/useCidades.hook";
import { ServicoLocalizacao } from "logica/servicos/ServicoLocalizacao";
import { useFormContext } from "react-hook-form";
import { useMemo, useEffect } from "react";
import { NovaDiariaFormularioDeDadosInterface } from "logica/@tipos/FormularioInterface";
import { repararObjeto_EstadoUsuario } from "logica/servicos/funcoesReparadoras";

export default function useFormularioEndereco() {
	const { enderecoUsuario, usuario } =
			repararObjeto_EstadoUsuario().estadoUsuario,
		{
			register,
			control,
			watch,
			setValue,
			formState: { errors },
		} = useFormContext<NovaDiariaFormularioDeDadosInterface>(),
		[enderecoEstado, enderecoCidade, enderecoCEP] = watch([
			"endereco.estado",
			"endereco.cidade",
			"endereco.cep",
		]),
		estados = ServicoLocalizacao.listarEstados(),
		listaCidades = useCidades(enderecoEstado),
		opcoesCidades = useMemo(
			() => listaCidades.map((item) => item.cidade),
			[listaCidades]
		);

	useEffect(() => {
		register("endereco.codigo_ibge");
	}, []);

	useEffect(() => {
		if (enderecoCidade) {
			const cidade = listaCidades.find((item) => {
				item.cidade === enderecoCidade;
			});
			if (cidade) {
				setValue("endereco.codigo_ibge", cidade.codigo_ibge);
			}
		}
	}, [enderecoCidade]);

	useEffect(() => {
		const cep = (enderecoCEP || "").replaceAll("_", "");
		if (cep.length === 10) {
			ServicoLocalizacao.localizarCEP(cep).then((novoEndereco) => {
				if (novoEndereco) {
					novoEndereco.uf &&
						setValue("endereco.estado", novoEndereco.uf);
					novoEndereco.localidade &&
						setValue("endereco.cidade", novoEndereco.localidade);
					novoEndereco.ibge &&
						setValue("endereco.codigo_ibge", novoEndereco.ibge);
					novoEndereco.bairro &&
						setValue("endereco.bairro", novoEndereco.bairro);
					novoEndereco.logradouro &&
						setValue(
							"endereco.logradouro",
							novoEndereco.logradouro
						);
				}
			});
		}
	}, [enderecoCEP]);
	return {
		enderecoUsuario,
		usuario,
		control,
		errors,
		estados,
		opcoesCidades,
		enderecoEstado,
		enderecoCidade,
		enderecoCEP,
		register,
	};
}
