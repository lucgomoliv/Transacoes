import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router';

function NavbarComponent() {
	return (
		<Navbar expand="lg" className="bg-body-tertiary" fixed="top">
			<Container className="justify-content">
				<Navbar.Brand>
					<Link className="nav-link" to="/">
						Transações
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Link className="nav-link" to="/pessoas">
							Pessoas
						</Link>
						<Link className="nav-link" to="/categorias">
							Categorias
						</Link>
						<Link className="nav-link" to="/transacoes">
							Transações
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavbarComponent;