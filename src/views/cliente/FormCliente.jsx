/* eslint-disable eqeqeq */
import InputMask from 'comigo-tech-react-input-mask';
import { useEffect, useState } from "react";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from 'react-router-dom';
import ClienteService from '../../services/ClienteService';
import { formatarData } from '../../utils';

export default function FormCliente() {
    const { state } = useLocation();
    const [clientData, setClientData] = useState({
        id: null,
        nome: '',
        cpf: '',
        dataNascimento: '',
        foneCelular: '',
        foneFixo: ''
    });
    
    function salvarCliente() {
        ClienteService.salvar(clientData);
    }

    const preencheDadosDoCliente = async (idCliente) => {
        const response = await ClienteService.obterPorId(idCliente);
        response.data.dataNascimento = formatarData(response.data.dataNascimento);
        setClientData(response.data);
    }

    useEffect(() => {
        if (state != null && state.id != null) {
            preencheDadosDoCliente(state.id);
        }
    }, [state])



    return (

        <div>

            <MenuSistema tela={'cliente'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {clientData.id === null &&
                        <h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {clientData.id != null &&
                        <h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={clientData.nome}
                                    onChange={(e) => setClientData({ ...clientData, nome: e.target.value })}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={clientData.cpf}
                                        onChange={(e) => setClientData({ ...clientData, cpf: e.target.value })}
                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={clientData.foneCelular}
                                        onChange={(e) => setClientData({ ...clientData, foneCelular: e.target.value })}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999-9999"
                                        value={clientData.foneFixo}
                                        onChange={(e) => setClientData({ ...clientData, foneFixo: e.target.value })}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Data Nascimento'
                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={clientData.dataNascimento}
                                        onChange={(e) => setClientData({ ...clientData, dataNascimento: e.target.value })}
                                    />
                                </Form.Input>

                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Link to={'/list-cliente'}>
                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    <Icon name='reply' />
                                    Voltar
                                </Button>
                            </Link>


                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={salvarCliente}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>

                </Container>
            </div>
        </div>

    );

}