import { useEffect, useState } from "react";
import DataTableComponent from "../../componentes/DataTableComponent";
import type { Categoria } from "../../models/Categoria";
import { Filter, type TableColumnType } from "react-bs-datatable";
import { useNavigate } from "react-router";
import HeaderComponent from "../../componentes/HeaderComponent";

const FINALIDADES = [
	"Despesa",
	"Receita",
	"Ambas"
]

function Categorias() {
	const [body, setBody] = useState<Categoria[]>([]);
	const [carregando, setCarregando] = useState<boolean>(true);

	const headers: TableColumnType<Categoria>[] = [
		{ title: 'Id', prop: 'id', isSortable: true, isFilterable: true},
		{ title: 'Descrição', prop: 'descricao', isSortable: true, isFilterable: true },
		{ title: 'Finalidade', prop: 'finalidade', cell: (categoria) => FINALIDADES[categoria.finalidade], isFilterable: true }
	];

	const navigate = useNavigate();

	useEffect(() => {
		fetch("/api/categoria")
			.then(data => data.json())
			.then(data => setBody(data))
			.then(() => setCarregando(false));
	}, []);

	return (
		<>
			<HeaderComponent titulo="Categorias" pathFuncionalidade="/categorias" />
			<DataTableComponent<Categoria> body={body} headers={headers} carregando={carregando} onRowClick={row => navigate("/categorias/" + row.id)} />
		</>
	);
}

export default Categorias;