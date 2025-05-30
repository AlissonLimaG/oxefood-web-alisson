import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Modal,
} from 'semantic-ui-react'
import InfoEntregador from './InfoEntregador';

export default function ListEntregador() {

    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();
    const [lista, setLista] = useState([]);
    const [open, setOpen] = React.useState(false)

    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data)
            })
    }

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    async function remover() {

        await axios.delete('http://localhost:8080/api/entregador/' + idRemover)
            .then((response) => {

                console.log('entregador removido com sucesso.')

                axios.get("http://localhost:8080/api/entregador")
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                console.log('Erro ao remover um entregador.')
            })
        setOpenModal(false)
    }


    return (
        <div>
            <MenuSistema tela={'entregador'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Entregador </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-entregador'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                    <Table.HeaderCell>Entregas realizadas</Table.HeaderCell>
                                    <Table.HeaderCell>Valor do frete</Table.HeaderCell>
                                    <Table.HeaderCell>Ativo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(entregador => (

                                    <>
                                        <Table.Row key={entregador.id}>
                                            <Table.Cell>{entregador.nome}</Table.Cell>
                                            <Table.Cell>{entregador.cpf}</Table.Cell>
                                            <Table.Cell>{formatarData(entregador.dataNascimento)}</Table.Cell>
                                            <Table.Cell>{entregador.foneCelular}</Table.Cell>
                                            <Table.Cell>{entregador.qtdEntregasRealizadas}</Table.Cell>
                                            <Table.Cell>{entregador.valorFrete}</Table.Cell>
                                            <Table.Cell>{entregador.ativo ? "Sim" : "Não"}</Table.Cell>
                                            <Table.Cell textAlign='center'>

                                                <Button
                                                    inverted
                                                    circular
                                                    color='green'
                                                    title='Clique aqui para editar os dados deste Entregador'
                                                    icon
                                                >
                                                    <Link to="/form-entregador" state={{ id: entregador.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                                </Button> &nbsp;

                                                <Button
                                                    inverted
                                                    circular
                                                    color='red'
                                                    title='Clique aqui para remover este Entregador'
                                                    icon
                                                    onClick={() => confirmaRemover(entregador.id)}
                                                    >
                                                    <Icon name='trash' />
                                                </Button>&nbsp;

                                                <Button
                                                    onClick={() => setOpen(true)}
                                                    inverted
                                                    circular
                                                    color='blue'
                                                    title='Clique aqui para ver dados este Entregador'
                                                    icon>
                                                    <Icon name='eye' />
                                                </Button>

                                            </Table.Cell>
                                        </Table.Row>

                                        <Modal
                                            onClose={() => setOpen(false)}
                                            onOpen={() => setOpen(true)}
                                            open={open}
                                        >
                                            <ModalHeader>Informações de: {entregador.nome}</ModalHeader>
                                            <ModalContent>
                                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                                    <h3 style={{ width: '100%' }}>Dados pessoais</h3>
                                                    <InfoEntregador label={"Nome"} value={entregador.nome} />
                                                    <InfoEntregador label={"CPF"} value={entregador.cpf} />
                                                    <InfoEntregador label={"RG"} value={entregador.rg} />
                                                    <InfoEntregador label={"Data de nascimento"} value={entregador.dataNascimento} />
                                                    <InfoEntregador label={"T. Celular"} value={entregador.foneCelular} />
                                                    <InfoEntregador label={"T. Fixo"} value={entregador.foneFixo} />
                                                    <InfoEntregador label={"Entregas realizadas"} value={entregador.qtdEntregasRealizadas} />
                                                    <InfoEntregador label={"Valor do frete"} value={entregador.valorFrete} />
                                                    <h3 style={{ width: '100%' }}>Dados de endereço</h3>
                                                    <InfoEntregador label={"Rua"} value={entregador.enderecoRua} />
                                                    <InfoEntregador label={"Complemento"} value={entregador.enderecoComplemento} />
                                                    <InfoEntregador label={"Número"} value={entregador.enderecoNumero} />
                                                    <InfoEntregador label={"Bairro"} value={entregador.enderecoBairro} />
                                                    <InfoEntregador label={"Cidade"} value={entregador.enderecoCidade} />
                                                    <InfoEntregador label={"CEP"} value={entregador.enderecoCep} />
                                                    <InfoEntregador label={"UF"} value={entregador.enderecoUf} />
                                                    <InfoEntregador label={"Ativo"} value={entregador.ativo ? "Sim" : "Não"} />
                                                </div>
                                            </ModalContent>
                                            <ModalActions>

                                                <Button
                                                    content="Sair"
                                                    labelPosition='right'
                                                    icon='checkmark'
                                                    onClick={() => setOpen(false)}
                                                    negative
                                                />
                                            </ModalActions>
                                        </Modal>
                                    </>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>

            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}
