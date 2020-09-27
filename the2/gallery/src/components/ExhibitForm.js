import React from "react";
import {Container, Form, Header, Message, Grid} from "semantic-ui-react";
import axios from "axios";
import UserNav from "./UserNav";

class ExhibitForm extends React.Component{
    state = {
        product_name : '',
        photo : '',
        cost : '',
        materials : '',
        inventor : '',
        rating : 0,
        date : '',
        optional1 : '',
        value1 : '',
        optional2 : '',
        value2 : '',
        message : '',
        situation : 'grey',
        display : 'none'
    };

    handleChange = (e, {name, value}) => {
        this.setState({[name]: value});
    };

    handleSubmit = (event) => {
        event.preventDefault();

        axios.post('/api/addproduct', {
            product_name : this.state.product_name,
            photo : this.state.photo,
            cost : this.state.cost,
            materials : this.state.materials,
            inventor : this.props.match.params.name,
            rating : this.state.rating,
            date : Date.now(),
            exhibit : true,
            optionals : {
                name1 : this.state.optional1,
                val1 : this.state.value1,
                name2 : this.state.optional2,
                val2 : this.state.value2,
            },
        }).then((res) => {
            //console.log(res);
            if(res.status===200){
                console.log('product is added');
                this.setState({
                    product_name : '',
                    photo : '',
                    cost : '',
                    materials : '',
                    description : '',
                    patent_number : '',
                    optional1 : '',
                    value1 : '',
                    optional2 : '',
                    value2 : '',
                    message : 'Product is added!', situation : 'green', display:''});
            }
        }).catch((err) => {
            console.log(err.message);
            this.setState({message: err.message, situation : 'red', display:''})
        });


    };

    render() {
        return(
            <Container>
                <UserNav username = {this.props.match.params.name}/>
                <br/><br/><br/><br/><br/>
                <Header as = 'h2'>Exhibit an Invention</Header>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <Form.Input
                            name = 'product_name'
                            placeholder='Enter the product name'
                            value = {this.state.product_name}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            name = 'photo'
                            placeholder='Enter the photo URL of the invention'
                            value = {this.state.photo}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            name = 'materials'
                            placeholder='Add materials used for the product'
                            value = {this.state.materials}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            name = 'cost'
                            placeholder='Enter the cost of the product'
                            value = {this.state.cost}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Header as = 'h3'>Add 2 Optional fields</Header>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <Form.Input
                                        name = 'optional1'
                                        placeholder='Enter the element name'
                                        value = {this.state.optional1}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <Form.Input
                                        name = 'value1'
                                        placeholder='Enter the value'
                                        value = {this.state.value1}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <Form.Input
                                        name = 'optional2'
                                        placeholder='Enter the element name)'
                                        value = {this.state.optional2}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
                                    <Form.Input
                                        name = 'value2'
                                        placeholder='Enter the value'
                                        value = {this.state.value2}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                    <br/><br/>
                    <Form.Button secondary
                                 content='Submit'
                                 disabled={!this.state.product_name.length
                                 || !this.state.photo.length
                                 || !this.state.cost
                                 || !this.state.materials.length
                                 }
                    />
                </Form>
                <br/><br/><br/>
                <div style = {{display: this.state.display}}>
                    <Message
                        color = {this.state.situation}
                        content = {this.state.message}
                    />
                </div>
            </Container>
        )
    }

}

export default ExhibitForm;