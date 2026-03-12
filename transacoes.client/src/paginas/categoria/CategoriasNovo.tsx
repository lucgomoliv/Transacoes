import { Button, Col, Container, Fade, Form, Row, Spinner } from "react-bootstrap";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Categoria } from "../../models/Categoria";
import HeaderComponent from "../../componentes/HeaderComponent";
import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useParams } from "react-router";

const finalidades = [
	{ valor: 0, descricao: "Despesa" },
	{ valor: 1, descricao: "Receita" },
	{ valor: 2, descricao: "Ambas" }
]

function CategoriasNovo() {
	function carregarObjeto(identificador?: string): Categoria | Promise<Categoria> {
		if (identificador) {
			setCarregando(true);

			return fetch("/api/categoria/" + identificador)
				.then(resposta => resposta.json() as Promise<Categoria>)
				.then(resposta => {
					setCarregando(false);

					return resposta;
				});
		}

		return new Categoria;
	}
	const [carregando, setCarregando] = useState<boolean>(false);

	let navigate = useNavigate();

	const { identificador } = useParams();

	const { register, handleSubmit, formState: { errors } } = useForm<Categoria>({
		defaultValues: async () => carregarObjeto(identificador),
	});
	const onSubmit: SubmitHandler<Categoria> =
		(categoria) => {
			let endpoint = identificador ? "atualizar" : "cadastrar"

			setCarregando(true);

			fetch("/api/categoria/" + endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(categoria)
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

					return resposta.json() as Promise<Categoria>;
				})
				.then(categoria => {
					if (categoria) {
						toast.success("Categoria cadastrada com sucesso! Código: " + categoria.id);
					}

					navigate("/categorias");
				})
				.catch(erro => console.log(erro))
				.finally(() => setCarregando(false));
		};

	function excluir(identificador: string) {
		fetch("/api/categoria/remover/" + identificador, {
		})
			.then(resposta => {
				if (resposta.status == 200) {
					toast.success("Registro excluído com sucesso!");

					navigate("/categorias");

					return;
				}

				toast.error("Ocorreu um erro ao excluir o registro!");
			})
	}

	return (
		<>
			<HeaderComponent titulo="Categorias" />
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
							<Form.Label column sm={3}>Finalidade</Form.Label>
							<Col sm={9}>

								<Form.Select {...register("finalidade", { valueAsNumber: true })}>
									{finalidades.map((finalidade) => <option value={finalidade.valor} key={finalidade.valor}>{finalidade.descricao}</option>)}
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
								<Link to="/categorias">
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

export default CategoriasNovo;