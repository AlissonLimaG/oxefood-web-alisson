import InputMask from "comigo-tech-react-input-mask/lib/react-input-mask.development";
import { Button, Container, Divider, Form, FormField, FormGroup, FormRadio, Icon, Input, Select } from "semantic-ui-react";
import estadosBrasil from "./estados";
import MenuSistema from "../../MenuSistema";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function FormEntregador() {
    
    const { state } = useLocation();
    const [idEntregador, setIdEntregador] = useState();
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
    const [valorFrete, setValorFrete] = useState();
    const [enderecoRua, setEnderecoRua] = useState();
    const [enderecoComplemento, setEnderecoComplemento] = useState();
    const [enderecoNumero, setEnderecoNumero] = useState();
    const [enderecoBairro, setEnderecoBairro] = useState();
    const [enderecoCidade, setEnderecoCidade] = useState();
    const [enderecoCep, setEnderecoCep] = useState();
    const [enderecoUf, setEnderecoUf] = useState();
    const [ativo, setAtivo] = useState(true);

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    function salvar() {
        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            qtdEntregasRealizadas: qtdEntregasRealizadas,
            valorFrete: valorFrete,
            enderecoRua: enderecoRua,
            enderecoComplemento: enderecoComplemento,
            enderecoNumero: enderecoNumero,
            enderecoBairro: enderecoBairro,
            enderecoCidade: enderecoCidade,
            enderecoCep: enderecoCep,
            enderecoUf: enderecoUf,
            ativo: ativo
        }

        console.log(enderecoUf)

        if (idEntregador != null) {

            axios.put("http://localhost:8080/api/entregador/" + idEntregador, entregadorRequest)
                .then((response) => console.log('entregador alterado com sucesso.'))
                .catch((error) => console.log('Erro ao alter um entregador.'))
        } else {

            axios.post("http://localhost:8080/api/entregador", entregadorRequest)
                .then((response) => console.log('entregador cadastrado com sucesso.'))
                .catch((error) => console.log('Erro ao incluir o entregador.'))
        }
    }

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/entregador/" + state.id)
                .then((response) => {
                    setIdEntregador(response.data.id)
                    setNome(response.data.nome)
                    setCpf(response.data.cpf)
                    setRg(response.data.rg)
                    setDataNascimento(formatarData(response.data.dataNascimento))
                    setFoneCelular(response.data.foneCelular)
                    setFoneFixo(response.data.foneFixo)
                    setQtdEntregasRealizadas(response.data.qtdEntregasRealizadas)
                    setValorFrete(response.data.valorFrete)
                    setEnderecoRua(response.data.enderecoRua)
                    setEnderecoComplemento(response.data.enderecoComplemento)
                    setEnderecoNumero(response.data.enderecoNumero)
                    setEnderecoBairro(response.data.enderecoBairro)
                    setEnderecoCidade(response.data.enderecoCidade)
                    setEnderecoCep(response.data.enderecoCep)
                    setEnderecoUf(response.data.enderecoUf)
                    setAtivo(response.data.ativo)
                })
        }
    }, [state])

    return (
        <div>

            <MenuSistema tela={'entregador'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified'>

                    <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>
                    <Divider />

                    <Form>

                        <div style={{ marginTop: '4%' }}>
                            <Form.Group>
                                <FormField
                                    required
                                    control={Input}
                                    label='Nome'
                                    placeholder='Informe o nome do produto'
                                    width={12}
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                                <FormField
                                    required
                                    control={Input}
                                    label='CPF'
                                    placeholder='123.123.123-12'
                                    width={4}
                                >
                                    <InputMask
                                        placeholder='123.123.123-12'
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={(e) => setCpf(e.target.value)}
                                    />
                                </FormField>
                                <FormField
                                    control={Input}
                                    label='RG'
                                    width={4}
                                    value={rg}
                                    onChange={(e) => setRg(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>

                                <FormField
                                    control={Input}
                                    label='DT Nascimento'
                                >
                                    <InputMask
                                        placeholder='23/12/2000'
                                        required
                                        mask='99/99/9999'
                                        value={dataNascimento}
                                        onChange={(e) => setDataNascimento(e.target.value)}
                                    />
                                </FormField>

                                <FormField
                                    required
                                    control={Input}
                                    label='Fone Celular'
                                    width={5}
                                >
                                    <InputMask
                                        placeholder='(DDD) 99999-9999'
                                        required
                                        mask='(99) 99999-9999'
                                        value={foneCelular}
                                        onChange={(e) => setFoneCelular(e.target.value)}
                                    />
                                </FormField>


                                <FormField
                                    control={Input}
                                    label='Fone Fixo'
                                >
                                    <InputMask
                                        placeholder='(DDD) 9999-9999'
                                        mask="(99) 9999-9999"
                                        value={foneFixo}
                                        onChange={(e) => setFoneFixo(e.target.value)}
                                    />
                                </FormField>

                                <FormField
                                    type="number"
                                    control={Input}
                                    label='QTE de entregas realizadas'
                                    placeholder='Ex: 17'
                                    value={qtdEntregasRealizadas}
                                    onChange={(e) => setQtdEntregasRealizadas(e.target.value)}
                                />

                                <FormField
                                    type="number"
                                    control={Input}
                                    label='Valor por frete'
                                    value={valorFrete}
                                    onChange={(e) => setValorFrete(e.target.value)}
                                />

                            </Form.Group>

                            <FormGroup>

                                <FormField
                                    control={Input}
                                    label='Rua'
                                    width={14}
                                    value={enderecoRua}
                                    onChange={(e) => setEnderecoRua(e.target.value)}
                                />

                                <FormField
                                    control={Input}
                                    label='Número'
                                    width={2}
                                    value={enderecoNumero}
                                    onChange={(e) => setEnderecoNumero(e.target.value)}
                                />

                            </FormGroup>

                            <FormGroup>

                                <FormField
                                    control={Input}
                                    label='Bairro'
                                    width={8}
                                    value={enderecoBairro}
                                    onChange={(e) => setEnderecoBairro(e.target.value)}
                                />

                                <FormField
                                    control={Input}
                                    label='Cidade'
                                    width={5}
                                    value={enderecoCidade}
                                    onChange={(e) => setEnderecoCidade(e.target.value)}
                                />

                                <FormField
                                    control={Input}
                                    label='CEP'
                                    width={3}
                                    value={enderecoCep}
                                    onChange={(e) => setEnderecoCep(e.target.value)}
                                />

                            </FormGroup>

                            <FormGroup>

                                <FormField
                                    control={Select}
                                    options={estadosBrasil}
                                    label='UF'
                                    width={16}
                                    placeholder='Selecione'
                                    value={enderecoUf}
                                    onChange={(e) => setEnderecoUf(e.target.value)}
                                />

                            </FormGroup>

                            <FormGroup>

                                <FormField
                                    control={Input}
                                    label='Complemento'
                                    width={16}
                                    value={enderecoComplemento}
                                    onChange={(e) => setEnderecoComplemento(e.target.value)}
                                />

                            </FormGroup>

                            <FormGroup>
                                <label>Ativo</label>
                                <FormRadio
                                    label='Sim'
                                    value={true}
                                    checked={ativo === true}
                                    onChange={(e, { value }) => setAtivo(value)}
                                />
                                <FormRadio
                                    label='Não'
                                    value={false}
                                    checked={ativo === false}
                                    onChange={(e, { value }) => setAtivo(value)}
                                />
                            </FormGroup>

                        </div>

                    </Form>

                    <div style={{ marginTop: '4%' }}>

                        <Link to={"/list-entregador"}>
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
                            onClick={salvar}
                        >
                            <Icon name='save' />
                            Salvar
                        </Button>

                    </div>

                </Container>

            </div>
        </div>
    )
}