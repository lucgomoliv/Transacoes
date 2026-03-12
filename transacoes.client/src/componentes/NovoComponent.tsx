import { Button } from "react-bootstrap";
import { Link } from "react-router";

function NovoComponent({ funcionalidade }: { funcionalidade: string }) {
	let url = funcionalidade + "/novo";

	return (
		<>
			<Link to={url}>
				<Button>Novo</Button>
			</Link>
		</>
	);
}

export default NovoComponent;