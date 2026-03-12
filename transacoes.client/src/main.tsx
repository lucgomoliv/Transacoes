import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './componentes/NavbarComponent.tsx';
import { Route, Routes, BrowserRouter } from 'react-router';
import Pessoas from './paginas/pessoa/Pessoas.tsx';
import Categorias from './paginas/categoria/Categorias.tsx';
import Transacoes from './paginas/transacao/Transacoes.tsx';
import { Container } from 'react-bootstrap';
import CategoriasNovo from './paginas/categoria/CategoriasNovo.tsx';
import TransacoesNovo from './paginas/transacao/TransacoesNovo.tsx';
import PessoasNovo from './paginas/pessoa/PessoasNovo.tsx';
import { Toaster } from 'react-hot-toast';
import "./index.css";

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Container style={{ marginTop: "5rem" }}>
				<NavbarComponent />
				<Routes>
					<Route index element={<App />} />
					<Route path="pessoas">
						<Route index element={<Pessoas />}/>
						<Route path="novo" element={<PessoasNovo />} />
						<Route path=":identificador" element={<PessoasNovo />} />
					</Route>
					<Route path="categorias" >
						<Route index element={<Categorias />} />
						<Route path="novo" element={<CategoriasNovo />} />
						<Route path=":identificador" element={<CategoriasNovo />} />
					</Route>
					<Route path="transacoes">
						<Route index element={<Transacoes />} />
						<Route path="novo" element={<TransacoesNovo />} />
						<Route path=":identificador" element={<TransacoesNovo />} />
					</Route>
				</Routes>
				<Toaster />
			</Container>
		</BrowserRouter>
	</StrictMode>
)
