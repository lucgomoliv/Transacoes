import { useEffect, useState } from "react";
import { Form, Spinner, Container, Row, Col, Button } from "react-bootstrap";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router";
import HeaderComponent from "../../componentes/HeaderComponent";
import { Transacao } from "../../models/Transacao";
import type { Categoria } from "../../models/Categoria";
import type { Pessoa } from "../../models/Pessoa";

function TransacoesNovo() {
	const [carregando, setCarregando] = useState<boolean>(false);
	const [pessoas, setPessoas] = useState<Pessoa[]>([]);
	const [categorias, setCategorias] = useState<Categoria[]>([]);

	let navigate = useNavigate();

	const { identificador } = useParams();

	const { register, handleSubmit } = useForm<Transacao>({
		defaultValues: async () => carregarObjeto(identificador),
	});

	const onSubmit: SubmitHandler<Transacao> =
		(transacao) => {
			let endpoint = identificador ? "atualizar" : "cadastrar"

			setCarregando(true);

			fetch("/api/transacao/" + endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(transacao)
			})
				.then(resposta => {
					if (resposta.status == 200) {
						toast.success("Registro atualizado com sucesso!");

						return;
					}

					if (resposta.status !== 201) {
						toast.error("Ocorreu um erro ao cadastrar!");

						return;
					}

					if (!resposta.body)
						return;

					return resposta.json() as Promise<Transacao>;
				})
				.then(transacao => {
					if (transacao) {
						toast.success("Transação cadastrada com sucesso! Código: " + transacao.id);
					}

					navigate("/transacoes");
				})
				.catch(erro => console.log(erro))
				.finally(() => setCarregando(false));
		};

	const excluir = (identificador: string) => {
		fetch("/api/transacao/remover/" + identificador)
			.then(resposta => {
				if (resposta.status == 200) {
					toast.success("Registro excluído com sucesso!");

					navigate("/transacoes");

					return;
				}

				toast.error("Ocorreu um erro ao excluir o registro!");
			})
	}

	const carregarObjeto = (identificador?: string): Transacao | Promise<Transacao> => {
		if (identificador) {
			setCarregando(true);

			return fetch("/api/transacao/" + identificador)
				.then(resposta => resposta.json() as Promise<Transacao>)
				.then(resposta => {
					setCarregando(false);

					return resposta;
				});
		}

		return new Transacao;
	}


	useEffect(() => {
		fetch("/api/pessoa")
			.then(resposta => resposta.json() as Promise<Pessoa[]>)
			.then(resposta => setPessoas(resposta));

		fetch("/api/categoria")
			.then(resposta => resposta.json() as Promise<Categoria[]>)
			.then(resposta => setCategorias(resposta));
	}, []);

	return (
		<>
			<HeaderComponent titulo="Transações" />
			{carregando ? <Spinner animation="grow" style={{ position: "absolute", left: "50%", top: "50%" }} /> :
				<Container style={{ marginTop: "20px", marginLeft: "50px" }}>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group as={Row} className="mb-3 w-50" hidden={identificador === undefined}>
							<Form.Label column sm={3}>Identificador</Form.Label>
							<Col sm={9}>
								<Form.Control {...register("id", { valueAsNumber: true })} disabled />
							</Col>

						</Form.Group>

						<Form.Group as={Row} className="mb-3 w-50">
							<Form.Label column sm={3}>Descrição</Form.Label>
							<Col sm={9}>
								<Form.Control maxLength={400} {...register("descricao", { required: true })} required />
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-3 w-50">
							<Form.Label column sm={3}>Valor</Form.Label>
							<Col sm={9}>
								<Form.Control type="currency" {...register("valor", { required: true, valueAsNumber: true })} required />
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-3 w-50">
							<Form.Label column sm={3}>Pessoa</Form.Label>
							<Col sm={9}>

								<Form.Select {...register("idPessoa", { valueAsNumber: true })}>
									<option></option>
									{pessoas.map((pessoa) => <option value={pessoa.id} key={pessoa.id}>{pessoa.nome}</option>)}
								</Form.Select>
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-3 w-50">
							<Form.Label column sm={3}>Categoria</Form.Label>
							<Col sm={9}>

								<Form.Select {...register("idCategoria", { valueAsNumber: true })}>
									<option></option>
									{categorias.map((categoria) => <option value={categoria.id} key={categoria.id}>{categoria.descricao}</option>)}
								</Form.Select>
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-3 w-50">
							<Form.Label column sm={3}>Tipo</Form.Label>
							<Col sm={9}>
								<Form.Select {...register("tipo", { valueAsNumber: true })} disabled>
									<option value={0} key={0}>Despesa</option>
									<option value={1} key={1}>Receita</option>
								</Form.Select>
							</Col>
						</Form.Group>

						<Row className="mb-3 w-50">
							<Col sm={12}>
								<Button variant="primary" type="submit" style={{ float: "right", marginLeft: "10px" }} >
									{identificador ? "Atualizar" : "Cadastrar"}
								</Button>
								{identificador &&
									<Button variant="danger" type="button" onClick={() => excluir(identificador)}>
										Excluir
									</Button>
								}
								<Link to="/transacoes">
									<Button variant="secondary" type="submit" style={{ float: "right" }}>
										Cancelar
									</Button>
								</Link>
							</Col>
						</Row>
					</Form>
				</Container>
			}
		</>
	);
}

export default TransacoesNovo;
