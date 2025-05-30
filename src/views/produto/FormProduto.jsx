import { Button, Container, Divider, Form, FormField, Icon, Input, TextArea } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function FormProduto() {
    const { state } = useLocation();
    const [idProduto, setIdProduto] = useState();

    const [codigo, setCodigo] = useState();
    const [titulo, setTitulo] = useState();
    const [descricao, setDescricao] = useState();
    const [valorUnitario, setValorUnitario] = useState();
    const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
    const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();
    const [listaCategoria, setListaCategoria] = useState([]);
    const [idCategoria, setIdCategoria] = useState();


    function salvar() {
        let produtoRequest = {
            idCategoria: idCategoria,
            codigo: codigo,
            titulo: titulo,
            descricao: descricao,
            valorUnitario: valorUnitario,
            tempoEntregaMinimo: tempoEntregaMinimo,
            tempoEntregaMaximo: tempoEntregaMaximo
        }

        if (idProduto != null) {

            axios.put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
                .then((response) => console.log('produto alterado com sucesso.'))
                .catch((error) => console.log('Erro ao alterar um produto.'))
        } else {

            axios.post("http://localhost:8080/api/produto", produtoRequest)
                .then((response) => console.log('produto cadastrado com sucesso.'))
                .catch((error) => console.log('Erro ao incluir o produto.', error))
        }
    }

useEffect(() => {

       if (state != null && state.id != null) {
           axios.get("http://localhost:8080/api/produto/" + state.id)
           .then((response) => {
               setIdProduto(response.data.id)
               setCodigo(response.data.codigo)
               setTitulo(response.data.titulo)
               setDescricao(response.data.descricao)
               setValorUnitario(response.data.valorUnitario)
               setTempoEntregaMinimo(response.data.tempoEntregaMinimo)
               setTempoEntregaMaximo(response.data.tempoEntregaMaximo)
               setIdCategoria(response.data.categoria.id)
           })
       }

       axios.get("http://localhost:8080/api/categoriaProduto")
       .then((response) => {
           const dropDownCategorias = response.data.map(c => ({ text: c.descricao, value: c.id }));
           setListaCategoria(dropDownCategorias);
       })

   }, [state])



    return (
        <div>

            <MenuSistema tela={'produto'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign="justified">

                    <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group>
                                <FormField
                                    required
                                    control={Input}
                                    label='Título'
                                    placeholder='Informe o nome do produto'
                                    width={12}
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                />
                                <FormField
                                    required
                                    control={Input}
                                    label='Código'
                                    placeholder='Informe o código do produto'
                                    width={4}
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)} />
                            </Form.Group>

                            <Form.Select
                                required
                                fluid
                                tabIndex='3'
                                placeholder='Selecione'
                                label='Categoria'
                                options={listaCategoria}
                                value={idCategoria}
                                onChange={(e, { value }) => {
                                    setIdCategoria(value)
                                }}
                            />

                            <Form.Group>
                                <FormField
                                    control={TextArea}
                                    label='Descrição'
                                    placeholder='Informe a descrição do produto'
                                    width={16}
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <FormField
                                    required
                                    control={Input}
                                    label='Valor unitário'
                                    width={5}
                                    value={valorUnitario}
                                    onChange={(e) => setValorUnitario(e.target.value)}
                                />
                                <FormField
                                    control={Input}
                                    type="number"
                                    label='Tempo de entrega mínimo em minutos'
                                    placeholder='30'
                                    width={6}
                                    value={tempoEntregaMinimo}
                                    onChange={(e) => setTempoEntregaMinimo(e.target.value)}
                                />
                                <FormField
                                    control={Input}
                                    type="number"
                                    label='Tempo de entrega máximo em minutos'
                                    placeholder='40'
                                    width={6}
                                    value={tempoEntregaMaximo}
                                    onChange={(e) => setTempoEntregaMaximo(e.target.value)}
                                />
                            </Form.Group>
                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Link to={"/list-produto"}>
                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    <Icon name='reply' />
                                    Listar
                                </Button>
                            </Link>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={salvar}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>
                    </div>
                </Container>

            </div>
        </div>
    )
}