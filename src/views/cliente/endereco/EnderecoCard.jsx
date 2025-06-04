import { Button, Header, Icon, Modal } from "semantic-ui-react";
import InfoBubble from "../../entregador/InfoEntregador";
import { useState } from "react";
import EnderecoService from "../../../services/EnderecoService";


export default function EnderecoCard({ endereco, alteraIdEnderecoEdicao, atualizaListaEnderecos }) {

    const [openModalDeletarEndereco, setOpenModalDeletarEndereco] = useState(false);

    function removerEndereco() {
        EnderecoService.deletar(endereco.id);
    }

    return (
        <>
            <InfoBubble label={"Rua"} value={endereco.rua} />
            <InfoBubble label={"Complemento"} value={endereco.complemento} />
            <InfoBubble label={"Número"} value={endereco.numero} />
            <InfoBubble label={"Bairro"} value={endereco.bairro} />
            <InfoBubble label={"Cidade"} value={endereco.cidade} />
            <InfoBubble label={"CEP"} value={endereco.cep} />
            <InfoBubble label={"UF"} value={endereco.estado} />

            <div className="buttonsContainer">

                <Button
                    onClick={() => setOpenModalDeletarEndereco(true)}
                    inverted
                    circular
                    color='red'
                    title='Clique aqui para remover este endereco'
                    icon>
                    <Icon name='trash' />
                </Button>

                <Button
                    onClick={() => alteraIdEnderecoEdicao(endereco.id)}
                    inverted
                    circular
                    color='green'
                    title='Clique aqui para editar esse endereco'
                    icon>
                    <Icon name='edit' />
                </Button>

            </div>

            <Modal
                basic
                onClose={() => setOpenModalDeletarEndereco(false)}
                onOpen={() => setOpenModalDeletarEndereco(true)}
                open={openModalDeletarEndereco}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModalDeletarEndereco(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => {
                        removerEndereco(endereco.id);
                        setOpenModalDeletarEndereco(false)
                        atualizaListaEnderecos(endereco, "delete")
                    }}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}