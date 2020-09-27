import React from "react";
import {Container, Form, Header, Icon, Message} from "semantic-ui-react";
import axios from 'axios';

class AddUser extends React.Component{
    state = {
        username : '',
        message : '',
        situation : 'grey',
        display : 'none'

    };

    handleChange = (e, {name, value}) => {
        this.setState({[name]: value});
    };

    handleSubmit = (event) => {
        event.preventDefault();

        axios.post('/api/adduser', {
            username : this.state.username,
            avg_rating : 0,
            gallery : []
        }).then((res) => {
            //console.log(res);
            if(res.status===200){
                //console.log('user is added');
                this.setState({message : 'User is added!', situation : 'green', display:'', username:''});
            }
        }).catch((err) => {
            console.log(err.message);
            this.setState({message: err.message, situation : 'red', display:''})
        });


    };

    render() {
        return(
            <Container>
                <br/><br/><br/><br/><br/>
                <Header as = 'h2'><Icon name='add user'/> Add User</Header>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Input
                            name = 'username'
                            placeholder='Enter a username'
                            value = {this.state.username}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Button secondary
                        content='Submit'
                                 disabled={!this.state.username.length}
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

export default AddUser;