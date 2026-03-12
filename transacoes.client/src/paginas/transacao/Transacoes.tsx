import { useState, useEffect } from "react";
import type { TableColumnType } from "react-bs-datatable";
import { useNavigate } from "react-router";
import DataTableComponent from "../../componentes/DataTableComponent";
import HeaderComponent from "../../componentes/HeaderComponent";
import type { Transacao } from "../../models/Transacao";

function Transacoes() {
	const [body, setBody] = useState<Transacao[]>([]);
	const [carregando, setCarregando] = useState<boolean>(true);

	const headers: TableColumnType<Transacao>[] = [
		{ title: 'Id', prop: 'id', isSortable: true, isFilterable: true },
		{ title: 'Descrição', prop: 'descricao', isSortable: true, isFilterable: true },
		{ title: 'Valor', prop: 'valor', isSortable: true },
		{ title: 'Tipo', prop: 'tipo', isSortable: true },
		{ title: 'Pessoa', prop: 'pessoa.nome', isSortable: true },
		{ title: 'Categoria', prop: 'categoria.descricao', isSortable: true },
	];

	const navigate = useNavigate();

	useEffect(() => {
		fetch("/api/transacao")
			.then(data => data.json())
			.then(data => setBody(data))
			.then(() => setCarregando(false));
	}, []);

	return (
		<>
			<HeaderComponent titulo="Transações" pathFuncionalidade="/transacoes" />
			<DataTableComponent<Transacao> body={body} headers={headers} carregando={carregando} onRowClick={row => navigate("/transacoes/" + row.id)} />
		</>
	);
}

export default Transacoes;