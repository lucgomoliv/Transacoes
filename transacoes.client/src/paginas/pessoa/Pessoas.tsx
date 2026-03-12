import { useState, useEffect } from "react";
import type { TableColumnType } from "react-bs-datatable";
import { useNavigate } from "react-router";
import DataTableComponent from "../../componentes/DataTableComponent";
import HeaderComponent from "../../componentes/HeaderComponent";
import type { Pessoa } from "../../models/Pessoa";

function Pessoas() {
	const [body, setBody] = useState<Pessoa[]>([]);
	const [carregando, setCarregando] = useState<boolean>(true);

	const headers: TableColumnType<Pessoa>[] = [
		{ title: 'Id', prop: 'id', isSortable: true, isFilterable: true },
		{ title: 'Nome', prop: 'nome', isSortable: true, isFilterable: true },
		{ title: 'Idade', prop: 'idade', isSortable: true },
	];

	const navigate = useNavigate();

	useEffect(() => {
		fetch("/api/pessoa")
			.then(data => data.json())
			.then(data => setBody(data))
			.then(() => setCarregando(false));
	}, []);

	return (
		<>
			<HeaderComponent titulo="Pessoas" pathFuncionalidade="/pessoas" />
			<DataTableComponent<Pessoa> body={body} headers={headers} carregando={carregando} onRowClick={row => navigate("/pessoas/" + row.id)} />
		</>
	);
}

export default Pessoas;