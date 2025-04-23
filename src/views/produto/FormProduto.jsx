import { Button, Container, Divider, Form, FormField, Icon, Input, TextArea } from "semantic-ui-react";

export default function FormProduto() {
    return (
        <div>
            <div style={{ marginTop: '3%' }}>

                <Container textAlign="justified">

                    <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group>
                                <FormField
                                    required
                                    control={Input}
                                    label='Título'
                                    placeholder='Informe o nome do produto'
                                    width={12}
                                />
                                <FormField
                                    required
                                    control={Input}
                                    label='Código'
                                    placeholder='Informe o código do produto'
                                    width={4}
                                />
                            </Form.Group>

                            <Form.Group>
                                <FormField
                                    control={TextArea}
                                    label='Descrição'
                                    placeholder='Informe a descrição do produto'
                                    width={16}
                                />
                            </Form.Group>

                            <Form.Group>
                                <FormField
                                    required
                                    control={Input}
                                    label='Valor unitário'
                                    width={5}
                                />
                                <FormField
                                    control={Input}
                                    type="number"
                                    label='Tempo de entrega mínimo em minutos'
                                    placeholder='30'
                                    width={6}
                                />
                                <FormField
                                    control={Input}
                                    type="number"
                                    label='Tempo de entrega máximo em minutos'
                                    placeholder='40'
                                    width={6}
                                />
                            </Form.Group>
                        </Form>

                        <div style={{marginTop: '4%'}}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                Listar
                            </Button>
                                
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>
                    </div>
                </Container>

            </div>
        </div>
    )
}