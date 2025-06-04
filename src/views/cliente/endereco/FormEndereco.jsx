import { useState } from "react";
import { Button, Form, Icon } from "semantic-ui-react";
import './endereco.css'
import EnderecoService from "../../../services/EnderecoService";

export default function FormEndereco({ endereco, alteraIdEnderecoEdicao, atualizaListaEnderecos, idDoCliente, changeFormEnderecoVisibility }) {
    const [enderecoData, setEnderecoData] = useState(endereco);

    async function atualizarSalvarEndereco() {
        const res = await EnderecoService.salvar(enderecoData, idDoCliente);
        setEnderecoData(res);
        atualizaListaEnderecos(res, idDoCliente ? "create" : "update")
    }

    return (
        <>
            <div style={{ width: '100%' }}>
                <Form>
                    <Form.Group>
                        <Form.Input
                            width={7}
                            required
                            fluid
                            label='Rua'
                            maxLength="100"
                            value={enderecoData.rua}
                            onChange={(e) => setEnderecoData({ ...enderecoData, rua: e.target.value })}
                        />
                        <Form.Input
                            width={7}
                            required
                            fluid
                            label='Bairro'
                            maxLength="100"
                            value={enderecoData.bairro}
                            onChange={(e) => setEnderecoData({ ...enderecoData, bairro: e.target.value })}
                        />
                        <Form.Input
                            width={2}
                            required
                            fluid
                            label='Número'
                            maxLength="100"
                            value={enderecoData.numero}
                            onChange={(e) => setEnderecoData({ ...enderecoData, numero: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input
                            width={7}
                            fluid
                            label='Complemento'
                            maxLength="100"
                            value={enderecoData.complemento}
                            onChange={(e) => setEnderecoData({ ...enderecoData, complemento: e.target.value })}
                        />
                        <Form.Input
                            width={3}
                            required
                            fluid
                            label='CEP'
                            maxLength="10"
                            value={enderecoData.cep}
                            onChange={(e) => setEnderecoData({ ...enderecoData, cep: e.target.value })}
                        />
                        <Form.Input
                            width={4}
                            required
                            fluid
                            label='Cidade'
                            maxLength="100"
                            value={enderecoData.cidade}
                            onChange={(e) => setEnderecoData({ ...enderecoData, cidade: e.target.value })}
                        />
                        <Form.Input
                            width={2}
                            required
                            fluid
                            label='UF'
                            maxLength="100"
                            value={enderecoData.estado}
                            onChange={(e) => setEnderecoData({ ...enderecoData, estado: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                    </Form.Group>
                </Form>

            </div>

            <div className="buttonsContainer">
                <Button
                    onClick={() => {
                        alteraIdEnderecoEdicao(null);
                        changeFormEnderecoVisibility(false);
                    }}
                    inverted
                    circular
                    color='red'
                    title='Clique aqui para sair'
                    icon>
                    <Icon name='close icon' />
                </Button>

                <Button
                    onClick={() => {
                        atualizarSalvarEndereco();
                        alteraIdEnderecoEdicao(null);
                        changeFormEnderecoVisibility(false)
                    }}
                    inverted
                    circular
                    color='green'
                    title='Clique aqui para realizar a edição'
                    icon>
                    <Icon name='check circle' />
                </Button>
            </div>

        </>
    )
}