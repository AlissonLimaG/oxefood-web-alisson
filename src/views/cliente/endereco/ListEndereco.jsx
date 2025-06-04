import EnderecoCard from "./EnderecoCard";
import './endereco.css'
import FormEndereco from "./FormEndereco";
import { useState } from "react";

const enderecoInicial = {
    rua: '',
    complemento: '',
    numero: '',
    bairro: '',
    cidade: '',
    cep: '',
    estado: ''
};

export default function ListEndereco({ enderecos, formEnderecoVisibility, idCliente, changeFormEnderecoVisibility }) {
    const [idEnderecoEmEdicao, setIdEnderecoEmEdicao] = useState(null);
    const [listaEnderecos, setEnderecos] = useState(enderecos);

    function alteraIdEnderecoEdicao(id) {
        setIdEnderecoEmEdicao(id);
    }

    function atualizaListaEnderecos(end, operation) {
        if (operation === "delete") {
            setEnderecos(enderecos => enderecos.filter(endereco => endereco.id !== end.id));
            return;
        } else if (operation === "update") {
            setEnderecos(enderecos => enderecos.map(e => e.id === end.id ? end : e))
            return;
        }
        setEnderecos([...listaEnderecos, end])

    }

    return (
        <div className='enderecosContainer'>

            {formEnderecoVisibility
                ? (<FormEndereco
                    idDoCliente={idCliente}
                    endereco={enderecoInicial}
                    alteraIdEnderecoEdicao={alteraIdEnderecoEdicao}
                    atualizaListaEnderecos={atualizaListaEnderecos}
                    changeFormEnderecoVisibility={changeFormEnderecoVisibility} />)
                : (
                    listaEnderecos.length === 0
                        ? (
                            <h3>Nenhum edereço cadastrado</h3>
                        )
                        : (
                            listaEnderecos.map((endereco, index) => (

                                <div key={endereco.id} className='clienteEnderecoBubbleInfo'>

                                    <h3 style={{ width: '100%', marginBottom: 0 }}>Endereço {index + 1}</h3>

                                    {idEnderecoEmEdicao === endereco.id
                                        ? (<FormEndereco
                                            endereco={endereco}
                                            alteraIdEnderecoEdicao={alteraIdEnderecoEdicao}
                                            atualizaListaEnderecos={atualizaListaEnderecos}
                                            changeFormEnderecoVisibility={changeFormEnderecoVisibility} />
                                        )
                                        : (<EnderecoCard
                                            endereco={endereco}
                                            alteraIdEnderecoEdicao={alteraIdEnderecoEdicao}
                                            atualizaListaEnderecos={atualizaListaEnderecos} />
                                        )
                                    }
                                </div>

                            ))
                        )

                )
            }


        </div>
    )
}