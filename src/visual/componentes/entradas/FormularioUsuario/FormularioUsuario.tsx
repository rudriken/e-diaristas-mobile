export interface FormularioUsuarioProps {}

// outra forma de exportar arquivo (importação implícita e exportação direta):
export {
	ContainerFormularioEstilizado as FormularioUsuarioContainer,
	TituloDoGrupoDeCampoFormularioEstilizado as TituloDoGrupoDeCampoFormulario,
} from "./FormularioUsuario.style";

const FormularioUsuario: React.FC<FormularioUsuarioProps> = () => {
	return <div></div>;
};

export default FormularioUsuario;

export * from "./Formularios/FormularioEndereco";
export * from "./Formularios/FormularioNovoContato";
export * from "./Formularios/FormularioContato";
export * from "./Formularios/FormularioPagamento";
export * from "./Formularios/FormularioImagem";
export * from "./Formularios/FormularioDadosUsuario";
export * from "./Formularios/FormularioLogin";
export * from "./Formularios/FormularioFinanceiro";
export * from "./Formularios/FormularioCidades";
