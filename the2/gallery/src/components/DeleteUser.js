import React from "react";
import {Container, Header, Icon, Table, Segment, Dimmer, Loader, Image} from "semantic-ui-react";
import axios from 'axios';
import {Link} from "react-router-dom";

class DeleteUser extends React.Component{
    state = {
        users : [],
        loaded : false
    };

    componentDidMount() {
        this.getUsers();
    };

    getUsers = () => {
        axios.get('/api/users')
            .then((res) => {
                this.setState({users:res.data, loaded : true});
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    handleDelete = (e) => {
        let url = '/api/deleteusers/' + e.target.id;
        axios.delete(url)
            .then((res) => {
                this.getUsers() //to refresh
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    render() {
        let id = 0;
        let users = this.state.users.map(user => {
            return(
                <Table.Row key = {id++}>
                    <Table.Cell><div>
                        <Icon id = {user._id} link name = 'delete' onClick = {this.handleDelete}/>
                        <Link to={{pathname:'/users/' + user.username}}>{user.username}</Link>
                    </div></Table.Cell>
                </Table.Row>
            )
        });
        return(
            <Container >
                <br/>
                <br/>
                <Header as = 'h2'>Select a user to login</Header>
                <br/>
                {this.state.loaded?
                    <Table basic='very' celled collapsing>
                        <Table.Body>{users}</Table.Body>
                    </Table>
                    :
                    <Segment>
                        <Dimmer active inverted>
                            <Loader inverted>Loading</Loader>
                        </Dimmer>

                        <Image src='/short-paragraph.png' />
                    </Segment>}
            </Container>
        )
    }

}

export default DeleteUser;