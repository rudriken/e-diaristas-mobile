import { View } from "react-native";

// import { useFormContext } from "react-hook-form";

// import { ContextoUsuario } from "logica/contextos/ContextoUsuario";

export interface FormularioDadosUsuarioProps {
	cadastro?: boolean;
}

export const FormularioDadosUsuario: React.FC<FormularioDadosUsuarioProps> = ({
	cadastro = false,
}) => {
	// const {
	// 		register,
	// 		formState: { errors },
	// 		control,
	// 	} = useFormContext<{
	// 		usuario: {
	// 			nome_completo: string;
	// 			nascimento: string;
	// 			cpf: string;
	// 			telefone: string;
	// 		};
	// 	}>(),

	return <View></View>;
};
