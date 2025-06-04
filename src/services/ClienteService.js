import axios from "axios"
import enviroments from "../enviroments";

const clienteService = {

  salvar: async (clienteRequest) => {
    if (clienteRequest.id != null) {
      const { id, ...request } = clienteRequest;
      console.log(request)
      axios
        .put(enviroments.API_URL + 'cliente/' + clienteRequest.id, request)
        .then(() => console.log('Cliente alterado com sucesso.'))
        .catch(() => console.log('Erro ao alterar um cliente.'));
    } else {
      const { id, ...request } = clienteRequest;
      axios
        .post(enviroments.API_URL + 'cliente', request)
        .then(() => console.log('Cliente cadastrado com sucesso.'))
        .catch(() => console.log('Erro ao incluir o cliente.'));
    }
  },


  obterTodos: async () => {
    return await axios.get(enviroments.API_URL + 'cliente');
  },


  obterPorId: async (id) => {
    return await axios.get(enviroments.API_URL + 'cliente/' + id);
  },

  deletar: async (id) => {
    await axios
      .delete(enviroments.API_URL + 'cliente/' + id)
      .then(() => console.log('Cliente removido com sucesso.'))
      .catch(() => console.log('Erro ao remover um cliente.'));
  }

};

export default clienteService;
