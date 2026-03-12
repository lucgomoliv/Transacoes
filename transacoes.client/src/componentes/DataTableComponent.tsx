import {
	DatatableWrapper,
	Filter,
	TableBody,
	TableHeader,
	type TableColumnType,
    type TableRowType,
} from 'react-bs-datatable';
import { Col, Table } from 'react-bootstrap';
import LoadingComponent from './LoadingComponent';

interface DataTabelComponentProps<TTableRowType extends TableRowType> {
	body: any[],
	headers: TableColumnType<any>[],
	carregando: boolean,
	onRowClick?: (row: TTableRowType, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
}

function DataTableComponent<TTableRowType extends TableRowType>({ body, headers, carregando, onRowClick }: DataTabelComponentProps<TTableRowType>) {
	return (
		<>
			<DatatableWrapper<TTableRowType> body={body} headers={headers}>
				<Col xs={12} lg={4} className="d-flex flex-col justify-content-end align-items-end mt-3 mb-3">
					<Filter placeholder="Procure..." />
				</Col>
				<Table>
					<TableHeader />
					{carregando ? <LoadingComponent /> : <TableBody onRowClick={onRowClick} />}
				</Table>
			</DatatableWrapper>
		</>
	);
}

export default DataTableComponent;