import { View, Text } from "react-native";
import Dialogo from "visual/componentes/retorno/Dialogo/Dialogo";

const Contratacao: React.FC = () => {
	return (
		<>
			<Dialogo
				aberto={true}
				aoFechar={() => {}}
				titulo={"React Native"}
				subtitulo={"Gostando do curso?"}
				alturaTotal
				rotuloCancelar="NÃO"
				rotuloConfirmar="SIM"
			>
				<View>
					<Text>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Harum hic dignissimos provident ut doloribus eius nisi
						quos, deleniti velit rerum. Saepe natus velit nesciunt
						numquam explicabo facilis quod illo? Quam. Id est
						corporis, autem labore consequuntur, porro laudantium
						incidunt cumque eos quis fugiat iusto totam possimus
						quas necessitatibus quos nostrum odio voluptatibus
						molestiae sequi magnam? Aspernatur harum qui eveniet.
						Eaque? Voluptatibus quo fuga in at esse consequuntur,
						minus aliquam, debitis modi saepe dicta culpa quas alias
						odio illum incidunt iusto nobis voluptates. Facilis eius
						accusamus non veniam rem aliquam nostrum!
					</Text>
				</View>
			</Dialogo>
		</>
	);
};

export default Contratacao;
