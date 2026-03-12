import { Categoria } from "./Categoria";
import { Pessoa } from "./Pessoa";

export class Transacao {
	id = 0;
	descricao = "";
	valor = 0.0;
	tipo = 0;
	idCategoria = 0;
	idPessoa = 0;
	categoria: Categoria | null = null;
	pessoa: Pessoa | null = null;
}