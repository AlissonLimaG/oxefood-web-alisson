import InputMask from "comigo-tech-react-input-mask/lib/react-input-mask.development";
import { Container, Divider, Form, FormField, FormGroup, Icon, Input, Select } from "semantic-ui-react";
import estadosBrasil from "./estados";

export default function FormEntregador() {
    return (
        <div>
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
                                    />
                                </FormField>
                                <FormField
                                    control={Input}
                                    label='RG'
                                    width={4}
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
                                    />
                                </FormField>


                                <FormField
                                    control={Input}
                                    label='Fone Fixo'
                                />

                                <FormField
                                    type="number"
                                    control={Input}
                                    label='QTE de entregas realizadas'
                                    placeholder='Ex: 17'
                                />

                                <FormField
                                    type="number"
                                    control={Input}
                                    label='Valor por frete'
                                />

                            </Form.Group>

                            <FormGroup>

                                <FormField
                                    control={Input}
                                    label='Rua'
                                    width={14}
                                />

                                <FormField
                                    control={Input}
                                    label='Número'
                                    width={2}
                                />

                            </FormGroup>

                            <FormGroup>

                                <FormField
                                    control={Input}
                                    label='Bairro'
                                    width={8}
                                />

                                <FormField
                                    control={Input}
                                    label='Cidade'
                                    width={5}
                                />

                                <FormField
                                    control={Input}
                                    label='CEP'
                                    width={3}
                                />

                            </FormGroup>

                            <FormGroup>

                                <FormField
                                    control={Select}
                                    options={estadosBrasil}
                                    label='UF'
                                    width={16}
                                    placeholder='Selecione'
                                />

                            </FormGroup>

                            <FormGroup>

                                <FormField
                                    control={Input}
                                    label='Complemento'
                                    width={16}
                                />

                            </FormGroup>

                        </div>

                    </Form>

                </Container>

            </div>
        </div>
    )
}