import { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router";
import HeaderComponent from "../../componentes/HeaderComponent";
import { Pessoa } from "../../models/Pessoa";

function PessoasNovo() {
	function carregarObjeto(identificador?: string): Pessoa | Promise<Pessoa> {
		if (identificador) {
			setCarregando(true);

			return fetch("/api/pessoa/" + identificador)
				.then(resposta => resposta.json() as Promise<Pessoa>)
				.then(resposta => {
					setCarregando(false);

					return resposta;
				});
		}

		return new Pessoa;
	}
	const [carregando, setCarregando] = useState<boolean>(false);

	let navigate = useNavigate();

	const { identificador } = useParams();

	const { register, handleSubmit, formState: { errors } } = useForm<Pessoa>({
		defaultValues: async () => carregarObjeto(identificador),
	});
	const onSubmit: SubmitHandler<Pessoa> =
		(pessoa) => {
			let endpoint = identificador ? "atualizar" : "cadastrar"

			setCarregando(true);

			fetch("/api/pessoa/" + endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(pessoa)
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

					return resposta.json() as Promise<Pessoa>;
				})
				.then(Pessoa => {
					if (Pessoa) {
						toast.success("Pessoa cadastrada com sucesso! Código: " + Pessoa.id);
					}

					navigate("/pessoas");
				})
				.catch(erro => console.log(erro))
				.finally(() => setCarregando(false));
		};

	function excluir(identificador: string) {
		fetch("/api/pessoa/remover/" + identificador, {
		})
			.then(resposta => {
				if (resposta.status == 200) {
					toast.success("Registro excluído com sucesso!");

					navigate("/pessoas");

					return;
				}

				toast.error("Ocorreu um erro ao excluir o registro!");
			})
	}

	return (
		<>
			<HeaderComponent titulo="Pessoas" />
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
							<Form.Label column sm={3}>Nome</Form.Label>
							<Col sm={9}>
								<Form.Control maxLength={200} {...register("nome", { required: true })} required />
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-3 w-50">
							<Form.Label column sm={3}>Idade</Form.Label>
							<Col sm={9}>
								<Form.Control type="number" {...register("idade", { required: true })} required />
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
								<Link to="/Pessoas">
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

export default PessoasNovo;