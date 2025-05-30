import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, ModalActions, ModalContent, ModalHeader, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import InfoBubble from '../entregador/InfoEntregador';
import './cliente.css'
import { formatarData } from "../../utils";
import clienteService from "../../services/ClienteService";

export default function ListCliente() {

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();
    const [lista, setLista] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    async function remover() {
        await clienteService.deletar(idRemover);
        preencherLista();
        setOpenModal(false)
    }

    async function preencherLista() {
        const res = await clienteService.obterTodos()
        setLista(res.data);
    }

    useEffect(() => {
        preencherLista();
    }, []);

    return (
        <div>
            <MenuSistema tela={'cliente'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Cliente </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-cliente'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista !== undefined && lista.map(cliente => (
                                    <Table.Row key={cliente.id}>
                                        <Table.Cell>{cliente.nome}</Table.Cell>
                                        <Table.Cell>{cliente.cpf}</Table.Cell>
                                        <Table.Cell>{formatarData(cliente.dataNascimento)}</Table.Cell>
                                        <Table.Cell>{cliente.foneCelular}</Table.Cell>
                                        <Table.Cell>{cliente.foneFixo}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste cliente'
                                                icon>
                                                <Link to="/form-cliente" state={{ id: cliente.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este cliente'
                                                icon
                                                onClick={e => confirmaRemover(cliente.id)}>
                                                <Icon name='trash' />
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setOpen(true);
                                                    setClienteSelecionado(cliente)
                                                }}
                                                inverted
                                                circular
                                                color='blue'
                                                title='Clique aqui para ver dados este Entregador'
                                                icon>
                                                <Icon name='eye' />
                                            </Button>

                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>

                        </Table>
                    </div>
                </Container>
            </div>


            {/* MODAL DE INFORMAÇÕES DE ENDEREÇO DO CLIENTE */}
            {clienteSelecionado && (
                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                >
                    <ModalHeader>Informações de: {clienteSelecionado.nome}</ModalHeader>
                    <ModalContent>
                        {clienteSelecionado.enderecos.length === 0
                            ? (<h3>Nenhum endereço cadastrado</h3>)
                            : (
                                <div className='enderecosContainer'>
                                    {
                                        clienteSelecionado.enderecos.map((endereco, index) => (
                                            <div key={endereco.id} className='clienteEnderecoBubbleInfo'>
                                                <h3 style={{ width: '100%', marginBottom: 0 }}>Endereço {index + 1}</h3>
                                                <InfoBubble label={"Rua"} value={endereco.rua} />
                                                <InfoBubble label={"Complemento"} value={endereco.complemento} />
                                                <InfoBubble label={"Número"} value={endereco.numero} />
                                                <InfoBubble label={"Bairro"} value={endereco.bairro} />
                                                <InfoBubble label={"Cidade"} value={endereco.cidade} />
                                                <InfoBubble label={"CEP"} value={endereco.cep} />
                                                <InfoBubble label={"UF"} value={endereco.estado} />
                                            </div>
                                        ))}
                                </div>
                            )
                        }
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
            )}


            {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO DE CLIENTE */}
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
