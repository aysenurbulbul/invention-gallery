import React from "react";
import {Container, Table, Header, Icon, Dimmer, Loader, Segment, Image} from "semantic-ui-react";
import {Link} from 'react-router-dom';
import axios from 'axios';

class LoginUser extends React.Component{
    state = {
        users : [],
        loaded : false
    };

    componentDidMount() {
        axios.get('/api/users')
            .then((res) => {
                let db_users = [];
                res.data.forEach(user => {
                    db_users.push(user);
                });
                this.setState({users:db_users, loaded : true});
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    render() {
        let id = 0;
        let users = this.state.users.map(user => {
            return(
                <Table.Row key = {id++}>
                    <Table.Cell><div>
                        <Icon name='user circle'/>
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
                    </Table>:
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

export default LoginUser;