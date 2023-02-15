import { CorDoTexto } from "logica/@tipos/DiariaInterface";
import { PropsWithChildren } from "react";
import { StatusE } from "./Status.style";
import { useTheme } from "@emotion/react";

export interface StatusProps {
	cor?: CorDoTexto;
}

const Status: React.FC<PropsWithChildren & StatusProps> = ({
	children,
	cor = "success",
}) => {
	const cores = useTheme().colors;
	return <StatusE corDeFundo={cores[cor]}>{children}</StatusE>;
};

export default Status;
