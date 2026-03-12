import { Spinner } from "react-bootstrap";

function LoadingComponent() {
	return (
		<tbody>
			<tr>
				<td align="center" colSpan={100}>
					<Spinner animation="grow" />
				</td>
			</tr>
		</tbody>
	);
}

export default LoadingComponent;