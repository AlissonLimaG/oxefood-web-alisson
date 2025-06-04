import axios from "axios";

const EnderecoService = {

    salvar: (enderecoRequest, idCliente) => {
        const { id, ...data } = enderecoRequest;

        if (idCliente == null) {
            return axios
                .put(`http://localhost:8080/api/cliente/endereco/${id}`, data)
                .then((res) => {
                    console.log('Endereço alterado com sucesso.');
                    return res.data;
                })
                .catch((err) => {
                    console.log('Erro ao alterar o endereço.', err);
                    throw err;
                });
        } else {
            return axios
                .post(`http://localhost:8080/api/cliente/endereco/${idCliente}`, data)
                .then((res) => {
                    console.log('Endereço cadastrado com sucesso.');
                    return res.data;
                })
                .catch((err) => {
                    console.log('Erro ao incluir o endereço.', err);
                    throw err;
                });
        }
    },

    deletar: async (id) => {
        await axios
            .delete(`http://localhost:8080/api/cliente/endereco/${id}`)
            .then(() => console.log('Cliente removido com sucesso.'))
            .catch(() => console.log('Erro ao remover um cliente.'));
    }

}

export default EnderecoService