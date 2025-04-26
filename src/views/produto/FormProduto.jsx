import { Button, Container, Divider, Form, FormField, Icon, Input, TextArea } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { useState } from "react";
import axios from "axios";

export default function FormProduto() {

    const [codigo, setCodigo] = useState();
    const [titulo, setTitulo] = useState();
    const [descricao, setDescricao] = useState();
    const [valorUnitario, setValorUnitario] = useState();
    const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
    const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();

    function salvar() {
        let produtoRequest = {
            codigo: codigo,
            titulo: titulo,
            descricao: descricao,
            valorUnitario: valorUnitario,
            tempoEntregaMinimo: tempoEntregaMinimo,
            tempoEntregaMaximo: tempoEntregaMaximo
        }

        axios.post("http://localhost:8080/api/produto", produtoRequest)
        .then(res => console.log("produto cadastrado com sucesso"))
        .catch(err => console.log("erro ao cadastrar o produto" + err))
    }

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
                                    onChange={(e) => setCodigo(e.target.value)}/>
                            </Form.Group>

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