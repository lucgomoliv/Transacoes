import { Container } from "react-bootstrap";
import NovoComponent from "./NovoComponent";

function HeaderComponent({ titulo, pathFuncionalidade }: { titulo: string, pathFuncionalidade?: string }) {
	return (
		<>
			<Container style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
				<h1>{titulo}</h1>
				{pathFuncionalidade && <NovoComponent funcionalidade={pathFuncionalidade} />}
			</Container>
		</>
	);
}

export default HeaderComponent;